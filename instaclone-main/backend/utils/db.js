import mongoose from "mongoose";
import chalk from "chalk";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(chalk.yellow("mongodb connected successfully."));
  } catch (error) {
    console.log(chalk.bgRed(error));
  }
};
export default connectDB;
