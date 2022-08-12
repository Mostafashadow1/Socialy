import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/authRouter.js";
import { userRouter } from "./routes/userRouter.js";
import { postRouter } from "./routes/postRouter.js";
import { commentRouter } from "./routes/commentRouter.js";
import { notificationRouter } from "./routes/notificationsRouter.js";
import { messageRouter } from "./routes/messageRouter.js";
// Socket [es6 Module]
import { createServer } from "http";
import { Server } from "socket.io";
import { SocketServer } from "./SocketServer.js";
// Debloy
import path from "path";
//
const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Connect to db
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (err) {
    console.log(err.message);
  }
};
connectToDB();

// Socket
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: true,
});
io.on("connection", (socket) => {
  SocketServer(socket);
});

// All Routes
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", postRouter);
app.use("/api", commentRouter);
app.use("/api", notificationRouter);
app.use("/api", messageRouter);

// Debloy
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(`${__dirname}/client/build`));
  app.get("*", (req, res) =>
    res.sendFile(`${__dirname}/client/build/index.html`)
  );
}

httpServer.listen(PORT, () => console.log(`Server Running in Port ${PORT}`));
