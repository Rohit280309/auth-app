import mongoose from "mongoose";

const DB_URL = process.env.DB_URL!;

export const connect = () => {
    mongoose.connect(DB_URL)
        .then((res) => console.log("Connected to db"))
        .catch(err => {
            console.error("Failed to connect to db", err);
            process.exit(1);
        });
}