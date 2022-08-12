import mongoose from "mongoose";
const { Schema } = mongoose;
const chatSchema = new Schema(
  {
    recipients: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    messageText: String,
    media: Array,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("chat", chatSchema);
