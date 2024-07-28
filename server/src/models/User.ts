import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide an username"]
    },
    email: {
        type: String,
        required: [true, "Please provide an email"]
    },
    password: {
        type: String,
    },
    profileImage: {
        type: String,
        default: "http://localhost:5000/logo/profile.png"
    },
    date: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    refreshToken: String,
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    googleLogin: Boolean
});

export const User = mongoose.model("User", userSchema);
