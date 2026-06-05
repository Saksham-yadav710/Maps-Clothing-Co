import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import { categoriesData } from "../../assets/assets";
import api from "../../config/api";
import toast from "react-hot-toast";
import PageLoader from "../../components/PageLoader";

const splitList = (value: string) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const joinList = (value: unknown) =>
  Array.isArray(value) ? value.join(", ") : "";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  originalPrice: "",
  image: "",
  category: "",
  unit: "piece",
  stock: "",
  sizes: "",
  colors: "",
  fits: "",
  patterns: "",
  rises: "",
  stretches: "",
  lengths: "",
  closureTypes: "",
  occasions: "",
  brands: "",
  materials: "",
  washes: "",
  collarTypes: "",
  sleeveLengths: "",
  pocketStyles: "",
  tags: "",
};

type FormState = typeof emptyForm;

export default function AdminProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState<FormState>(emptyForm);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isEdit) {
          const { data: prodData } = await api.get(`/products/${id}`);
          const p = prodData.product;

          setFormData({
            name: p.name ?? "",
            description: p.description ?? "",
            price: p.price?.toString() ?? "",
            originalPrice: p.originalPrice ? p.originalPrice.toString() : "",
            image: p.image ?? "",
            category: p.category ?? "",
            unit: p.unit ?? "piece",
            stock: p.stock?.toString() ?? "",
            sizes: joinList(p.sizes),
            colors: joinList(p.colors),
            fits: joinList(p.fits),
            patterns: joinList(p.patterns),
            rises: joinList(p.rises),
            stretches: joinList(p.stretches),
            lengths: joinList(p.lengths),
            closureTypes: joinList(p.closureTypes),
            occasions: joinList(p.occasions),
            brands: joinList(p.brands),
            materials: joinList(p.materials),
            washes: joinList(p.washes),
            collarTypes: joinList(p.collarTypes),
            sleeveLengths: joinList(p.sleeveLengths),
            pocketStyles: joinList(p.pocketStyles),
            tags: joinList(p.tags),
          });
        }
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isEdit]);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let finalImageUrl = formData.image;

      if (imageFile) {
        const formDataUpload = new FormData();
        formDataUpload.append("image", imageFile);
        const { data } = await api.post("/upload", formDataUpload);
        finalImageUrl = data.url;
      }

      if (!finalImageUrl) {
        toast.error("Please upload a product image");
        setSaving(false);
        return;
      }

      const payload = {
        ...formData,
        image: finalImageUrl,
        price: Number(formData.price),
        originalPrice: formData.originalPrice
          ? Number(formData.originalPrice)
          : 0,
        stock: Number(formData.stock),
        sizes: splitList(formData.sizes),
        colors: splitList(formData.colors),
        fits: splitList(formData.fits),
        patterns: splitList(formData.patterns),
        rises: splitList(formData.rises),
        stretches: splitList(formData.stretches),
        lengths: splitList(formData.lengths),
        closureTypes: splitList(formData.closureTypes),
        occasions: splitList(formData.occasions),
        brands: splitList(formData.brands),
        materials: splitList(formData.materials),
        washes: splitList(formData.washes),
        collarTypes: splitList(formData.collarTypes),
        sleeveLengths: splitList(formData.sleeveLengths),
        pocketStyles: splitList(formData.pocketStyles),
        tags: splitList(formData.tags),
      };

      if (isEdit) {
        await api.put(`/products/${id}`, payload);
        toast.success("Product updated successfully");
      } else {
        await api.post("/products", payload);
        toast.success("Product created successfully");
      }

      navigate("/admin/products");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  const setField = (key: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const TextField = ({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
    required = false,
  }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: string;
    required?: boolean;
  }) => (
    <div>
      <label className="block text-sm font-medium text-zinc-700 mb-2">
        {label}
      </label>
      <input
        required={required}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 focus:border-app-green focus:ring-1 focus:ring-app-green outline-none transition-all"
      />
    </div>
  );

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-app-border overflow-hidden">
        <div className="px-6 py-5 border-b border-app-border flex items-center gap-4">
          <Link
            to="/admin/products"
            className="p-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-500 rounded-lg transition-colors"
          >
            <ArrowLeftIcon className="size-5" />
          </Link>
          <h2 className="text-xl font-semibold text-zinc-900">
            {isEdit ? "Edit Product" : "New Product"}
          </h2>
        </div>

        {loading ? (
          <PageLoader />
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-app-green">
                Core Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextField
                  label="Name"
                  value={formData.name}
                  onChange={(value) => setField("name", value)}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">
                    Category
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setField("category", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 focus:border-app-green focus:ring-1 focus:ring-app-green outline-none transition-all bg-white"
                  >
                    <option value="">Select a category</option>
                    {categoriesData.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <TextField
                  label="Price"
                  type="number"
                  value={formData.price}
                  onChange={(value) => setField("price", value)}
                  required
                />

                <TextField
                  label="Original Price - Optional"
                  type="number"
                  value={formData.originalPrice}
                  onChange={(value) => setField("originalPrice", value)}
                />

                <TextField
                  label="Unit"
                  value={formData.unit}
                  onChange={(value) => setField("unit", value)}
                  placeholder="e.g., piece"
                  required
                />

                <TextField
                  label="Stock"
                  type="number"
                  value={formData.stock}
                  onChange={(value) => setField("stock", value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-app-green">
                Product Image & Description
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-zinc-700 mb-2">
                    Product Image
                  </label>
                  <div className="flex items-center gap-4">
                    {(imageFile || formData.image) && (
                      <div className="size-16 rounded-lg border border-zinc-200 overflow-hidden shrink-0 bg-app-cream">
                        <img
                          src={
                            imageFile
                              ? URL.createObjectURL(imageFile)
                              : formData.image
                          }
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setImageFile(e.target.files?.[0] || null)
                      }
                      className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 focus:border-app-green outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-app-orange file:text-white hover:file:bg-orange-600 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-zinc-700 mb-2">
                    Description
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setField("description", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 focus:border-app-green focus:ring-1 focus:ring-app-green outline-none transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-app-green">
                Shared Clothing Filters
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextField
                  label="Sizes"
                  value={formData.sizes}
                  onChange={(value) => setField("sizes", value)}
                  placeholder="XS, S, M, L"
                />

                <TextField
                  label="Colors"
                  value={formData.colors}
                  onChange={(value) => setField("colors", value)}
                  placeholder="Black, Blue, White"
                />

                <TextField
                  label="Fits"
                  value={formData.fits}
                  onChange={(value) => setField("fits", value)}
                  placeholder="Slim Fit, Regular Fit"
                />

                <TextField
                  label="Patterns"
                  value={formData.patterns}
                  onChange={(value) => setField("patterns", value)}
                  placeholder="Plain, Checks, Stripes"
                />

                <TextField
                  label="Occasions"
                  value={formData.occasions}
                  onChange={(value) => setField("occasions", value)}
                  placeholder="Casual, Formal"
                />

                <TextField
                  label="Brands"
                  value={formData.brands}
                  onChange={(value) => setField("brands", value)}
                  placeholder="Levi's, Jack & Jones"
                />

                <TextField
                  label="Materials"
                  value={formData.materials}
                  onChange={(value) => setField("materials", value)}
                  placeholder="Cotton, Linen, Denim Blend"
                />

                <TextField
                  label="Quick Filters / Tags"
                  value={formData.tags}
                  onChange={(value) => setField("tags", value)}
                  placeholder="New, Formal, Relaxed, Slim"
                />
              </div>
            </div>

            {formData.category === "shirts" && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-app-green">
                  Shirt-Specific Filters
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TextField
                    label="Collar Types"
                    value={formData.collarTypes}
                    onChange={(value) => setField("collarTypes", value)}
                    placeholder="Spread Collar, Mandarin Collar"
                  />

                  <TextField
                    label="Sleeve Lengths"
                    value={formData.sleeveLengths}
                    onChange={(value) => setField("sleeveLengths", value)}
                    placeholder="Full Sleeve, Half Sleeve"
                  />
                </div>
              </div>
            )}

            {formData.category === "jeans" && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-app-green">
                  Jeans-Specific Filters
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TextField
                    label="Rises"
                    value={formData.rises}
                    onChange={(value) => setField("rises", value)}
                    placeholder="Low Rise, Mid Rise"
                  />

                  <TextField
                    label="Stretches"
                    value={formData.stretches}
                    onChange={(value) => setField("stretches", value)}
                    placeholder="Stretchable, Non-Stretchable"
                  />

                  <TextField
                    label="Lengths"
                    value={formData.lengths}
                    onChange={(value) => setField("lengths", value)}
                    placeholder="Cropped, Full Length"
                  />

                  <TextField
                    label="Closure Types"
                    value={formData.closureTypes}
                    onChange={(value) => setField("closureTypes", value)}
                    placeholder="Zip Fly, Button Fly"
                  />

                  <TextField
                    label="Washes"
                    value={formData.washes}
                    onChange={(value) => setField("washes", value)}
                    placeholder="Light Wash, Dark Wash"
                  />
                </div>
              </div>
            )}

            {formData.category === "trousers" && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-app-green">
                  Trouser-Specific Filters
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TextField
                    label="Rises"
                    value={formData.rises}
                    onChange={(value) => setField("rises", value)}
                    placeholder="Low Rise, Mid Rise"
                  />

                  <TextField
                    label="Lengths"
                    value={formData.lengths}
                    onChange={(value) => setField("lengths", value)}
                    placeholder="Ankle Length, Full Length"
                  />

                  <TextField
                    label="Closure Types"
                    value={formData.closureTypes}
                    onChange={(value) => setField("closureTypes", value)}
                    placeholder="Button Closure, Elastic Waist"
                  />

                  <TextField
                    label="Pocket Styles"
                    value={formData.pocketStyles}
                    onChange={(value) => setField("pocketStyles", value)}
                    placeholder="Flat Front, Pleated, Cargo"
                  />
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-app-border flex justify-end">
              <button
                disabled={saving}
                type="submit"
                className="px-6 py-2.5 bg-app-orange text-white font-medium rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Product"}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
