import mongoose from "mongoose";
const { Schema } = mongoose;
const notificationsScehma = new Schema(
  {
    postId: mongoose.Types.ObjectId,
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    recipients: [mongoose.Types.ObjectId],
    url: String,
    content: String,
    title: String,
    image: String,
    isRead: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("notification", notificationsScehma);
