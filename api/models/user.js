import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    }
  },
  { timestamps: true } //timestamp
);

const User = mongoose.model("Users", userSchema);

export default User;
