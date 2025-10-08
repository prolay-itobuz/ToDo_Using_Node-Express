import mongoose from 'mongoose';
import dotenv from "dotenv";

import 'dotenv/config'; // Loads .env file at the top

dotenv.config()
const db_uri = process.env.MONGO_URI

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(db_uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
