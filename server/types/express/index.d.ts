import { User, DeliveryPartner } from "../../generated/client/client.ts";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        isAdmin?: boolean;
      };
      partner?: DeliveryPartner;
    }
  }
}
