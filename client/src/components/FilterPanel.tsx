import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import type { Category } from "../types";

type SelectedFilters = Record<string, string[]>;

interface Props {
  categories: Category[];
  category: string;
  minPrice: string;
  maxPrice: string;
  selectedFilters: SelectedFilters;
  updateFilter: (key: string, value: string) => void;
  toggleMultiFilter: (key: string, value: string) => void;
  hasFilters: boolean;
  clearFilters: () => void;
}

type FilterSection = {
  key: string;
  label: string;
  options: string[];
};

const mergeUnique = (...groups: string[][]) => {
  return Array.from(new Set(groups.flat()));
};

const shirtSections: FilterSection[] = [
  {
    key: "sizes",
    label: "Size",
    options: ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL", "6XL"],
  },
  {
    key: "colors",
    label: "Color",
    options: [
      "Black",
      "White",
      "Blue",
      "Grey",
      "Green",
      "Beige",
      "Navy",
      "Brown",
      "Olive",
      "Maroon",
      "Cream",
      "Off White",
      "Pink",
      "Mauve",
      "Lavender",
      "Yellow",
      "Purple",
      "Khaki",
      "Red",
      "Orange",
      "Peach",
      "Mustard",
      "Multi",
    ],
  },
  {
    key: "patterns",
    label: "Pattern",
    options: [
      "Plain",
      "Checks",
      "Stripes",
      "Textured",
      "Self Design",
      "Abstract",
      "Printed",
      "Embroidered",
      "Floral",
      "Geometric",
      "Jacquard",
      "Embellished",
      "Polka Dots",
      "Graphic Print",
      "Colourblocked",
      "Tie & Dye",
      "Ombre",
      "Animal Print",
    ],
  },
  {
    key: "fits",
    label: "Fit",
    options: [
      "Slim Fit",
      "Regular Fit",
      "Box Fit",
      "Oversized Fit",
      "Relaxed Fit",
      "Regular Kurta Fit",
    ],
  },
  {
    key: "materials",
    label: "Material",
    options: [
      "Cotton",
      "Polyester",
      "Viscose",
      "Rayon",
      "Lyocell",
      "Linen",
      "Nylon",
      "Modal",
    ],
  },
  {
    key: "collarTypes",
    label: "Collar Type",
    options: [
      "Spread Collar",
      "Classic Collar",
      "Cuban Collar",
      "Button Down Collar",
      "Mandarin Collar",
      "Polo Collar",
      "Hooded Collar",
      "Round Neck",
      "Chinese Collar",
      "Cut & Sew",
    ],
  },
  {
    key: "sleeveLengths",
    label: "Sleeve Length",
    options: ["Full Sleeve", "Half Sleeve"],
  },
  {
    key: "occasions",
    label: "Occasion",
    options: [
      "Casual",
      "Formal",
      "Party Wear",
      "Festive Wear",
      "Office Wear",
      "Vacation Wear",
    ],
  },
  {
    key: "brands",
    label: "Brand",
    options: [
      "Levi's",
      "U.S. Polo Assn.",
      "Allen Solly",
      "Louis Philippe",
      "Van Heusen",
      "Peter England",
      "Jack & Jones",
      "Tommy Hilfiger",
      "Wrangler",
      "Mufti",
    ],
  },
  {
    key: "tags",
    label: "Tags / Quick Filters",
    options: [
      "New",
      "Relaxed",
      "Formal",
      "Linen",
      "Slim",
      "Half Sleeve",
      "Luxe",
      "Plus Size",
      "Black",
      "Plain",
      "Prints",
      "Core Lab",
      "Checks",
      "Denim",
      "Stripes",
      "Festive Wear",
      "Boxy",
    ],
  },
];

