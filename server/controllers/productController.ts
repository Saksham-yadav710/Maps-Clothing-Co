import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

const arrayFields = [
  "sizes",
  "colors",
  "fits",
  "patterns",
  "rises",
  "stretches",
  "lengths",
  "closureTypes",
  "occasions",
  "brands",
  "materials",
  "washes",
  "collarTypes",
  "sleeveLengths",
  "pocketStyles",
  "tags",
] as const;

const parseList = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value !== "string") return [];

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const parseNumber = (value: unknown, fallback = 0) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
};

const addDiscount = (product: any) => {
  const originalPrice = product.originalPrice ?? 0;
  const price = product.price ?? 0;

  const discount =
    originalPrice > 0 && price > 0
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  return {
    ...product,
    originalPrice,
    stock: product.stock ?? 0,
    isOrganic: product.isOrganic ?? false,
    rating: product.rating ?? 0,
    reviewCount: product.reviewCount ?? 0,
    sizes: product.sizes ?? [],
    colors: product.colors ?? [],
    fits: product.fits ?? [],
    patterns: product.patterns ?? [],
    rises: product.rises ?? [],
    stretches: product.stretches ?? [],
    lengths: product.lengths ?? [],
    closureTypes: product.closureTypes ?? [],
    occasions: product.occasions ?? [],
    brands: product.brands ?? [],
    materials: product.materials ?? [],
    washes: product.washes ?? [],
    collarTypes: product.collarTypes ?? [],
    sleeveLengths: product.sleeveLengths ?? [],
    pocketStyles: product.pocketStyles ?? [],
    tags: product.tags ?? [],
    discount,
  };
};

const buildProductData = (body: any) => ({
  name: body.name,
  description: body.description ?? "",
  price: parseNumber(body.price),
  originalPrice: parseNumber(body.originalPrice),
  image: body.image,
  category: body.category,
  unit: body.unit ?? "piece",
  stock: parseNumber(body.stock),
  isOrganic: Boolean(body.isOrganic),

  sizes: parseList(body.sizes),
  colors: parseList(body.colors),
  fits: parseList(body.fits),
  patterns: parseList(body.patterns),
  rises: parseList(body.rises),
  stretches: parseList(body.stretches),
  lengths: parseList(body.lengths),
  closureTypes: parseList(body.closureTypes),
  occasions: parseList(body.occasions),
  brands: parseList(body.brands),
  materials: parseList(body.materials),
  washes: parseList(body.washes),
  collarTypes: parseList(body.collarTypes),
  sleeveLengths: parseList(body.sleeveLengths),
  pocketStyles: parseList(body.pocketStyles),
  tags: parseList(body.tags),
});

// get /api/products/flash-deals
export const getFlashDeals = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    where: { stock: { gt: 0 } },
    orderBy: { originalPrice: "desc" },
  });

  const productsWithDiscounts = products.map(addDiscount);

  res.json({ products: productsWithDiscounts.slice(0, 8) });
};

// get /api/products
export const getProducts = async (req: Request, res: Response) => {
  const {
    category,
    search,
    minPrice,
    maxPrice,
    sort,
    page = "1",
    limit = "12",
    organic,
  } = req.query;

  const where: any = {};

  if (category && category !== "all") {
    where.category = category as string;
  }

  if (search) {
    where.OR = [
      {
        name: { contains: search as string, mode: "insensitive" },
      },
      {
        description: { contains: search as string, mode: "insensitive" },
      },
    ];
  }

  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = Number(minPrice);
    if (maxPrice) where.price.lte = Number(maxPrice);
  }

  if (organic === "true") {
    where.isOrganic = true;
  }

  for (const field of arrayFields) {
    const value = req.query[field];
    const list = parseList(value);
    if (list.length > 0) {
      where[field] = { hasSome: list };
    }
  }

  const orderBy: any = {};
  if (sort === "price_asc") orderBy.price = "asc";
  else if (sort === "price_desc") orderBy.price = "desc";
  else if (sort === "rating") orderBy.rating = "desc";
  else if (sort === "name") orderBy.name = "asc";
  else orderBy.createdAt = "desc";

  const pageNumber = Math.max(1, parseNumber(page, 1));
  const pageSize = Math.max(1, Math.min(100, parseNumber(limit, 12)));
  const skip = (pageNumber - 1) * pageSize;

  const [total, products] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      orderBy,
      skip,
      take: pageSize,
    }),
  ]);

  const productsWithDiscounts = products.map(addDiscount);
  const pages = Math.max(1, Math.ceil(total / pageSize));

  res.json({
    products: productsWithDiscounts,
    page: pageNumber,
    pages,
    total,
  });
};

// get /api/products/:id
export const getProduct = async (req: Request, res: Response) => {
  const product = await prisma.product.findUnique({
    where: { id: req.params.id as string },
  });

  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  res.json({ product: addDiscount(product) });
};

// post /api/products
export const createProduct = async (req: Request, res: Response) => {
  const product = await prisma.product.create({
    data: buildProductData(req.body),
  });

  res.status(201).json({ product: addDiscount(product) });
};

// put /api/products/:id
export const updateProduct = async (req: Request, res: Response) => {
  const product = await prisma.product.update({
    where: { id: req.params.id as string },
    data: buildProductData(req.body),
  });

  res.json({ product: addDiscount(product) });
};

// delete /api/products/:id
export const deleteProduct = async (req: Request, res: Response) => {
  await prisma.product.update({
    where: { id: req.params.id as string },
    data: { stock: 0 },
  });

  res.json({ message: "Product updated" });
};
