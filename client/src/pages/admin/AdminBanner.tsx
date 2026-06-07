import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import api from "../../config/api";
import { Loader2Icon, SaveIcon } from "lucide-react";

const AdminBanner = () => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const { data } = await api.get("/admin/banner");
        if (data.banner) {
          setText1(data.banner.text1);
          setText2(data.banner.text2);
          setIsVisible(data.banner.isVisible);
        }
      } catch (error) {
        toast.error("Failed to load banner settings");
      } finally {
        setLoading(false);
      }
    };
    fetchBanner();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put("/admin/banner", { text1, text2, isVisible });
      toast.success("Banner updated successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update banner");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-center py-12">
        <Loader2Icon className="animate-spin text-app-green" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-app-green mb-6">Banner Settings</h1>

      <div className="bg-white rounded-2xl shadow-sm border p-6 max-w-2xl">
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Primary Text (Left Side)</label>
            <input
              type="text"
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              placeholder="e.g. Free shipping on orders over ₹1250"
              className="w-full px-4 py-2 border rounded-xl focus:border-app-green outline-none"
              required
            />
            <p className="text-xs text-gray-500 mt-1">This text appears on the left side of the banner with a truck icon.</p>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Secondary Text (Right Side)</label>
            <input
              type="text"
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              placeholder="e.g. Wear Confidence, Spend Smart with MAPS."
              className="w-full px-4 py-2 border rounded-xl focus:border-app-green outline-none"
              required
            />
            <p className="text-xs text-gray-500 mt-1">This text appears on the right side of the banner with a sparkles icon.</p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isVisible"
              checked={isVisible}
              onChange={(e) => setIsVisible(e.target.checked)}
              className="size-5 accent-app-green cursor-pointer"
            />
            <label htmlFor="isVisible" className="font-semibold cursor-pointer select-none">
              Show Banner on Website
            </label>
          </div>

          <div className="pt-4 border-t">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 bg-app-green text-white font-semibold rounded-xl hover:bg-app-green-light disabled:opacity-50 transition-colors"
            >
              {saving ? <Loader2Icon className="animate-spin size-5" /> : <SaveIcon className="size-5" />}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminBanner;
