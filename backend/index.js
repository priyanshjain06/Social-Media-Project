import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./socket/socket.js"; //REVIEW
import path from "path"; //REVIEW
import chalk from "chalk";

dotenv.config(); //REVIEW -

const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const corsOptions = {
  origin: process.env.URL, //frontend end point
  credentials: true,
};
app.use(cors(corsOptions));

// yha pr apni api ayengi
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);
//REVIEW  http://localhost:3000/api/v1/user

//REVIEW here dist is the build folder of frontend : npm run build
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// if anything rather than above 3 frontend site is requested it will go to backend
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

//REVIEW this is for socket.js and here server is extracted from socket.js
const startServer = async () => {
  try {
    await connectDB(); // Ensure DB is connected before starting server
    server.listen(PORT, () => {
      console.log(chalk.blue(`Server listening at http://localhost:${PORT}`));
    });
  } catch (error) {
    console.error(chalk.bgred("Failed to start server:"), error);
  }
};

startServer(); //REVIEW -
