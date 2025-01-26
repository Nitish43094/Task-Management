const User = require('../models/User');
const mailSender = require('../utils/mailSender')
const bcrypt = require('bcrypt')

exports.resetPasswordToken = async (res,req) =>{
    try{
        const {email} = req.body;
        const user = await User.findOne({email:email})
        if(!user){
            return res.json({
                success: false,
                message: "Your email is not registred with us",
            })
        }

        const token = crypto.randomUUID();
        const updatedDetails = await User.findByIdAndUpdate(
            {email:email},
            {
                token:token,
                resetPasswordExpires : Date.now()+5*60*1000,
            },
            {new:true}
        )
        const url  = `http://locakhost:3000/update-password/${token}`
        await mailSender(email,`Password Reset Link ${url}`,url);
        return res.json({
            success: true,
            message: "Email sent Successfully, Please check email and change the password"
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Somthing error while Reset Password Token",
        })
    }
}

exports.resetPassword = async(req,res) =>{
    try{
        const {token,password,cnfPassword} = req.body;

        if(password!==cnfPassword){
            return res.json({
                success: false,
                message: "Passeord Not matching",
            })
        }

        const user = await User.findOne({token:token});

        if(!token){
            return res.json({
                success: false,
                message: "Token is invalid",
            });
        }
        if(user.resetPasswordExpires < Date.now()){
            return res.json({
                success: false,
                message: "Token is Expired, Please regenerate Your Token",
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
        await User.findByIdAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true}
        )
        return res.json({
            success: true,
            message: "Password Reset Successfully",
        })
    }catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "Somthing went wrong while reset passwod",
        })
    }
}
