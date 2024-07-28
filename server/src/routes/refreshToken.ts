import express from "express";
import { refreshTokenHandler } from "../controllers/refreshToken";

const router = express.Router();

router.post("/refresh", refreshTokenHandler);

export default router;