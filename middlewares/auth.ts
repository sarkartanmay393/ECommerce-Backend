import { NextFunction } from "express";
import { ReqType, ResType } from "../utils/types";
import * as jwt from "jsonwebtoken";

export default function AuthMiddleware(
  req: ReqType,
  res: ResType,
  next: NextFunction
) {
  let { token } = req.cookies as { token: string };
  if (!token) {
    token = req.headers.token as string;
    if (!token) {
      console.log("no token");
      return res.status(401).json({ message: "User not authenticated" });
    }
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET || ""
    ) as string;
    req.headers["userId"] = decodedToken;
    next();
  } catch (error) {
    res.clearCookie("token");
    return res.status(401).json(error);
  }
}
