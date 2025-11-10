import mongoose from "mongoose";
import {ENV} from '../lib/env.js';
export const connectDB = async () => {
    const { MONGO_URI } = ENV;
    if (!MONGO_URI) {
        throw new Error("MONGO_URI is not defined in environment variables");
    }
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};