const User = require('../models/User');
const OTP = require('../models/OTP')
const otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mail = require('../utils/mailSender');

require('dotenv').config();

exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const checkUserExist = await User.findOne({ email })
        if (checkUserExist) {
            return res.status(301).json({
                success: false,
                message: "User Already Exist",
            })
        }
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: true,
            specialChars: false,
        })
        console.log("The OTP is Generated is ->", otp);
        const result = await OTP.findOne({ otp: otp });
        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await OTP.findOne({ otp, otp })
        }
        const otpPayload = { email, otp };
        
        const otpBody = await OTP.create(otpPayload);
        console.log("OTP Body is ->", otpBody)
        return res.status(200).json({
            success: true,
            message: "OTP Sent Successful",
            otp,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.signUp = async (req, res) => {
    try {
        const { name, email, password, otp } = req.body;
        if (!name || !email || !password || !otp) {
            return res.status(403).json({
                success: false,
                message: "All Fields are Required",
            })
        }
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(303).json({
                success: false,
                message: "User Already Exist",
            })
        }
        const recentOtp = await OTP.findOne({ otp });

        if (recentOtp == 0) {
            return res.status(404).json({
                success: false,
                message: "OTP Not found",
            })
        } else if (otp !== recentOtp.otp) {
            return res.status(400).json({
                success: false,
                message: "The Invalid OTP",
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`,
            password:hashedPassword,
        });
        console.log("Signup Successfull");
        return res.status(200).json({
            success: true,
            message: "User is Registerd Successfully",
            data:user,
        })
    } catch (error) {
        console.error(error.message);
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Again Fill the Form",
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: "All Field Are required",
            })
        }
        const user = await User.findOne({ email:email }).populate("task").populate("feed").exec();
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User Not Valide",
            })
        }
        const mtPassword = user.password;
        if (await bcrypt.compare(password, mtPassword)) {
            const payload = {
                email: user.email,
                id: user._id,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '2h',
            })
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 100),
                httpOnly: true,
            }
            return res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "User Login Successfully",
            })
        } else {
            return res.status(401).json({
                success: false,
                message: "Password Not Matched",
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            message: "Logined Fail",
            error,
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findByIdAndDelete({ _id: id });
        if (user) {
            return res.status(200).json({
                success: true,
                message: "Deletion Successfully",
            })
        } else {
            return res.status(500).json({
                success: false,
                message: "Somthing Error to delete the User",
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Somthing Error to delete the User",
            error,
        })
    }
}

exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, cnfPassword } = req.body;
        const userId = req.user.id;
        if (!oldPassword || !newPassword || !cnfPassword) {
            return res.status(400).json({
                success: false,
                message: "All Field Are Required",
            })
        }
        if (newPassword === cnfPassword) {
            return res.status(401).json({
                success: false,
                message: "New Password and CNF Password are Not Matching",
            })
        }
        const user = await User.findById({ _id: userId })
        if (!bcrypt.compare(oldPassword, user.password)) {
            return res.status(403).json({
                success: false,
                message: "Password are Not Match, Enter Correct PAssword",
            })
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        await mail(user.email, "Change Password");
        return res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });
    } catch (error) {
        console.log(error.message),
            res.status(500).json({
                success: false,
                message: "Somthing error while updatating the Password",
            })
    }
}