import express from "express";
import { getUserController } from "../controllers/user";
import { fetchUser } from "../middleware/fetchUser";

const router = express.Router();

router.get("/getUser", fetchUser, getUserController);

export default router;