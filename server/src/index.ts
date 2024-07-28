import express from "express";
import cors from "cors";
import { connect } from "./config/db";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import refreshRouter from "./routes/refreshToken";
import forgotRouter from "./routes/forgotPassword";
import path from "path";

connect();

const PORT = process.env.PORT!;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", refreshRouter);
app.use("/api", forgotRouter);

app.use('/logo', express.static(path.join(__dirname, 'uploads/profileImages')));

app.listen(PORT, () => {
    console.log(`App listening on http://127.0.0.1:${PORT}`);
})