const jeansSections: FilterSection[] = [
  {
    key: "sizes",
    label: "Size",
    options: ["28", "30", "32", "34", "36", "38", "40", "42", "44", "46"],
  },
  {
    key: "colors",
    label: "Color",
    options: [
      "Blue",
      "Black",
      "Grey",
      "Navy",
      "Olive",
      "Brown",
      "Beige",
      "White",
      "Light Blue",
      "Dark Blue",
    ],
  },
  {
    key: "fits",
    label: "Fit",
    options: [
      "Skinny Fit",
      "Slim Fit",
      "Regular Fit",
      "Straight Fit",
      "Relaxed Fit",
      "Loose Fit",
      "Comfort Fit",
      "Bootcut",
      "Flared Fit",
      "Baggy Fit",
      "Super Baggy Fit",
      "Balloon Fit",
      "Carrot Fit",
      "Straight Loose Fit",
    ],
  },
  {
    key: "washes",
    label: "Wash",
    options: [
      "Light Wash",
      "Medium Wash",
      "Dark Wash",
      "Acid Wash",
      "Stone Wash",
      "Vintage Wash",
    ],
  },
  {
    key: "patterns",
    label: "Pattern",
    options: [
      "Plain",
      "Distressed",
      "Clean Look",
      "Textured",
      "Faded",
      "Washed",
      "Ripped",
      "Printed",
      "Embroidered",
    ],
  },
  {
    key: "rises",
    label: "Rise",
    options: ["Low Rise", "Mid Rise", "High Rise"],
  },
  {
    key: "stretches",
    label: "Stretch",
    options: ["Stretchable", "Non-Stretchable"],
  },
  {
    key: "lengths",
    label: "Length",
    options: ["Cropped", "Ankle Length", "Full Length"],
  },
  {
    key: "closureTypes",
    label: "Closure Type",
    options: ["Zip Fly", "Button Fly", "Drawstring"],
  },
  {
    key: "occasions",
    label: "Occasion",
    options: ["Casual", "Streetwear", "Party Wear", "Smart Casual", "Travel"],
  },
  {
    key: "brands",
    label: "Brand",
    options: [
      "Levi's",
      "Wrangler",
      "Lee",
      "Pepe Jeans",
      "Spykar",
      "Flying Machine",
      "Killer",
      "Mufti",
      "Jack & Jones",
      "U.S. Polo Assn.",
    ],
  },
  {
    key: "materials",
    label: "Material",
    options: ["100% Cotton", "Cotton Blend", "Denim Blend", "Stretch Denim"],
  },
  {
    key: "tags",
    label: "Tags / Quick Filters",
    options: [
      "New",
      "Relaxed",
      "Slim",
      "Denim",
      "Stone Wash",
      "Washed",
      "Stretchable",
      "Streetwear",
      "Classic",
    ],
  },
];

const trouserSections: FilterSection[] = [
  {
    key: "sizes",
    label: "Size",
    options: ["28", "30", "32", "34", "36", "38", "40", "42", "44", "46"],
  },
  {
    key: "colors",
    label: "Color",
    options: [
      "Black",
      "Grey",
      "Beige",
      "Navy",
      "Olive",
      "Brown",
      "Green",
      "Cream",
      "White",
      "Khaki",
      "Blue",
      "Off White",
      "Maroon",
    ],
  },
  {
    key: "fits",
    label: "Fit",
    options: [
      "Slim Fit",
      "Regular Fit",
      "Relaxed Fit",
      "Straight Fit",
      "Loose Fit",
      "Comfort Fit",
      "Baggy Fit",
      "Carrot Fit",
      "Custom Fit",
      "Custom Regular Fit",
    ],
  },
  {
    key: "patterns",
    label: "Pattern",
    options: ["Plain", "Textured", "Self Design", "Stripes", "Checks"],
  },
  {
    key: "materials",
    label: "Material",
    options: [
      "Cotton",
      "Polyester",
      "Linen",
      "Nylon",
      "Viscose",
      "Rayon",
      "Lyocell",
    ],
  },
  {
    key: "rises",
    label: "Rise",
    options: ["Low Rise", "Mid Rise", "High Rise"],
  },
  {
    key: "lengths",
    label: "Length",
    options: ["Cropped", "Ankle Length", "Full Length"],
  },
  {
    key: "closureTypes",
    label: "Closure Type",
    options: ["Button Closure", "Zip Closure", "Drawstring", "Elastic Waist"],
  },
  {
    key: "pocketStyles",
    label: "Pocket Style",
    options: ["Flat Front", "Pleated", "Cargo"],
  },
  {
    key: "occasions",
    label: "Occasion",
    options: [
      "Casual",
      "Formal",
      "Business Casual",
      "Party Wear",
      "Travel",
      "Smart Casual",
    ],
  },
  {
    key: "brands",
    label: "Brand",
    options: [
      "Allen Solly",
      "Louis Philippe",
      "Van Heusen",
      "Peter England",
      "Blackberrys",
      "Raymond",
      "Levi's",
      "U.S. Polo Assn.",
      "Jack & Jones",
      "Tommy Hilfiger",
    ],
  },
  {
    key: "tags",
    label: "Tags / Quick Filters",
    options: [
      "New Arrivals",
      "Formal",
      "Casual",
      "Slim Fit",
      "Regular Fit",
      "Relaxed Fit",
      "Cotton",
      "Linen",
      "Stretchable",
      "Wrinkle Free",
      "Office Wear",
      "Travel Friendly",
    ],
  },
];

