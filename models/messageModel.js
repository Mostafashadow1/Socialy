import mongoose from "mongoose";
const { Schema } = mongoose;
const messageSchema = new Schema(
  {
    chat: { type: mongoose.Types.ObjectId, ref: "chat" },
    sender: { type: mongoose.Types.ObjectId, ref: "user" },
    recipient: { type: mongoose.Types.ObjectId, ref: "user" },
    messageText: String,
    media: Array,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("message", messageSchema);
