import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { categoriesData } from "../../assets/assets";

const HomeCategories = () => {
  const scrollRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (scrollRef.current && !scrollRef.current.dataset.cloned) {
      const clone = scrollRef.current.cloneNode(true) as HTMLUListElement;
      clone.setAttribute("aria-hidden", "true");
      scrollRef.current.parentNode?.appendChild(clone);
      scrollRef.current.dataset.cloned = "true";
    }
  }, []);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto">
        <div>
          <h2 className="text-2xl font-semibold">Browse Categories</h2>
          <p className="text-sm text-app-text-light mt-1">
            Find exactly what you want to use
          </p>
        </div>
        <div className="mt-8 flex overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <ul
            ref={scrollRef}
            className="flex items-center animate-infinite-scroll shrink-0"
          >
            {categoriesData.map((cat) => (
              <li key={cat.slug} className="shrink-0 flex justify-center">
                <Link
                  to={`/products?category=${cat.slug}`}
                  onClick={() => window.scrollTo(0, 0)}
                  className="group flex flex-col items-center gap-3 p-4"
                >
                  <div className="size-18 sm:size-26 sm:p-2 rounded-2xl overflow-hidden bg-orange-100 group-hover:ring-2 ring-orange-300/75 transition-all">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      loading="lazy"
                      decoding="async"
                      width={108}
                      height={108}
                      className="w-full h-full object-contain rounded-full transition-all"
                    />
                  </div>
                  <span className="text-xs font-medium text-zinc-600 text-center leading-tight">
                    {cat.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HomeCategories;
