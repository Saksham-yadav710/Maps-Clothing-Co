import { TruckIcon, XIcon, SparklesIcon } from "lucide-react";
import { useState, useEffect } from "react";
import api from "../config/api";

const Banner = () => {
  const [bannerVisible, setBannerVisible] = useState(() => {
    return sessionStorage.getItem("banner_dismissed") !== "true";
  });

  const [bannerData, setBannerData] = useState<{ text1: string; text2: string; isVisible: boolean } | null>(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const { data } = await api.get("/admin/banner");
        if (data.banner) {
          setBannerData(data.banner);
        }
      } catch (error) {
        console.error("Failed to fetch banner data", error);
      }
    };
    fetchBanner();
  }, []);

  const dismissBanner = () => {
    setBannerVisible(false);
    sessionStorage.setItem("banner_dismissed", "true");
  };

  // If backend says banner is disabled, or user dismissed it, don't show
  if (!bannerData?.isVisible || !bannerVisible) {
    return null;
  }

  return (
    <div>
      <div className="bg-gradient-to-r from-[#111E38] via-app-green to-[#111E38] text-white text-xs sm:text-sm relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex-center gap-6">
          <div className="flex-center gap-2">
            <TruckIcon className="size-4 shrink-0" />
            <span className="font-medium">
              {bannerData.text1}
            </span>
          </div>
          <span className="hidden sm:inline text-white/40">|</span>
          <div className="hidden sm:flex items-center gap-2">
            <SparklesIcon className="size-3.5 fill-yellow-400 text-yellow-400 shrink-0" />
            <span>{bannerData.text2}</span>
          </div>
        </div>
        <button
          onClick={dismissBanner}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full"
          title="Dismiss banner"
        >
          <XIcon className="size-3.5" />
        </button>
      </div>
    </div>
  );
};

export default Banner;
