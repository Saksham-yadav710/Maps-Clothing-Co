import { useState, useEffect } from "react";
import { ArrowRightIcon, SparklesIcon } from "lucide-react";
import { Link } from "react-router-dom";

import img3 from "../../assets/img3.jpg";
import img6 from "../../assets/img6.jpg";
import img10 from "../../assets/img10.jpg";
import img1 from "../../assets/img1.jpg";

const SLIDES = [img3, img6, img10, img1];
const INTERVAL_MS = 3000;
const TRANSIT_MS = 900;

const Hero = () => {
  const [idx, setIdx] = useState(0);
  const [animActive, setAnimActive] = useState(true);

  const extended = [...SLIDES, SLIDES[0]];

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => i + 1), INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (idx === extended.length - 1) {
      const id = setTimeout(() => {
        setAnimActive(false);
        setIdx(0);
      }, TRANSIT_MS);
      return () => clearTimeout(id);
    }
  }, [idx]);

  useEffect(() => {
    if (!animActive) {
      const id = setTimeout(() => setAnimActive(true), 30);
      return () => clearTimeout(id);
    }
  }, [animActive]);

  const real = idx % SLIDES.length;

  return (
    <section className="relative overflow-hidden min-h-[810px] mb-10 rounded-3xl flex items-end">
      {/* Sliding image track */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div
          style={{
            display: "flex",
            width: `${extended.length * 100}%`,
            height: "100%",
            transform: `translateX(-${(idx / extended.length) * 100}%)`,
            transition: animActive
              ? `transform ${TRANSIT_MS}ms cubic-bezier(0.76, 0, 0.24, 1)`
              : "none",
          }}
        >
          {extended.map((src, i) => (
            <div
              key={i}
              style={{
                width: `${100 / extended.length}%`,
                height: "100%",
                flexShrink: 0,
              }}
            >
              <img
                src={src}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                }}
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Gradient — left strong, fades right, also bottom darkening for text */}
      <div className="absolute inset-0 bg-gradient-to-r from-app-green via-app-green/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-app-green/40 via-transparent to-transparent" />

      {/* Hero copy — anchored to bottom */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-10 w-full">
        <div className="max-w-xl xl:pl-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-orange-300 bg-orange-300/10 rounded-full mb-5">
            <SparklesIcon className="size-3" /> Exquisitely Crafted
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-5">
            Elevate your wardrobe with{" "}
            <span className="text-orange-300">timeless elegance</span>
          </h1>

          <p className="text-base text-white/70 leading-relaxed mb-8 max-w-md">
            Discover exclusively curated collections designed for the modern
            individual. Experience unparalleled quality, premium fabrics, and
            sophisticated design in every thread.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/products"
              className="px-7 py-3 bg-orange-400 text-white font-semibold rounded-full hover:bg-orange-500 transition-all flex items-center gap-2 active:scale-[0.98]"
            >
              Shop Collection <ArrowRightIcon className="size-4" />
            </Link>
            <Link
              to="/products"
              className="px-7 py-3 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-all border border-white/20"
            >
              Explore Styles
            </Link>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 right-6 z-10 flex flex-col items-end gap-3">
        <span className="text-white/50 text-[11px] font-mono tracking-[0.2em]">
          {String(real + 1).padStart(2, "0")} /{" "}
          {String(SLIDES.length).padStart(2, "0")}
        </span>

        <div className="flex items-center gap-1.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => {
                setAnimActive(true);
                setIdx(i);
              }}
              className={`rounded-full transition-all duration-500 ${
                i === real
                  ? "w-7 h-[3px] bg-orange-400"
                  : "w-[6px] h-[6px] bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        <div className="w-20 h-px bg-white/15 overflow-hidden rounded-full">
          <div
            key={real}
            className="h-full bg-orange-400 rounded-full"
            style={{
              animation: `heroProgress ${INTERVAL_MS}ms linear forwards`,
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes heroProgress {
          from { width: 0%   }
          to   { width: 100% }
        }
      `}</style>
    </section>
  );
};

export default Hero;
