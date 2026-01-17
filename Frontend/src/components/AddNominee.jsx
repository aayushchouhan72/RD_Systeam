import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import {
  User,
  Home,
  FileText,
  IdCard,
  Phone,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import AnimatedPage from "./AnimatedPage.jsx";
import { useUserStore } from "../store/register.store.js";
import RdStart from "./RdStart.jsx";

function AddNominee() {
  const starsRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    panno: "",
    adharno: "",
    contact: "",
  });

  // 🌌 Background animation
  useEffect(() => {
    if (!starsRef.current) return;

    gsap.to(starsRef.current, {
      backgroundPosition: "2000px 0",
      duration: 150,
      repeat: -1,
      ease: "none",
    });
  }, []);

  const { Addnominee, isAddingnominee, userAccountNumber } = useUserStore();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Addnominee(formData, userAccountNumber);
  };
  if (isAddingnominee) {
    return <AnimatedPage />;
  }

  return (
    <div className="relative min-h-screen bg-[#020617] text-white py-20 px-4 overflow-hidden">
      {/* 🌌 BACKGROUND */}
      <div className="fixed inset-0 z-0">
        <div
          ref={starsRef}
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "url('https://www.transparenttextures.com/patterns/stardust.png')",
            backgroundRepeat: "repeat",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-4">
            <ShieldCheck size={16} />
            <span className="text-xs font-bold tracking-widest uppercase">
              Nominee Details
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">Add Nominee</h1>
          <p className="text-gray-400">
            Please provide nominee details for your RD account.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl"
        >
          {/* NAME */}
          <div className="space-y-2">
            <label className="text-sm text-gray-400 ml-1">Nominee Name</label>
            <div className="relative">
              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"
              />
              <input
                type="text"
                name="name"
                required
                placeholder="Full Name"
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-blue-500/50"
              />
            </div>
          </div>

          {/* CONTACT */}
          <div className="space-y-2">
            <label className="text-sm text-gray-400 ml-1">Contact Number</label>
            <div className="relative">
              <Phone
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"
              />
              <input
                type="tel"
                name="contact"
                required
                placeholder="10-digit mobile number"
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-blue-500/50"
              />
            </div>
          </div>

          {/* ADDRESS */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm text-gray-400 ml-1">Address</label>
            <div className="relative">
              <Home size={18} className="absolute left-4 top-4 text-blue-500" />
              <textarea
                name="address"
                required
                placeholder="Full address"
                rows={3}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-blue-500/50 resize-none"
              />
            </div>
          </div>

          {/* PAN */}
          <div className="space-y-2">
            <label className="text-sm text-gray-400 ml-1">PAN Number</label>
            <div className="relative">
              <FileText
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"
              />
              <input
                type="text"
                name="panno"
                required
                placeholder="ABCDE1234F"
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-blue-500/50"
              />
            </div>
          </div>

          {/* AADHAR */}
          <div className="space-y-2">
            <label className="text-sm text-gray-400 ml-1">Aadhar Number</label>
            <div className="relative">
              <IdCard
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"
              />
              <input
                type="text"
                name="adharno"
                required
                placeholder="12-digit Aadhar"
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-blue-500/50"
              />
            </div>
          </div>

          {/* SUBMIT */}
          <div className="md:col-span-2 mt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-bold text-lg shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center justify-center gap-3 group"
            >
              Save Nominee
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNominee;
