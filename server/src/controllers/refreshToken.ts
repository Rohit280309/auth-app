import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export const refreshTokenHandler = async (req: Request, res: Response) => {
    try {
        
        const { token } = req.body;
        if(!token) {
            return res.status(400).json({ message: "Please authenticate using valid token" })
        }
        const data: any = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!);
        const userId = data.user.id;
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        if (token !== user.refreshToken) {
            return res.status(400).json({ message: "Please authenticate using valid token" })
        }

        const payloadData = { user: { id: data.user.id } };
        
        const accessToken = jwt.sign(payloadData, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "10m" });

        return res.status(200).json({ success: true, accessToken: accessToken, message: "New Token" });

    } catch (error: any) {
        console.log("Token verification error:", error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}