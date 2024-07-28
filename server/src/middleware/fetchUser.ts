import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../controllers/user";

export const fetchUser = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header is missing" });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
      return res.status(401).json({ message: "Invalid authorization format" });
    }
  
    const token = parts[1];

    try {
        const data: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
        req.user = data.user;
        next();
    } catch (error: any) {
        console.log("Token verification error:", error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}