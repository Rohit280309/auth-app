import { Request, Response } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";

export const googleLoginController = async (req: Request, res: Response) => {
    try {
        const { googleAccessToken } = req.body;
        if (!googleAccessToken) {
            return res.status(400).json({ message: "Please provide the token" });
        }
        
        const decoded: any = jwt.decode(googleAccessToken)

        const { given_name: firstName, family_name: lastName, email, picture } = decoded;

        let existingUser = await User.findOne({ email });
        if (!existingUser) {
            existingUser = await User.create({
                username: `${firstName}${lastName}`,
                email,
                profileImage: picture,
                isVerified: true,
                googleLogin: true
            });
        }

        const data = { user: { id: existingUser._id } };
        const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "10m" });
        const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: "1d" });

        existingUser.refreshToken = refreshToken;
        await existingUser.save();

        return res.status(200).json({ success: true, accessToken, refreshToken });
    } catch (error: any) {
        console.error("Error in googleLoginController:", error.response?.data || error.message);
        return res.status(500).json({ error: error.message });
    }
};
