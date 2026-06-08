import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import AppLayout from "./pages/AppLayout";
const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const SearchResults = lazy(() => import("./pages/SearchResults"));
const FlashDeals = lazy(() => import("./pages/FlashDeals"));
const Checkout = lazy(() => import("./pages/Checkout"));
const MyOrders = lazy(() => import("./pages/MyOrders"));
const OrderTracking = lazy(() => import("./pages/OrderTracking"));
const Addresses = lazy(() => import("./pages/Addresses"));
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./pages/admin/AdminLayout";
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));

const AdminProducts = lazy(() => import("./pages/admin/AdminProducts"));

const AdminProductForm = lazy(() => import("./pages/admin/AdminProductForm"));

const AdminOrders = lazy(() => import("./pages/admin/AdminOrders"));

const AdminDeliveryPartners = lazy(
  () => import("./pages/admin/AdminDeliveryPartners"),
);

const AdminBanner = lazy(() => import("./pages/admin/AdminBanner"));

const DeliveryLogin = lazy(() => import("./pages/delivery/DeliveryLogin"));

const DeliveryLayout = lazy(() => import("./pages/delivery/DeliveryLayout"));

const DeliveryDashboard = lazy(
  () => import("./pages/delivery/DeliveryDashboard"),
);

const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#0D1E3E",
            color: "#fff",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: "500",
            border: "1px solid rgba(200,169,81,0.25)",
          },
          success: {
            iconTheme: {
              primary: "#C8A951",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#C8A951",
              secondary: "#fff",
            },
          },
        }}
      />

      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="h-14 w-14 rounded-full border-4 border-app-green/20" />
                <div className="absolute inset-0 h-14 w-14 rounded-full border-4 border-transparent border-t-app-green animate-spin" />
              </div>

              <p className="text-sm font-medium text-app-green">
                Fresh groceries coming up...
              </p>
            </div>
          </div>
        }
      >
        <Routes>
          {/* Auth pages- no navbar/ footer*/}
          <Route path="/login" element={<Login />} />

          {/* Main pages- with navbar/ footer*/}
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductPage />} />
            <Route path="search" element={<SearchResults />} />
            <Route path="deals" element={<FlashDeals />} />
            <Route element={<ProtectedRoute />}>
              <Route path="checkout" element={<Checkout />} />
              <Route path="orders" element={<MyOrders />} />
              <Route path="orders/:id" element={<OrderTracking />} />
              <Route path="addresses" element={<Addresses />} />
            </Route>
          </Route>

          {/*Admin pages*/}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/new" element={<AdminProductForm />} />
            <Route path="products/:id/edit" element={<AdminProductForm />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route
              path="delivery-partners"
              element={<AdminDeliveryPartners />}
            />
            <Route path="banner" element={<AdminBanner />} />
          </Route>

          {/*delivery partner pages*/}
          <Route path="/delivery/login" element={<DeliveryLogin />} />
          <Route path="/delivery" element={<DeliveryLayout />}>
            <Route index element={<DeliveryDashboard />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
