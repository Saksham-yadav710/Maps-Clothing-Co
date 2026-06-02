import type { NextFunction, Request, Response } from "express";
import { prisma } from "../config/prisma.js";

const admin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userID = req.user?.id;
    if (!userID) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await prisma.user.findUnique({ where: { id: userID } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const adminEmails = process.env.ADMIN_EMAILS
      ? process.env.ADMIN_EMAILS.split(",").map((e) => e.trim().toLowerCase())
      : [];

    if (adminEmails.includes(user.email.toLowerCase())) {
      if (req.user) req.user.isAdmin = true;
      next();
    } else {
      return res.status(403).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);

    const message = error instanceof Error ? error.message : "Unknown error";

    return res
      .status(500)
      .json({ message: "Admin verification failed.", error: message });
  }
};

export default admin;
