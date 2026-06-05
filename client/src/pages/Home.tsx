import { lazy, Suspense } from "react";

import Features from "../components/Home/Features";
import Hero from "../components/Home/Hero";

// import HomeCategories from "../components/Home/HomeCategories";

const PopularProducts = lazy(
  () => import("../components/Home/PopularProducts"),
);

const AppPromotionBanner = lazy(
  () => import("../components/Home/AppPromotionBanner"),
);

const NewsLetter = lazy(() => import("../components/Home/NewsLetter"));

const SectionSkeleton = () => (
  <div className="animate-pulse py-16">
    <div className="h-10 w-48 bg-gray-200 rounded mb-6" />
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-40 bg-gray-200 rounded-2xl" />
      ))}
    </div>
  </div>
);

const Home = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Hero />
      <Features />
      {/* <HomeCategories /> */}
      <Suspense fallback={<SectionSkeleton />}>
        <PopularProducts />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <AppPromotionBanner />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <NewsLetter />
      </Suspense>
    </div>
  );
};

export default Home;
