import mongoose from "mongoose";
import config from "../config/config";

export const connectDB = async () => {
    try {
        const uri = config.MONGO_URI!;
        console.info("Connecting to database..." + uri);
        await mongoose.connect(`mongodb+srv://duartedc17:Y7DYwlFVmqSrdFVi@cluster0.yj9if.mongodb.net/test`);
        console.info("Database connected");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};