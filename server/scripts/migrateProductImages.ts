import axios from "axios";
import { prisma } from "../config/prisma.js";
import cloudinary from "../config/cloudinary.js";

async function migrateImages() {
  const products = await prisma.product.findMany();

  console.log(`Found ${products.length} products`);

  for (const product of products) {
    try {
      if (!product.image.includes("raw.githubusercontent.com")) {
        console.log(`Skipping ${product.name} (already migrated)`);
        continue;
      }

      console.log(`Migrating ${product.name}`);

      const uploadResult = await cloudinary.uploader.upload(product.image, {
        folder: "grocery-products",
        public_id: product.name.toLowerCase().replace(/\s+/g, "-"),
        overwrite: true,
      });

      await prisma.product.update({
        where: { id: product.id },
        data: {
          image: uploadResult.secure_url,
        },
      });

      console.log(`Done -> ${uploadResult.secure_url}`);
    } catch (err) {
      console.error(`Failed: ${product.name}`, err);
    }
  }

  console.log("Migration complete");
}

migrateImages()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
