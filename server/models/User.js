const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
    },
    token: {
        type: String,
    },
    task: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
        }
    ],
    feed: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Feed",
        }
    ],
    resetPasswordExpires: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("User", userSchema);
