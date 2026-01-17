import React, { useState, useEffect, useRef } from "react";
import { User, Lock, Eye, EyeOff, ShieldCheck, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import AnimatedPage from "../components/AnimatedPage";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const starsRef = useRef(null);
  const formRef = useRef(null);

  const [formData, setFromData] = useState({
    email: "",
    phone: "98934893",
    password: "",
  });

  const { isLogining, login, authUser } = useAuthStore();

  // Redirect if already logged in
  useEffect(() => {
    if (authUser) navigate("/home");
  }, [authUser, navigate]);

  // CONTINUOUS STAR ANIMATION (Left to Right)
  useGSAP(() => {
    // Infinite horizontal drift
    gsap.to(starsRef.current, {
      backgroundPosition: "2000px 0",
      duration: 100,
      ease: "none",
      repeat: -1,
    });

    // Form Entrance
    gsap.from(formRef.current, {
      x: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  if (isLogining) return <AnimatedPage />;

  return (
    <div className="relative w-screen h-screen flex bg-[#020617] text-white overflow-hidden">
      {/* GALAXY BACKGROUND (Shared Theme) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div
          ref={starsRef}
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url('https://www.transparenttextures.com/patterns/stardust.png')`,
            backgroundRepeat: "repeat",
          }}
        />
      </div>

      {/* LEFT SIDE: LOGIN FORM */}
      <div className="relative z-10 w-full md:w-[40vw] flex justify-center items-center backdrop-blur-sm border-r border-white/5 bg-black/20">
        <div ref={formRef} className="w-full max-w-md px-8">
          {/* Header */}
          <div className="mb-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-4">
              <ShieldCheck size={14} />
              <span className="text-[10px] font-bold tracking-widest uppercase">
                Secure Portal
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tighter mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-400">
              Enter your credentials to access your RD vault.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email Input */}
            <div className="group relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-400 transition-colors">
                <User size={18} />
              </div>
              <input
                type="email"
                placeholder="Email address"
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-blue-500/50 focus:bg-white/[0.08] transition-all"
                value={formData.email}
                onChange={(e) =>
                  setFromData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            {/* Password Input */}
            <div className="group relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-400 transition-colors">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-blue-500/50 focus:bg-white/[0.08] transition-all"
                value={formData.password}
                onChange={(e) =>
                  setFromData({ ...formData, password: e.target.value })
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

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-4 mt-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2 group"
            >
              Sign In
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>

            {/* Separator */}
            <div className="flex items-center gap-4 my-2">
              <div className="h-[1px] flex-1 bg-white/10" />
              <span className="text-xs text-gray-600 uppercase font-bold">
                or
              </span>
              <div className="h-[1px] flex-1 bg-white/10" />
            </div>

            {/* Signup Link */}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="w-full py-4 border border-white/10 text-gray-300 hover:bg-white/5 font-semibold rounded-2xl transition-all"
            >
              Create New Account
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE: DECORATIVE SPACE */}
      <div className="hidden md:flex flex-1 relative justify-center items-center">
        {/* Futuristic Circle Decor */}
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full animate-pulse" />
          <div className="relative w-80 h-80 rounded-full border border-white/5 flex items-center justify-center">
            <div className="w-64 h-64 rounded-full border border-white/10 flex items-center justify-center animate-[spin_20s_linear_infinite]">
              <div className="w-4 h-4 bg-blue-500 rounded-full absolute top-0" />
            </div>
            <div className="absolute text-center">
              <p className="text-4xl font-black italic text-blue-500/50">RD</p>
              <p className="text-[10px] tracking-[0.3em] text-gray-500 font-bold uppercase">
                Safe Vault
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

// import React, { useState, useEffect, useRef } from "react";
// import { User, Lock, Eye, EyeOff } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useAuthStore } from "../store/auth.store";
// import { gsap } from "gsap";

// function Login() {
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   const cardRef = useRef(null);

//   const [formData, setFormData] = useState({
//     email: "",
//     phone: "98934893",
//     password: "",
//   });

//   const { isLogining, login, authUser } = useAuthStore();

//   useEffect(() => {
//     gsap.fromTo(
//       cardRef.current,
//       { opacity: 0, y: 80, scale: 0.95 },
//       {
//         opacity: 1,
//         y: 0,
//         scale: 1,
//         duration: 1,
//         ease: "power4.out",
//       }
//     );
//   }, []);

//   useEffect(() => {
//     if (authUser) navigate("/home");
//   }, [authUser, navigate]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     login(formData);
//   };

//   if (isLogining) return <div className="text-white">Loading...</div>;

//   return (
//     <div className="relative w-screen h-screen overflow-hidden bg-black text-white">
//       {/* 🌌 Galaxy Background */}
//       <div className="absolute inset-0 z-0">
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(88,101,242,0.25),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(168,85,247,0.25),transparent_45%)]" />
//         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-40" />
//       </div>

//       {/* 🔐 Login Card */}
//       <div className="relative z-10 flex h-full items-center justify-center px-4">
//         <div
//           ref={cardRef}
//           className="w-full max-w-md rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-8 shadow-[0_0_40px_rgba(168,85,247,0.25)]"
//         >
//           <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>
//           <p className="text-center text-gray-300 mb-6">
//             Login to your RD Bank account
//           </p>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Email */}
//             <div className="flex items-center rounded-lg border border-white/10 bg-black/30 px-4 py-3">
//               <User className="w-5 h-5 text-purple-400" />
//               <input
//                 type="email"
//                 placeholder="Email address"
//                 className="ml-3 w-full bg-transparent outline-none text-white placeholder-gray-400"
//                 value={formData.email}
//                 onChange={(e) =>
//                   setFormData({ ...formData, email: e.target.value })
//                 }
//               />
//             </div>

//             {/* Password */}
//             <div className="flex items-center rounded-lg border border-white/10 bg-black/30 px-4 py-3">
//               <Lock className="w-5 h-5 text-purple-400" />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 className="ml-3 w-full bg-transparent outline-none text-white placeholder-gray-400"
//                 value={formData.password}
//                 onChange={(e) =>
//                   setFormData({ ...formData, password: e.target.value })
//                 }
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="ml-2 text-gray-400 hover:text-purple-400"
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//             </div>

//             {/* Login */}
//             <button
//               type="submit"
//               className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 py-3 font-semibold transition hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(99,102,241,0.7)]"
//             >
//               Login
//             </button>

//             {/* Signup */}
//             <button
//               type="button"
//               onClick={() => navigate("/signup")}
//               className="w-full rounded-xl border border-white/20 py-3 text-gray-300 transition hover:bg-white/10"
//             >
//               Create New Account
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
