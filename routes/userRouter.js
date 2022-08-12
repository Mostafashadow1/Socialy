import express from "express";
import { userController } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const { searchUsers, getUser, updateUser, follow, unFollow, suggestionUser } =
  userController;
export const userRouter = express.Router();
userRouter.get("/search", authMiddleware, searchUsers);
userRouter.get("/user/:id", authMiddleware, getUser);
userRouter.patch("/user", authMiddleware, updateUser);
userRouter.patch("/user/:id/follow", authMiddleware, follow);
userRouter.patch("/user/:id/unfollow", authMiddleware, unFollow);
userRouter.get("/suggestionUser", authMiddleware, suggestionUser);
