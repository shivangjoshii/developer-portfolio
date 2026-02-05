"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";

export default function AdminLogin() {
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!key.trim()) {
      toast.error("Please enter your admin key");
      return;
    }

    setLoading(true);

    try {
      // Verify the admin key by making a test API call
      const response = await axios.get(
        `http://localhost:5000/api/admin/projects`,
        {
          headers: {
            "x-admin-key": key,
          },
        }
      );

      if (response.status === 200) {
        localStorage.setItem("adminKey", key);
        localStorage.setItem("loginTime", new Date().getTime().toString());
        toast.success("Login successful! Welcome back");
        router.push("/admin/dashboard");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("❌ Invalid admin key. Access denied!");
      } else {
        toast.error("Failed to verify key. Please check your internet connection");
      }
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d1224] via-[#0f1535] to-[#0a0d37] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gradient-to-br from-[#0d1224] border-[#1b2c68a0] relative rounded-2xl border to-[#0a0d37] p-8 shadow-2xl">
          {/* Top decorative line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>

          {/* Lock Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-pink-500/20 to-violet-600/20 rounded-full border border-pink-500/30">
              <MdLock size={32} className="text-[#16f2b3]" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-[#16f2b3] text-center mb-2">
            Admin Panel
          </h1>
          <p className="text-center text-[#d3d8e8] mb-8 text-sm">
            Enter your admin key to access the dashboard
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-base font-semibold text-[#16f2b3] mb-2 block">
                Admin Key
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  className="w-full bg-[#10172d] border-2 border-[#353a52] rounded-lg focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-4 py-3 text-white placeholder-[#7a8599] hover:border-[#16f2b3]/50"
                  placeholder="••••••••••••••••••"
                  required
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7a8599] hover:text-[#16f2b3] transition-colors"
                >
                  {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                </button>
              </div>
              <p className="text-xs text-[#7a8599] mt-2">
                💡 Check .env.local for your ADMIN_KEY
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 disabled:from-pink-500/50 disabled:to-violet-600/50 text-white font-bold py-3 rounded-lg transition-all duration-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <MdLock size={20} />
              {loading ? "Verifying..." : "Access Dashboard"}
            </button>
          </form>

          {/* Security info */}
          <div className="mt-6 p-3 bg-[#1b2c68a0] rounded-lg border border-[#353a52]">
            <p className="text-xs text-[#d3d8e8]">
              <span className="text-[#16f2b3] font-semibold">🔐 Security:</span> Your admin key is stored locally and never sent to third parties. All API requests are verified on the server.
            </p>
          </div>

          {/* Bottom decorative line */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-violet-600 to-pink-500"></div>
        </div>

        {/* Footer info */}
        <div className="mt-6 text-center text-xs text-[#7a8599]">
          <p>Protected Admin Panel v1.0</p>
          <p className="mt-1">All actions are logged and secured</p>
        </div>
      </div>
    </div>
  );
}
