import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import { sendMail } from "../services/mail.service";
import jwt from "jsonwebtoken";

export const loginHandler = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const checkPassword = await bcrypt.compare(password, user.password!);
        if(!checkPassword) {
            return res.status(201).json({ success: false, message: "Enter correct password" });
        }

        const data = { user: { id: user._id }}
        const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "10m" });
        const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: "1d" });

        user.refreshToken = refreshToken;
        await user.save();

        return res.status(200).json({ success: true, accessToken: accessToken, refreshToken: refreshToken });

    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
}


export const signupHandler = async (req: Request, res: Response) => {
    try {
        
        const { username, email, password } = req.body;
        
        const foundUser1 = await User.find({ email: email });
        if (foundUser1.length > 0) {
            return res.status(400).json({ success: false, message: "Email Already exists" })
        }
        
        const foundUser2 = await User.find({ username: username });
        if (foundUser2.length > 0) {
            return res.status(400).json({ success: false, message: "Username Already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);

        const user = await User.create({
            email: email,
            username: username,
            password: hashPass
        })

        const mail = await sendMail({
            email: email,
            type: "verify",
            userId: user._id
        });

        return res.status(201).json({ success: true, message: "User added Mail sent" });

    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
}

export const verifyUser = async (req: Request, res: Response) => {
    try {

        const { token } = req.body;
        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(400).json({ message: "Invalid token", success: false });
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return res.status(200).json({
            message: "Email Verified!",
            success: true,
        });

    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
};