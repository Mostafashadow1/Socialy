import { Router } from "express";
import { commentController } from "../controllers/commentController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const {
  createComment,
  UpdateComment,
  likeComment,
  unLikeComment,
  deleteComment,
} = commentController;
export const commentRouter = Router();
commentRouter.post("/comment", authMiddleware, createComment);
commentRouter.patch("/comment/:id", authMiddleware, UpdateComment);
commentRouter.patch("/comment/:id/like", authMiddleware, likeComment);
commentRouter.patch("/comment/:id/unlike", authMiddleware, unLikeComment);
commentRouter.delete("/comment/:id", authMiddleware, deleteComment);
