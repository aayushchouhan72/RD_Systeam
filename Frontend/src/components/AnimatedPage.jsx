import { useEffect, useState } from "react";

function AnimatedPage({
  title = "RD Banking System",
  subtitle = "Securing your future...",
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[length:400%_400%] bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 animate-gradient" style={{ zIndex: 9999, background: 'linear-gradient(to right, #4f46e5, #9333ea, #db2777)', width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {/* Animated background blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-white/10 rounded-full animate-ping"></div>

      {/* Content */}
      <div
        className={`
          w-full h-full flex flex-col items-center justify-center
          transition-all duration-700 ease-out
          ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
      >
        {/* Logo / Title */}
        <h1 className="text-white text-4xl md:text-5xl font-bold tracking-wide">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-white/80 text-sm md:text-base tracking-wider">
          {subtitle}
        </p>

        {/* Loader */}
        <div className="mt-8 w-14 h-14 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
}

export default AnimatedPage;
