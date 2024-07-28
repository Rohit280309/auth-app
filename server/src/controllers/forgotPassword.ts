import { Request, Response } from "express";
import { User } from "../models/User";
import { sendMail } from "../services/mail.service";
import bcrypt from "bcryptjs";

export const sendForgotPasswordEmail = async (req: Request, res: Response) => {
    try {
        
        const { email } = req.body;

        const user = await User.findOne({
            email: email
        });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const mail = await sendMail({
            email: email,
            type: "forgotPass",
            userId: user!._id
        });

        return res.status(200).json({ success: true, message: "Email sent" });

    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
}

export const changePasswordController = async (req: Request, res: Response) => {
    try {
        
        const { token, password } = req.body;
        
        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: { $gt: Date.now() }
        });
        if (!user) {
            return res.status(404).json({ success: true, message: "User not found" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);
        
        user.password = hashPass;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        user.isVerified = true;

        await user.save();

        return res.status(200).json({ success: true, message: "Password changed successfully" });


    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ error: error });   
    }
}