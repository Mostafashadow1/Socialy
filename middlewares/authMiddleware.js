import UserSchema from "../models/userModel.js";
import jwt from "jsonwebtoken";
// get Access Token and verify them
export const authMiddleware = async (req, res, next) => {
  try {
    const accessToken = req.header("Authorization");
    if (!accessToken)
      return res.status(401).send({ msg: "invalid Authenticaion." });
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN);
    // check token is valid or no
    if (!decoded) return res.status(401).json({ msg: "invalid Authenticaion" });
    // get user from database
    const user = await UserSchema.findOne({ _id: decoded.id });
    // send user in request
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ msg: err.message });
  }
};
