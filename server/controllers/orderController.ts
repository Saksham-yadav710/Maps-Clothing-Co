import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import type { Prisma } from "../generated/prisma/client.js";
import { inngest } from "../inngest/index.js";

//create order
//post /api/orders

export const createOrder = async (req: Request, res: Response) => {
  const { items, shippingAddress, paymentMethod } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "no order items" });
  }

  const normalizedItems = items.map((item: any) => ({
    product: String(item.product ?? ""),
    quantity: Number(item.quantity),
  }));

  for (const item of normalizedItems) {
    if (
      !item.product ||
      !Number.isInteger(item.quantity) ||
      item.quantity <= 0
    ) {
      return res.status(400).json({ message: "Invalid item quantity" });
    }
  }

  const quantityByProduct = new Map<string, number>();
  for (const item of normalizedItems) {
    quantityByProduct.set(
      item.product,
      (quantityByProduct.get(item.product) ?? 0) + item.quantity,
    );
  }

  const productIDs = Array.from(quantityByProduct.keys());
  const products = await prisma.product.findMany({
    where: { id: { in: productIDs } },
  });

  if (products.length !== productIDs.length) {
    return res.status(404).json({ message: "Product not found" });
  }

  const productMap: Record<string, (typeof products)[0]> = {};
  for (const p of products) {
    productMap[p.id] = p;
  }

  for (const [productId, quantity] of quantityByProduct) {
    const product = productMap[productId];
    if (!product || (product.stock ?? 0) < quantity) {
      return res.status(409).json({ message: "Product out of stock" });
    }
  }

  const orderItems = Array.from(quantityByProduct.entries()).map(
    ([productId, quantity]) => {
      const dbProduct = productMap[productId];
      return {
        product: dbProduct.id,
        name: dbProduct.name,
        image: dbProduct.image,
        price: dbProduct.price,
        quantity,
        unit: dbProduct.unit,
      };
    },
  );

  const subtotal = orderItems.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0,
  );
  const deliveryFee = subtotal > 20 ? 0 : 1.99;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = Math.round((subtotal + deliveryFee + tax) * 100) / 100;

  const isCardPayment = paymentMethod === "card";

  try {
    const order = await prisma.$transaction(async (tx) => {
      const db = tx as unknown as typeof prisma;
      const createdOrder = await db.order.create({
        data: {
          userId: req.user!.id,
          items: orderItems,
          shippingAddress,
          paymentMethod,
          subtotal,
          deliveryFee,
          tax,
          total,
          statusHistory: [
            {
              status: "Placed",
              note: isCardPayment
                ? "Payment pending"
                : "Order placed successfully",
              timestamp: new Date(),
            },
          ],
        },
      });

      if (!isCardPayment) {
        for (const item of orderItems) {
          const updated = await db.product.updateMany({
            where: { id: item.product, stock: { gte: item.quantity } },
            data: { stock: { decrement: item.quantity } },
          });

          if (updated.count === 0) {
            throw new Error("OUT_OF_STOCK");
          }
        }
      }

      return createdOrder;
    });

    if (!isCardPayment) {
      for (const item of orderItems) {
        await inngest.send({
          name: "inventory/stock.updated",
          data: { productId: item.product },
        });
      }
    }

    await inngest.send({
      name: "order/placed",
      data: { orderId: order.id },
    });

    return res.json({ order });
  } catch (error) {
    if (error instanceof Error && error.message === "OUT_OF_STOCK") {
      return res.status(409).json({ message: "Product out of stock" });
    }

    console.error(error);
    return res.status(500).json({ message: "Failed to create order" });
  }
};

//get user orders
//get /api/orders

export const getUserOrders = async (req: Request, res: Response) => {
  const { status } = req.query;

  const where: any = {
    userId: req.user!.id,
    NOT: [{ paymentMethod: "card", isPaid: false }],
  };

  if (status && status !== "all") {
    where.status = status;
  }

  const orders = await prisma.order.findMany({
    where,
    include: { deliveryPartner: { select: { name: true, phone: true } } },
    orderBy: { createdAt: "desc" },
  });

  res.json({ orders });
};

//get single order
//get /api/orders/:id
export const getOrder = async (req: Request, res: Response) => {
  const order = await prisma.order.findFirst({
    where: { id: req.params.id as string, userId: req.user!.id },
    include: {
      deliveryPartner: {
        select: { name: true, phone: true, avatar: true, vehicleType: true },
      },
    },
  });

  if (!order) {
    return res.status(404).json({ message: "Order not found." });
  }

  res.json({ order });
};

// Update order status (admin)
// PUT /api/orders/:id/status
export const updateOrderStatus = async (req: Request, res: Response) => {
  const { status, note } = req.body;
  const order = await prisma.order.findUnique({
    where: { id: req.params.id as string },
  });

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  const history = (
    Array.isArray(order.statusHistory) ? order.statusHistory : []
  ) as any[];

  history.push({
    status,
    note: note || `Order ${status.toLowerCase()}`,
    timestamp: new Date(),
  });

  const updatedOrder = await prisma.order.update({
    where: { id: req.params.id as string },
    data: { status, statusHistory: history },
  });

  res.json({ order: updatedOrder });
};

// Get all orders (admin)
// GET /api/orders/all
export const getAllOrders = async (req: Request, res: Response) => {
  const orders = await prisma.order.findMany({
    where: { NOT: [{ paymentMethod: "card", isPaid: false }] },
    include: {
      user: { select: { name: true, email: true } },
      deliveryPartner: {
        select: {
          name: true,
          phone: true,
          email: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  res.json({ orders });
};

// Get Order Location
// GET /api/orders/:id/location
export const getOrderLocation = async (req: Request, res: Response) => {
  const order = await prisma.order.findFirst({
    where: {
      id: req.params.id as string,
      userId: req.user!.id,
    },
    select: {
      liveLocation: true,
      status: true,
    },
  });

  if (!order) return res.status(404).json({ message: "Order not found" });

  res.json({
    liveLocation: order.liveLocation,
    status: order.status,
  });
};
