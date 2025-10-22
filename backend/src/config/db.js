import mongoose from "mongoose";
import dotenv from "dotenv";
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNNECTIONSTRING);

    console.log("Connect database successfully 🥳");
  } catch (error) {
    console.error("can not connect to database 🥵:", error);
    process.exit(1); // exit with error
  }
};
