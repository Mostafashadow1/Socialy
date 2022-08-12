import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { messageController } from "../controllers/messageController.js";
const { createMessage, getChats, getMessages, deleteMessage, deleteChat } =
  messageController;
export const messageRouter = Router();
messageRouter.post("/message", authMiddleware, createMessage);
messageRouter.get("/chat", authMiddleware, getChats);
messageRouter.get("/messages/:id", authMiddleware, getMessages);
messageRouter.delete("/message/:id", authMiddleware, deleteMessage);
messageRouter.delete("/chat/:id", authMiddleware, deleteChat);
