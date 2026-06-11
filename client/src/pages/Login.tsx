import { useState } from "react";
import { heroSectionData } from "../assets/assets";
import { Link } from "react-router-dom";
import {
  Loader2Icon,
  LockIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const [isLoginState, setIsLoginState] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const { login, register } = useAuth();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLoginState) {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex">
      {/*Left Side*/}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0D1929] via-[#1A2D50] to-[#243A63] relative items-center justify-center overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-app-ice/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-app-secondary/15 rounded-full blur-3xl" />
        <img
          src={heroSectionData.hero_image}
          alt=""
          className="absolute inset-0 object-cover object-top h-full w-full opacity-10"
        />
        <div className="relative text-center px-12 z-10">
          <div className="mb-8 flex-center">
            <img src="/logo.png" alt="MAPS Logo" className="h-24 w-auto brightness-0 invert opacity-90" />
          </div>
          <h2 className="text-4xl font-semibold text-white mb-4 leading-tight">
            Welcome to MAPS
          </h2>
          <p className="text-white/55 font-serif text-lg max-w-sm mx-auto leading-relaxed">
            Wear Confidence, Spend Smart. Bringing high-quality men's fashion to every wardrobe.
          </p>
          <div className="mt-10 flex justify-center gap-8">
            {[{ v: '50+', l: 'Brands' }, { v: '100+', l: 'Products' }, { v: '98%', l: 'Satisfaction' }].map(s => (
              <div key={s.l} className="text-center">
                <div className="text-2xl font-bold text-white">{s.v}</div>
                <div className="text-xs text-white/40 mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/*Right Side*/}
      <div className="flex-1 flex-center px-4 py-12 bg-app-cream">
        <div className="w-full max-w-md">
          {/* form header message */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <img src="/logo.png" alt="MAPS Logo" className="h-12 w-auto" />
            </Link>
            <h1 className="text-2xl font-semibold text-navy-deep mb-2">
              {isLoginState
                ? "Sign In to your account"
                : "Sign Up for an account"}
            </h1>
            <p className="text-sm text-app-text-light">
              {isLoginState
                ? "Don't have an account? "
                : "Already have an account?"}{" "}
              <button
                onClick={() => setIsLoginState(!isLoginState)}
                className="text-gold ml-1 font-semibold hover:text-gold-dark transition-colors"
              >
                {isLoginState ? "Create One" : "Sign In"}
              </button>
            </p>
          </div>
          {/* login/register form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLoginState && (
              <label className="text-sm flex flex-col gap-1">
                Name
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-app-text-light" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Enter your name"
                    className="w-full pl-11 pr-4 py-3 text-sm bg-white rounded-xl border not-focus:border-app-border transition-all"
                  ></input>
                </div>
              </label>
            )}

            <label className="text-sm flex flex-col gap-1">
              Email Address
              <div className="relative">
                <MailIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-app-text-light" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your-email@example.com"
                  className="w-full pl-11 pr-4 py-3 text-sm bg-white rounded-xl border not-focus:border-app-border transition-all"
                ></input>
              </div>
            </label>

            <label className="text-sm flex flex-col gap-1">
              Password
              <div className="relative">
                <LockIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-app-text-light" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder=".........."
                  className="w-full pl-11 pr-4 py-3 text-sm bg-white rounded-xl border not-focus:border-app-border transition-all"
                ></input>
              </div>
            </label>
            <button
              type="submit"
              disabled={loading}
              className="flex-center w-full btn-gold disabled:opacity-50"
            >
              {loading ? (
                <Loader2Icon className="animate-spin" />
              ) : isLoginState ? (
                "Sign In"
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
