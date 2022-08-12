import notificationsScehma from "../models/notificationsModel.js";

export const notificationsController = {
  // Create a new notification
  async createNotification(req, res) {
    try {
      const { postId, url, recipients, image, content, title } = req.body;
      if (recipients.includes(req.user._id.toString())) return;
      const notification = new notificationsScehma({
        postId,
        url,
        recipients,
        image,
        content,
        title,
        user: req.user._id,
      });

      await notification.save();
      return res.json({
        notification,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // delete a  notification
  async deleteNotification(req, res) {
    try {
      const notfication = await notificationsScehma.findOneAndDelete({
        postId: req.params.id,
        url: req.query.url,
      });
      return res.json({ notfication });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // get notification
  async getNotification(req, res) {
    try {
      const notfication = await notificationsScehma
        .find({
          recipients: req.user._id,
        })
        .sort("-createdAt")
        .populate("user", "avatar username followers following");
      return res.json({ notfication });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // Is Read notification
  async isReadNotification(req, res) {
    try {
      const notfication = await notificationsScehma.findOneAndUpdate(
        { _id: req.params.id },
        {
          isRead: true,
        }
      );
      return res.json({ notfication });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // Delete All notification
  async deleteAllNotifications(req, res) {
    try {
      const notfication = await notificationsScehma.deleteMany({
        recipients: req.user._id,
      });
      return res.json({ notfication });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
