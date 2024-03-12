import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);

  if (!token || token === "Bearer null") {
    return res.json("Please Login to access this resource.");
  }

  const decodedData = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
  console.log("decoded", decodedData);
  const user = await User.findById(decodedData.id);

  if (!user) {
    return res.json("Please Login to access this resource.");
  }

  req.user = user;
  next();
};
