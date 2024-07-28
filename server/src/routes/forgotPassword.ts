import express from "express";
import { changePasswordController, sendForgotPasswordEmail } from "../controllers/forgotPassword";

const router = express.Router();

router.post("/sendForgotMail", sendForgotPasswordEmail);
router.post("/resetPassword", changePasswordController);

export default router;