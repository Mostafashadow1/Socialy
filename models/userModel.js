import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    avatar: {
      type: String,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
      maxLength: 22,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 25,
      minLength: 8,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    role: {
      type: String,
      default: "user",
    },
    website: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    number: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
      maxLength: 150,
    },
    following: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
    followers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
    saved: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("user", userSchema);
