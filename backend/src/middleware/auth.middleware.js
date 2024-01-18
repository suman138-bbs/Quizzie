import JWT from "jsonwebtoken";

import User from "../models/user.schema.js";
import asyncHandler from "../service/asyncHandler.js";
import config from "../config.js";

export const isLoggedIn = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.cookies.token ||
    (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer"))
  ) {
    token = req.cookies.token || req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res
      .status(400)
      .json({
        success: true,
        message: "Not authorized to access this resource ",
      });
  }

  try {
    const decodedJwtPayload = JWT.verify(token, config.JWT_SECRET);
    req.user = await User.findById(decodedJwtPayload._id, "name email role");
    next();
  } catch (error) {
    throw new CustomError("Not authorized to access this resource ", 401);
  }
});
