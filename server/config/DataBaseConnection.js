const mongoose = require('mongoose')
require('dotenv').config();

const dbConnection = async() =>{
    try{
        mongoose.connect(process.env.MONGODB_URL)
        .then(()=>{
            console.log("Connection successfull")
        })
        .catch(()=>{
            console.log("Connection Field");
        })
    }catch(err){
        console.error(err);
        console.log("Somthing error for conncetion");
    }
}
module.exports = dbConnection;