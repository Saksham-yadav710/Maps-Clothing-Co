import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import Footer from "../components/Home/Footer";
import CartSidebar from "../components/CartSidebar";

const AppLayout = () => {
  const location = useLocation();

  return (
    <>
      <Banner />
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          className="min-h-screen"
          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <Footer />
      <CartSidebar />
    </>
  );
};

export default AppLayout;