const allSections: FilterSection[] = [
  {
    key: "sizes",
    label: "Size",
    options: mergeUnique(
      shirtSections[0].options,
      jeansSections[0].options,
      trouserSections[0].options,
    ),
  },
  {
    key: "colors",
    label: "Color",
    options: mergeUnique(
      shirtSections[1].options,
      jeansSections[1].options,
      trouserSections[1].options,
    ),
  },
  {
    key: "fits",
    label: "Fit",
    options: mergeUnique(
      shirtSections[3].options,
      jeansSections[2].options,
      trouserSections[2].options,
    ),
  },
  {
    key: "patterns",
    label: "Pattern",
    options: mergeUnique(
      shirtSections[2].options,
      jeansSections[4].options,
      trouserSections[3].options,
    ),
  },
  {
    key: "materials",
    label: "Material",
    options: mergeUnique(
      shirtSections[4].options,
      jeansSections[11].options,
      trouserSections[4].options,
    ),
  },
  {
    key: "occasions",
    label: "Occasion",
    options: mergeUnique(
      shirtSections[7].options,
      jeansSections[9].options,
      trouserSections[9].options,
    ),
  },
  {
    key: "brands",
    label: "Brand",
    options: mergeUnique(
      shirtSections[8].options,
      jeansSections[10].options,
      trouserSections[10].options,
    ),
  },
  {
    key: "tags",
    label: "Tags / Quick Filters",
    options: mergeUnique(
      shirtSections[9].options,
      jeansSections[12].options,
      trouserSections[11].options,
    ),
  },
];

const getSectionsForCategory = (category: string) => {
  if (category === "shirts") return shirtSections;
  if (category === "jeans") return jeansSections;
  if (category === "trousers") return trouserSections;
  return allSections;
};

const FilterPanel = ({
  categories,
  category,
  minPrice,
  maxPrice,
  selectedFilters,
  updateFilter,
  toggleMultiFilter,
  hasFilters,
  clearFilters,
}: Props) => {
  const categoriesWithAll = [
    { slug: "", name: "All Categories" },
    ...categories,
  ];
  const sections = getSectionsForCategory(category);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (key: string) =>
    setOpenSection((prev) => (prev === key ? null : key));

  const isSelected = (key: string, value: string) =>
    selectedFilters[key]?.includes(value);

  return (
    <div className="space-y-6">
      {/* categories */}
      <div>
        <h3 className="text-sm font-semibold text-app-green mb-3">
          Categories
        </h3>
        <div className="space-y-2.5">
          {categoriesWithAll.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => updateFilter("category", cat.slug)}
              className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-all ${
                category === cat.slug
                  ? "bg-app-green text-white"
                  : "text-app-text-light hover:bg-app-cream"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* price range */}
      <div>
        <h3 className="text-sm font-semibold text-app-green mb-3">
          Price Range
        </h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => updateFilter("minPrice", e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-app-border focus:border-app-green outline-none"
          />

          <span className="text-app-text-light">-</span>

          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => updateFilter("maxPrice", e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-app-border focus:border-app-green outline-none"
          />
        </div>
      </div>

      {category === "" && (
        <div className="rounded-xl bg-app-cream p-4 text-sm text-app-text-light">
          Choose a category to see the full clothing filter set.
        </div>
      )}

      <div className="space-y-2">
        {sections.map((section) => {
          const isOpen = openSection === section.key;
          const activeCount = selectedFilters[section.key]?.length ?? 0;
          return (
            <div key={section.key} className="border border-app-border rounded-xl overflow-hidden">
              {/* Accordion header */}
              <button
                type="button"
                onClick={() => toggleSection(section.key)}
                className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold text-app-green bg-white hover:bg-app-cream transition-colors"
              >
                <span className="flex items-center gap-2">
                  {section.label}
                  {activeCount > 0 && (
                    <span className="bg-app-green text-white text-xs font-bold px-1.5 py-0.5 rounded-full leading-none">
                      {activeCount}
                    </span>
                  )}
                </span>
                <ChevronDownIcon
                  className={`size-4 text-app-text-light transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Accordion body */}
              {isOpen && (
                <div className="flex flex-wrap gap-2 px-4 pb-4 pt-3 bg-app-cream/40">
                  {section.options.map((option) => {
                    const active = isSelected(section.key, option);
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => toggleMultiFilter(section.key, option)}
                        className={`px-3 py-1.5 text-xs rounded-md transition-all border ${
                          active
                            ? "bg-app-green text-white border-app-green"
                            : "bg-white text-app-text-light border-app-border hover:bg-white hover:border-app-green"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {hasFilters && (
        <button
          type="button"
          onClick={clearFilters}
          className="w-full py-2 text-sm text-app-error hover:bg-red-50 rounded-lg transition-colors font-medium"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
};

export default FilterPanel;
