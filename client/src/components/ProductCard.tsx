import { useNavigate } from "react-router-dom";
import type { Product } from "../types";
import { Plus, Star } from "lucide-react";
import { useCart } from "../context/CartContext";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const optimizeCloudinary = (url: string) => {
    if (!url.includes("cloudinary.com")) return url;

    return url.replace(
      "/image/upload/",
      "/image/upload/f_auto,q_auto,w_450,c_limit/",
    );
  };
  return (
    <div
      className="card-premium overflow-hidden group animate-fade-in cursor-pointer"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      {/* image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={optimizeCloudinary(product.image)}
          alt={product.name}
          loading="lazy"
          decoding="async"
          width={225}
          height={225}
          className="w-full h-full object-cover p-4 group-hover:p-2 transition-all duration-300"
        />
        {/* card overlay */}
        <div className="absolute inset-0 card-overlay pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {product.discount > 0 && (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-alert text-white rounded-full">
              {product.discount}% OFF
            </span>
          )}
        </div>
      </div>

      {/* product info */}
      <div className="p-3.5 text-app-text">
        <h3 className="text-sm leading-snug mb-1.5 line-clamp-2 min-h-[40px]">
          {product.name}
        </h3>
        {/* rating */}
        {product.rating > 0 && (
          <div className="flex items-center gap-1 mb-2">
            <Star className="size-3 text-gold fill-gold" />
            <span className="text-xs font-medium text-navy-deep">
              {product.rating}
            </span>
            <span className="text-xs text-app-text-light">
              ({product.reviewCount})
            </span>
          </div>
        )}

        {/* price + add option */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 truncate">
            <span className="text-base font-medium">
              {currency}
              {product.price.toFixed(1)}
            </span>
            <span className="text-xs text-app-text-light">/{product.unit}</span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-app-text-light line-through ml-1.5">
                {currency}
                {product.originalPrice.toFixed(1)}
              </span>
            )}
          </div>
          <button
            aria-label="increase stock amount"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="size-7 rounded-full bg-gold text-navy-deep flex-center shrink-0 hover:bg-gold-dark hover:text-white transition-colors active:scale-95"
          >
            <Plus className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
