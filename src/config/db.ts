import mongoose from "mongoose";

const mongoUrl = process.env.MONGO_DB_URL;

const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(mongoUrl as string);
    console.log(`MongoDB connected :${connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
