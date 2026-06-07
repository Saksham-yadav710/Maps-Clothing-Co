import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  PackageIcon,
  UsersIcon,
  ShoppingBagIcon,
  AlertTriangleIcon,
  IndianRupeeIcon,
  TrendingUpIcon,
  Loader2Icon,
} from "lucide-react";
import { statusColors } from "../../assets/assets";
import api from "../../config/api";
import PageLoader from "../../components/PageLoader";

interface Stats {
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  outOfStock: number;
  recentOrders: any[];
}

const PERIODS = [
  { label: "1D", value: "1d" },
  { label: "3D", value: "3d" },
  { label: "1W", value: "1w" },
  { label: "1M", value: "1m" },
  { label: "3M", value: "3m" },
  { label: "6M", value: "6m" },
  { label: "9M", value: "9m" },
  { label: "1Y", value: "1y" },
  { label: "All Time", value: "all" },
];

export default function AdminDashboard() {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "₹";

  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  const [revPeriod, setRevPeriod] = useState("1m");
  const [revenue, setRevenue] = useState<{
    totalRevenue: number;
    orderCount: number;
    totalPlacedCount: number;
    cancelledCount: number;
  } | null>(null);
  const [revLoading, setRevLoading] = useState(false);

  useEffect(() => {
    api
      .get("/admin/stats")
      .then((res) => setStats(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const fetchRevenue = useCallback(async (period: string) => {
    setRevLoading(true);
    try {
      const params = period === "all" ? "" : `?period=${period}`;
      const { data } = await api.get(`/admin/revenue${params}`);
      setRevenue(data);
    } catch {
      /* ignore */
    } finally {
      setRevLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRevenue(revPeriod);
  }, [revPeriod, fetchRevenue]);

  const cards = stats
    ? [
        {
          label: "Total Orders",
          value: stats.totalOrders,
          icon: ShoppingBagIcon,
        },
        { label: "Total Users", value: stats.totalUsers, icon: UsersIcon },
        {
          label: "Total Products",
          value: stats.totalProducts,
          icon: PackageIcon,
        },
        {
          label: "Out of Stock",
          value: stats.outOfStock,
          icon: AlertTriangleIcon,
        },
      ]
    : [];

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-2xl p-5 border border-app-border flex justify-between gap-3"
          >
            <div>
              <p className="text-2xl font-semibold text-zinc-900">
                {card.value}
              </p>
              <p className="text-sm text-app-text-light">{card.label}</p>
            </div>
            <div
              className={`size-10 rounded-xl flex-center bg-orange-50 text-orange-600`}
            >
              <card.icon className="size-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Analytics Card */}
      <div className="bg-gradient-to-br from-app-green via-emerald-800 to-green-950 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-xl bg-white/10 flex-center">
              <TrendingUpIcon className="size-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-white/60 uppercase tracking-wider">Revenue from Delivered Orders</p>
              <p className="text-sm font-semibold text-white/80">
                {PERIODS.find((p) => p.value === revPeriod)?.label}
              </p>
            </div>
          </div>

          {/* Period selector */}
          <div className="flex flex-wrap gap-1.5">
            {PERIODS.map((p) => (
              <button
                key={p.value}
                onClick={() => setRevPeriod(p.value)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  revPeriod === p.value
                    ? "bg-white text-app-green shadow"
                    : "bg-white/10 text-white/80 hover:bg-white/20"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Revenue figure */}
        <div className="flex items-end gap-6 mt-2">
          {revLoading ? (
            <div className="flex items-center gap-2 text-white/60 py-4">
              <Loader2Icon className="animate-spin size-6" />
              <span className="text-sm">Calculating…</span>
            </div>
          ) : (
            <>
              <div>
                <div className="flex items-center gap-1">
                  <IndianRupeeIcon className="size-7 text-white/80 mb-1" />
                  <span className="text-5xl font-bold tracking-tight">
                    {revenue
                      ? revenue.totalRevenue >= 1_00_000
                        ? `${(revenue.totalRevenue / 1_00_000).toFixed(2)}L`
                        : revenue.totalRevenue >= 1_000
                        ? `${(revenue.totalRevenue / 1_000).toFixed(1)}K`
                        : revenue.totalRevenue.toFixed(2)
                      : "0"}
                  </span>
                </div>
                <p className="text-xs text-white/50 mt-1">Total Revenue</p>
              </div>
              <div className="pb-1 border-l border-white/20 pl-6">
                <p className="text-3xl font-bold">{revenue?.orderCount ?? 0}</p>
                <p className="text-xs text-white/50 mt-1">Orders Delivered</p>
              </div>
              <div className="pb-1 border-l border-white/20 pl-6">
                <p className="text-3xl font-bold">{revenue?.totalPlacedCount ?? 0}</p>
                <p className="text-xs text-white/50 mt-1">Orders Placed</p>
              </div>
              <div className="pb-1 border-l border-white/20 pl-6">
                <p className="text-3xl font-bold text-red-300">{revenue?.cancelledCount ?? 0}</p>
                <p className="text-xs text-white/50 mt-1">Orders Cancelled</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl border border-app-border overflow-hidden">
        <div className="px-6 py-5 border-b border-app-border flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900">Recent Orders</h2>
          <Link
            to="/admin/orders"
            className="text-sm font-medium text-app-orange hover:text-app-orange-dark transition-colors"
          >
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-app-cream/50 text-zinc-500 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Items</th>
                <th className="px-6 py-3">Total</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-app-border">
              {stats?.recentOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-zinc-500"
                  >
                    No orders yet.
                  </td>
                </tr>
              ) : (
                stats?.recentOrders.map((order: any) => (
                  <tr
                    key={order.id}
                    className="hover:bg-zinc-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono text-xs text-zinc-500">
                      #{order.id.slice(-6).toUpperCase()}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-zinc-900">
                        {order.user?.name || "—"}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {order.user?.email || ""}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-zinc-600">
                      {order.items?.length || 0} items
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {currency}
                      {order.total?.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[order.status] || "bg-zinc-100 text-zinc-600"}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-zinc-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
