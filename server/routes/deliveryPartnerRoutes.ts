import express from "express";
import deliveryAuth from "../middleware/deliveryAuth.js";
import {
  loginPartner,
  getMyDeliveries,
  getDeliveryDetail,
  completeDelivery,
  cancelDelivery,
  updateDeliveryStatus,
  updateLocation,
} from "../controllers/deliveryPartnerController.js";

const deliveryPartnerRouter = express.Router();

deliveryPartnerRouter.post("/login", loginPartner);

deliveryPartnerRouter.get("/my-deliveries", deliveryAuth, getMyDeliveries);

deliveryPartnerRouter.get(
  "/my-deliveries/:id",
  deliveryAuth,
  getDeliveryDetail,
);

deliveryPartnerRouter.put(
  "/my-deliveries/:id/complete",
  deliveryAuth,
  completeDelivery,
);

deliveryPartnerRouter.put(
  "/my-deliveries/:id/cancel",
  deliveryAuth,
  cancelDelivery,
);

deliveryPartnerRouter.put(
  "/my-deliveries/:id/status",
  deliveryAuth,
  updateDeliveryStatus,
);

deliveryPartnerRouter.put(
  "/my-deliveries/:id/location",
  deliveryAuth,
  updateLocation,
);

export default deliveryPartnerRouter;
