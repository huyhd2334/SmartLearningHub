import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNNECTIONSTRING);

    console.log("Connect database successfully");
  } catch (error) {
    console.error("can not connect to database:", error);
    process.exit(1); // exit with error
  }
};
