import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    country: {
      type: String,
    },
    phonenumber: {
      type: String,
    },
    isTutor: {
      type: Boolean,
    },
    desc: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
