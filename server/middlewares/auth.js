const jwt = require('jsonwebtoken')
require('dotenv').config();
const User = require('../models/User');

exports.auth = async(req,res,next) =>{
    try{
        const token = req.cookies?.token || req.body.token || req.header("Authorization")?.replace("Bearer",'').trim();

        if(!token){
            return res.status(401).json({
                success:false,
                message : "Token is missing",
            })
        }
        
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log("decoded token",decoded);
        req.user = decoded;
        next();
    }catch(error){
        console.log(error);
        return res.status(401).json({
            success : false,
            message : "Invalid Or Expired Token",
        });
    }
}