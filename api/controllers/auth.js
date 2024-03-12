import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

export const register = async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.json({ error: "User already exist" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = {
    email: req.body.email,
    password:hashedPassword,
  };

  const user = await User.create(newUser);

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "2d",
    }
  );

  res.json({ user, token });
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.json({ error: "User not exist" });
  }
  // if (user.password !== req.body.password) {
  //   return res.json({ error: "incorrect pass" });
  // }

  const isPasswordCorrect = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordCorrect) return res.json("Wrong password or username!");
  
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "2d",
    }
  );
  res.json({ user, token });
};

export const reUser = async (req, res, next) => {
  try {
    res.status(200).json({
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
