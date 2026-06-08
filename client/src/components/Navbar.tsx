import {
  ArrowUpRightIcon,
  ChevronDownIcon,
  LogOutIcon,
  MapPinIcon,
  MenuIcon,
  PackageIcon,
  SearchIcon,
  ShieldIcon,
  ShoppingCartIcon,
  UserIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import logoImg from "../assets/logo.png";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount, setIsCartOpen } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleLogOut = () => {
    logout();
    setUserMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="glass sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 gap-4">

        {/* Logo */}
        <Link aria-label="MAPS Home" to="/" className="flex items-center shrink-0">
          <img src={logoImg} alt="MAPS Logo" className="h-20 w-auto object-contain py-1" />
        </Link>

        <div className="w-full flex items-center justify-end gap-4 lg:gap-10">

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-7 text-sm font-medium text-[#0D1E3E]/75">
            <Link to="/" className="hover:text-[#0D1E3E] transition-colors">Home</Link>
            <Link to="/products" className="hover:text-[#0D1E3E] transition-colors">Products</Link>
            <Link to="/deals" className="text-[#C8A951] font-bold tracking-wide hover:text-[#A8872E] transition-colors">
              Deals
            </Link>
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-sm text-xs sm:text-sm">
            <div className="relative w-full">
              <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-[#0D1E3E]/40" />
              <input
                type="text"
                placeholder="Search products here..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 p-2 bg-[#EDE8DF] rounded-full border border-[#DDD8CE] focus:border-[#C8A951] focus:bg-white transition-all text-[#0D1E3E] placeholder:text-[#0D1E3E]/40"
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-3">

            {/* Cart */}
            <button
              aria-label="view cart icon"
              className="relative p-2 rounded-xl hover:bg-[#EDE8DF] transition-colors"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCartIcon className="size-5 text-[#0D1E3E]" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 size-[18px] bg-[#C8A951] text-[#0D1E3E] text-[10px] font-bold rounded-full flex-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User */}
            <div className="relative">
              {user ? (
                <button
                  className="flex items-center gap-2 p-2 rounded-xl hover:bg-[#EDE8DF] transition-colors"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <div className="size-8 rounded-full bg-[#1A3A6B] text-white text-sm font-bold flex-center">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDownIcon className="size-3 text-[#0D1E3E]/50" />
                </button>
              ) : (
                <div className="flex-center gap-2">
                  <Link
                    to="/login"
                    className="hidden md:flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#0D1E3E] bg-[#C8A951] rounded-full hover:bg-[#A8872E] hover:text-white transition-all shadow-md shadow-[#C8A951]/30"
                  >
                    <UserIcon size={15} /> Sign In
                  </Link>
                  {userMenuOpen ? (
                    <XIcon className="md:hidden text-[#0D1E3E]" onClick={() => setUserMenuOpen(!userMenuOpen)} />
                  ) : (
                    <MenuIcon className="md:hidden text-[#0D1E3E]" onClick={() => setUserMenuOpen(!userMenuOpen)} />
                  )}
                </div>
              )}

              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                  <div className="absolute right-0 mt-2.5 w-56 bg-[#FFFCF8] rounded-2xl shadow-xl shadow-[#0D1E3E]/10 border border-[#DDD8CE] py-2 z-50 animate-scale-in">
                    {user && (
                      <div className="px-4 py-3 border-b border-[#DDD8CE] mb-1">
                        <p className="text-sm font-semibold text-[#0D1E3E]">{user?.name}</p>
                        <p className="text-xs text-[#0D1E3E]/50 mt-0.5">{user?.email}</p>
                      </div>
                    )}
                    <div onClick={() => setUserMenuOpen(false)}>
                      {!user && (
                        <Link to="/login" className="dropdown-link">
                          <UserIcon size={16} /> Sign In
                        </Link>
                      )}
                      {user && (
                        <Link to="/orders" className="dropdown-link">
                          <PackageIcon size={16} /> My Orders
                        </Link>
                      )}
                      {user && (
                        <Link to="/addresses" className="dropdown-link">
                          <MapPinIcon size={16} /> Addresses
                        </Link>
                      )}
                      {user && (
                        <Link to="/products" className="dropdown-link">
                          <ArrowUpRightIcon size={16} /> Products
                        </Link>
                      )}
                      {user && (
                        <Link to="/deals" className="dropdown-link">
                          <ArrowUpRightIcon size={16} /> Deals
                        </Link>
                      )}
                      {user?.isAdmin && (
                        <Link to="/admin/products" className="dropdown-link">
                          <ShieldIcon size={16} className="text-[#C8A951]" />
                          <span className="text-[#C8A951] font-semibold">Admin Panel</span>
                        </Link>
                      )}
                      {user && (
                        <div className="border-t border-[#DDD8CE] mt-1 pt-1">
                          <button
                            onClick={handleLogOut}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#C0392B] hover:bg-[#FDF1F0] w-full transition-colors"
                          >
                            <LogOutIcon size={16} /> LogOut
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
