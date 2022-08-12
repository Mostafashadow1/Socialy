import mongoose from "mongoose";
const { Schema } = mongoose;
const commentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    tag: Object,
    reply: mongoose.Types.ObjectId,
    likes: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    user: { type: mongoose.Types.ObjectId, ref: "user" }, // user add Comment
    userId: mongoose.Types.ObjectId,
    userPostId: mongoose.Types.ObjectId, // Id User post
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("comment", commentSchema);
