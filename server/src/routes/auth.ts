import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { loginHandler, signupHandler, verifyUser } from "../controllers/auth";
import { googleLoginController } from "../controllers/googleLogin";

const router = express.Router();

router.post("/login", [
    body("email", "Please provide an email").isEmail(),
    body("password", "Please provide a strong password").isLength({ min: 8 })
], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    await loginHandler(req, res);
})

router.post("/signup", [
    body("username", "Please provide an username").isLength({ min: 2 }),
    body("email", "Please provide an email").isEmail(),
    body("password", "Please provide a strong password").isStrongPassword({ minLength: 8, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    await signupHandler(req, res);
})

router.post("/googleLogin", googleLoginController);

router.post("/verify", verifyUser);

export default router;