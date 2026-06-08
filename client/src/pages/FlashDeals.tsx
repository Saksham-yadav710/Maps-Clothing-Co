import { useEffect, useState } from "react";
import { type Product } from "../types";
import { Zap } from "lucide-react";
import ProductCard from "../components/ProductCard";
import api from "../config/api";
import toast from "react-hot-toast";
import PageLoader from "../components/PageLoader";

const FlashDeals = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/products/flash-deals")
      .then((res) => setProducts(res.data.products))
      .catch((error: any) =>
        toast.error(error.response.data.message || error?.message),
      )
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="min-h-screen bg-app-cream">
      {/* banner */}
      <div className="bg-gradient-to-r from-[#0D1929] via-[#1A2D50] to-[#0D1929] text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 30% 50%, #7BA4C8 0%, transparent 50%), radial-gradient(circle at 70% 50%, #B5CDE0 0%, transparent 50%)'}} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex-center gap-2 mb-3">
            <Zap className="size-6 fill-app-ice text-app-ice" />
            <h1 className="text-3xl font-bold tracking-tight">Flash Deals</h1>
            <Zap className="size-6 fill-app-ice text-app-ice" />
          </div>

          <p className="text-white/80 max-w-md mx-auto">
            Limited time offers on your favourite products. Grab them before
            they're gone !!
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <PageLoader />
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <Zap className="size-16 text-app-border mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-app-green mb-2">
              No Deals Right Now!!
            </h2>
            <p className="text-sm text-app-text-light">
              Check back soon for amazing offers!!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map(
              (product) =>
                product.stock > 0 && (
                  <ProductCard key={product.id} product={product} />
                ),
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashDeals;
