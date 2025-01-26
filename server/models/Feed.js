const mongoose = require('mongoose')

const feedSchema = new mongoose.Schema({
    title : {
        type:String,
        trim:true,
    },
    image : {
        type:String,
        trim:true,
    },
    userId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model("Feed",feedSchema)