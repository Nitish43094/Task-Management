const cloudinary = require('cloudinary').v2;
require("dotenv").config();

exports.cloudinaryConnection = async () =>{
    try{
        const connection = cloudinary.config({
            cloud_name : process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret : process.env.API_SECRET
        })
        if(connection){
            console.log("Cloude Connection successfull")
        }
    }catch(err){
        console.log(err);
    }
}