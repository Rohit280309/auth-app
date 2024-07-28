import { Request, Response } from "express";
import { User } from "../models/User";

export interface AuthRequest extends Request {
    user? : { id: string }
}

export const getUserController = async (req: AuthRequest, res: Response) => {
    try {
        const authUser = req.user?.id;
        // console.log(authUser);
        const user = await User.findById(authUser).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(200).json({ success: true, user: user });
        
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
}
