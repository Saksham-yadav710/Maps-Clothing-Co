import { appPromoBannerData, heroSectionData } from "../../assets/assets";
import { StarIcon, ShoppingBagIcon, SparklesIcon } from "lucide-react";

const AppPromotionBanner = () => {
  return (
    <section className="my-14 relative overflow-hidden rounded-3xl">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0D1929] via-[#1A2D50] to-[#243A63]" />

      {/* Decorative blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-app-ice/15 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-10 w-80 h-80 bg-app-secondary/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-app-ice/8 rounded-full blur-2xl" />

      <div className="relative flex flex-col md:flex-row items-center justify-between gap-0">
        {/* Left side content */}
        <div className="flex-1 text-center md:text-left px-8 sm:px-12 lg:px-16 py-14 md:py-20">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-white/90 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            <SparklesIcon className="size-3.5 text-app-ice" />
            Premium Men's Fashion
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl text-white leading-tight mb-4">
            {appPromoBannerData.title}
          </h2>

          <p className="text-white/65 mb-8 max-w-md text-base leading-relaxed">
            {appPromoBannerData.description}
          </p>

          {/* Social proof */}
          <div className="flex items-center gap-2 mb-8 justify-center md:justify-start flex-wrap">
            <div className="flex -space-x-2">
              {[
                "https://randomuser.me/api/portraits/men/32.jpg",
                "https://randomuser.me/api/portraits/men/45.jpg",
                "https://randomuser.me/api/portraits/men/76.jpg",
                "https://randomuser.me/api/portraits/men/22.jpg",
              ].map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`Happy customer ${i + 1}`}
                  className="size-8 rounded-full border-2 border-app-green object-cover"
                />
              ))}
            </div>
            <div className="text-white/70 text-sm ml-1">
              <span className="text-white font-semibold">4.8</span> stars from 2,000+ happy shoppers
            </div>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="size-3.5 fill-app-ice text-app-ice" />
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <button className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-app-green font-semibold rounded-xl hover:bg-app-cream-dark transition-all shadow-lg shadow-black/25 text-sm hover:-translate-y-0.5">
              <ShoppingBagIcon className="size-4" />
              Shop Now
            </button>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/25 backdrop-blur-sm text-sm">
              <SparklesIcon className="size-4" />
              Explore Collection
            </button>
          </div>

          {/* Stats row */}
          <div className="flex gap-8 mt-10 justify-center md:justify-start">
            {[
              { value: "50+", label: "Brands" },
              { value: "100+", label: "Products" },
              { value: "98%", label: "Satisfaction" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-white text-xl font-bold">{stat.value}</div>
                <div className="text-white/50 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side image panel */}
        <div className="relative md:w-[420px] lg:w-[480px] shrink-0 self-stretch hidden md:block">
          {/* Gradient overlay on left edge to blend with content */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#1A2D50] to-transparent z-10" />
          <img
            src={heroSectionData.hero_image}
            alt="MAPS Fashion Apparel"
            className="w-full h-full object-cover object-top rounded-r-3xl"
          />
          {/* Top/bottom overlays */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0D1929]/70 to-transparent rounded-br-3xl" />

          {/* Floating badge */}
          <div className="absolute bottom-8 left-8 z-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-xl">
            <p className="text-white text-xs font-medium opacity-80">New Arrivals</p>
            <p className="text-white text-base font-bold">Summer 2026</p>
            <p className="text-app-ice text-xs mt-1 font-semibold">Up to 40% off</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppPromotionBanner;
