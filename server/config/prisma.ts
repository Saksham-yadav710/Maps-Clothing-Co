import { PrismaClient } from "../generated/client/client.js";
import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({ adapter });
