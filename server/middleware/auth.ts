import type { NextFunction, Request, Response } from "express";
import type { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ message: "No token provided, authorisation denied" });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) return res.status(500).json({ message: "JWT secret missing" });

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token is not valid" });
    }

    const decoded = jwt.verify(token, secret);

    const hasId = (
      payload: string | JwtPayload,
    ): payload is JwtPayload & { id: string } =>
      typeof payload === "object" &&
      payload !== null &&
      typeof payload.id === "string";

    if (!hasId(decoded)) {
      return res.status(401).json({ message: "Token is not valid" });
    }

    req.user = { id: decoded.id };
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Token is not valid" });
  }
};

export default auth;
