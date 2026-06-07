import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

// Get banner settings (public)
export const getBannerSettings = async (req: Request, res: Response) => {
  try {
    let banner = await prisma.bannerSetting.findUnique({
      where: { id: "global" },
    });

    if (!banner) {
      // Create default if it doesn't exist
      banner = await prisma.bannerSetting.create({
        data: {
          id: "global",
          text1: "Free shipping on orders over ₹1250",
          text2: "Wear Confidence, Spend Smart with MAPS.",
          isVisible: true,
        },
      });
    }

    res.json({ banner });
  } catch (error) {
    console.error("Error fetching banner settings:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update banner settings (admin only)
export const updateBannerSettings = async (req: Request, res: Response) => {
  const { text1, text2, isVisible } = req.body;

  try {
    const banner = await prisma.bannerSetting.upsert({
      where: { id: "global" },
      update: {
        text1,
        text2,
        isVisible,
      },
      create: {
        id: "global",
        text1: text1 || "Free shipping on orders over ₹1250",
        text2: text2 || "Wear Confidence, Spend Smart with MAPS.",
        isVisible: isVisible ?? true,
      },
    });

    res.json({ banner });
  } catch (error) {
    console.error("Error updating banner settings:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
