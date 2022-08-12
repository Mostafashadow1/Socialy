import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { notificationsController } from "../controllers/notificationsController.js";
const {
  createNotification,
  deleteNotification,
  getNotification,
  isReadNotification,
  deleteAllNotifications,
} = notificationsController;
export const notificationRouter = Router();
notificationRouter
  .route("/notification")
  .post(authMiddleware, createNotification)
  .get(authMiddleware, getNotification);
notificationRouter.delete(
  "/notification/:id",
  authMiddleware,
  deleteNotification
);

notificationRouter.patch(
  "/readNotification/:id",
  authMiddleware,
  isReadNotification
);

notificationRouter.delete(
  "/deleteAllNotification",
  authMiddleware,
  deleteAllNotifications
);
