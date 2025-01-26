const mongoose = require('mongoose')
const mailSender = require("../utils/mailSender")
const {emailVarifaction} = require('../mails/templates/emailVarifactionPage')

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
    },
    otp:{
        type:String,
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    }
})

async function sendEmailVerifaction(email,otp) {
    try{
        const mailResponse = await mailSender(email,"OTP Verification",emailVarifaction(otp))
        console.log("Email Sent Successfull",mailResponse);
    }catch(error){
        console.log("Error occured while sending mails ",error);
      throw error;
    }
}

otpSchema.pre('save',async function (next) {
    await sendEmailVerifaction(this.email,this.otp);
    next();
})

module.exports = mongoose.model("OTP",otpSchema);