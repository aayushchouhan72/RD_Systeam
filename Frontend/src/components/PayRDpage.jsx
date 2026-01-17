import React, { useState, useRef, useEffect } from "react";
import { IndianRupee, Calendar, CreditCard } from "lucide-react";
import { gsap } from "gsap";

function PayRDpage() {
  const starsRef = useRef(null);

  // 🔹 TEMP UI STATE (backend baad me connect karna)
  const [payAmount, setPayAmount] = useState("");
  const [payDate, setPayDate] = useState("");

  // 🔹 Dummy values (sirf UI ke liye)
  const rdInfo = {
    rdAccountNo: "RD-2024-00123",
    totalAmount: 24000,
    totalPaid: 12000,
    dueAmount: 1000,
    nextDueDate: "2026-02-10",
  };

  // 🌌 Safe GSAP background animation
  useEffect(() => {
    if (!starsRef.current) return;

    gsap.to(starsRef.current, {
      backgroundPosition: "2000px 0",
      duration: 150,
      repeat: -1,
      ease: "none",
    });
  }, []);

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

      <div className="relative z-10 max-w-3xl mx-auto space-y-10">
        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Pay RD Installment</h1>
          <p className="text-gray-400">
            Review your RD details and make a payment
          </p>
        </div>

        {/* RD INFO CARD */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-400">RD Account No</span>
            <span className="font-semibold">{rdInfo.rdAccountNo}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Total RD Amount</span>
            <span>₹ {rdInfo.totalAmount}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Amount Paid</span>
            <span className="text-green-400">₹ {rdInfo.totalPaid}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Due This Month</span>
            <span className="text-yellow-400">₹ {rdInfo.dueAmount}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Next Due Date</span>
            <span>{rdInfo.nextDueDate}</span>
          </div>
        </div>

        {/* PAY FORM */}
        <form className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
          {/* AMOUNT */}
          <div>
            <label className="text-sm text-gray-400 ml-1">Amount to Pay</label>
            <div className="relative mt-2">
              <IndianRupee
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400"
              />
              <input
                type="number"
                placeholder="Enter amount"
                value={payAmount}
                onChange={(e) => setPayAmount(e.target.value)}
                className="w-full bg-white/10 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-blue-500/50"
              />
            </div>
          </div>

          {/* PAYMENT DATE */}
          <div>
            <label className="text-sm text-gray-400 ml-1">Payment Date</label>
            <div className="relative mt-2">
              <Calendar
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400"
              />
              <input
                type="date"
                value={payDate}
                onChange={(e) => setPayDate(e.target.value)}
                className="w-full bg-white/10 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-blue-500/50 text-gray-300"
              />
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="button"
            className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-bold text-lg shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center justify-center gap-3"
          >
            <CreditCard size={20} />
            Proceed to Pay
          </button>
        </form>
      </div>
    </div>
  );
}

export default PayRDpage;
