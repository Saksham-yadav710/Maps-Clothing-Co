import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import {
  getBannerSettings,
  updateBannerSettings,
} from "../controllers/bannerController.js";

const bannerRouter = express.Router();

bannerRouter.get("/", getBannerSettings);
bannerRouter.put("/", auth, admin, updateBannerSettings);

export default bannerRouter;
