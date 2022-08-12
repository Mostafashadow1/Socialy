import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { postController } from "../controllers/postController.js";
const {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  likePost,
  unLikePost,
  getPostsUser,
  getDetailsPost,
  getPostsExplorePage,
  savePost,
  unSavePost,
  getSavePosts,
} = postController;
export const postRouter = Router();
postRouter
  .route("/posts")
  .post(authMiddleware, createPost)
  .get(authMiddleware, getPosts);

postRouter
  .route("/post/:id")
  .patch(authMiddleware, updatePost)
  .get(authMiddleware, getDetailsPost)
  .delete(authMiddleware, deletePost);

postRouter.patch("/post/:id/like", authMiddleware, likePost);
postRouter.patch("/post/:id/unliked", authMiddleware, unLikePost);
postRouter.get("/posts_user/:id", authMiddleware, getPostsUser);
postRouter.get("/posts_explore", authMiddleware, getPostsExplorePage);
postRouter.patch("/save_post/:id", authMiddleware, savePost);
postRouter.patch("/unsave_post/:id", authMiddleware, unSavePost);
postRouter.get("/get_posts_save", authMiddleware, getSavePosts);
