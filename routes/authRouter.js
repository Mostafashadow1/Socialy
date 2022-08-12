import { Router } from "express";
import { authController } from "../controllers/authController.js";
const { register, login, logout, genrateAccessToken } = authController;
export const authRouter = Router();
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/refreshtoken", genrateAccessToken);
