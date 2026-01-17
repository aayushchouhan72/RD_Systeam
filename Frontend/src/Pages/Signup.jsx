import React, { useState, useEffect, useRef } from "react";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  Phone,
  UserCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import AnimatedPage from "../components/AnimatedPage";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const starsRef = useRef(null);
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const { isSignUping, signup, authUser } = useAuthStore();

  // Redirect if already logged in
  useEffect(() => {
    if (authUser) navigate("/home");
  }, [authUser, navigate]);

  // CONTINUOUS STAR ANIMATION (Left to Right)
  useGSAP(() => {
    gsap.to(starsRef.current, {
      backgroundPosition: "2000px 0",
      duration: 120, // Slightly slower than login for a calmer feel
      ease: "none",
      repeat: -1,
    });

    gsap.from(formRef.current, {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
    });
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  if (isSignUping) return <AnimatedPage />;

  return (
    <div className="relative w-screen h-screen flex bg-[#020617] text-white overflow-hidden">
      {/* 🌌 GALAXY BACKGROUND (Consistent Theme) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(147,51,234,0.1),transparent_50%)]" />
        <div
          ref={starsRef}
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url('https://www.transparenttextures.com/patterns/stardust.png')`,
            backgroundRepeat: "repeat",
          }}
        />
      </div>

      {/* LEFT SIDE: BRANDING/DECOR (Reversed from Login for variety) */}
      <div className="hidden md:flex flex-1 relative justify-center items-center">
        <div className="relative">
          <div className="absolute inset-0 bg-purple-500/20 blur-[100px] rounded-full animate-pulse" />
          <div className="relative w-80 h-80 rounded-full border border-white/5 flex items-center justify-center">
            <div className="w-64 h-64 rounded-full border border-white/10 flex items-center justify-center animate-[spin_30s_linear_infinite_reverse]">
              <div className="w-4 h-4 bg-purple-500 rounded-full absolute bottom-0" />
            </div>
            <div className="absolute text-center">
              <p className="text-4xl font-black italic text-purple-500/50">
                RD
              </p>
              <p className="text-[10px] tracking-[0.3em] text-gray-500 font-bold uppercase">
                Growth Vault
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: SIGNUP FORM */}
      <div className="relative z-10 w-full md:w-[45vw] flex justify-center items-center backdrop-blur-md border-l border-white/5 bg-black/20">
        <div ref={formRef} className="w-full max-w-md px-8">
          {/* Header */}
          <div className="mb-8 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 mb-4">
              <ShieldCheck size={14} />
              <span className="text-[10px] font-bold tracking-widest uppercase">
                Member Registration
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tighter mb-2">
              Create Account
            </h1>
            <p className="text-gray-400">
              Join thousands of smart savers today.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Full Name */}
            <div className="group relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-purple-400 transition-colors">
                <UserCircle size={18} />
              </div>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-purple-500/50 focus:bg-white/8 transition-all"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            {/* Phone */}
            <div className="group relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-purple-400 transition-colors">
                <Phone size={18} />
              </div>
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-purple-500/50 focus:bg-white/8 transition-all"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
            </div>

            {/* Email */}
            <div className="group relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-purple-400 transition-colors">
                <User size={18} />
              </div>
              <input
                type="email"
                placeholder="Email address"
                className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-purple-500/50 focus:bg-white/8 transition-all"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            {/* Password */}
            <div className="group relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-purple-400 transition-colors">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create Password"
                className="w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-purple-500/50 focus:bg-white/8 transition-all"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={isSignUping}
              className="w-full py-4 mt-2 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-2xl shadow-lg shadow-purple-900/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {isSignUping ? "Processing..." : "Create Account"}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-500 mt-2">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-purple-400 hover:text-purple-300 font-bold underline underline-offset-4"
              >
                Login here
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
