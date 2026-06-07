import { Link } from "react-router-dom";
import { categoriesData } from "../../assets/assets";

const marqueeItems = categoriesData.slice(0, 12);

type Cat = (typeof categoriesData)[0];

const CategoryItem = ({ cat, hidden }: { cat: Cat; hidden?: boolean }) => {
  const content = (
    <>
      <div className="size-18 sm:size-26 sm:p-2 rounded-2xl overflow-hidden bg-app-cream-dark group-hover:ring-2 ring-app-secondary/75 transition-all">
        <img
          src={cat.image}
          alt={hidden ? "" : cat.name}
          loading="eager"
          fetchPriority="low"
          decoding="async"
          width={108}
          height={108}
          className="w-full h-full object-contain rounded-full transition-all"
        />
      </div>
      <span className="text-xs font-medium text-zinc-600 text-center leading-tight">
        {cat.name}
      </span>
    </>
  );

  if (hidden) {
    return (
      <li
        className="shrink-0 flex justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div className="group flex flex-col items-center gap-3 p-4">
          {content}
        </div>
      </li>
    );
  }

  return (
    <li className="shrink-0 flex justify-center">
      <Link
        to={`/products?category=${cat.slug}`}
        onClick={() => window.scrollTo(0, 0)}
        className="group flex flex-col items-center gap-3 p-4"
      >
        {content}
      </Link>
    </li>
  );
};

const HomeCategories = () => (
  <section className="py-16">
    <div className="max-w-7xl mx-auto">
      <div>
        <h2 className="text-2xl font-semibold">Browse Categories</h2>
        <p className="text-sm text-app-text-light mt-1">
          Find exactly what you want to use
        </p>
      </div>

      <div className="mt-8 flex overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <ul className="flex items-center animate-infinite-scroll shrink-0 will-change-transform motion-reduce:animate-none">
          {marqueeItems.map((cat) => (
            <CategoryItem key={cat.slug} cat={cat} />
          ))}
          {marqueeItems.map((cat) => (
            <CategoryItem key={`${cat.slug}--clone`} cat={cat} hidden />
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default HomeCategories;
