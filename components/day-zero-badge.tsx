"use client";
import React from 'react';
import { Zap } from 'lucide-react';
import { motion } from 'motion/react';

export function DayZeroBadge() {
  return (
    <div className="relative w-full h-32 mt-8 mb-4 flex items-center justify-center">
      {/* Background Pulse Rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-24 h-24 bg-emerald-500/20 rounded-full animate-ping [animation-duration:2s]" />
        <div className="absolute w-16 h-16 bg-emerald-400/30 rounded-full animate-pulse" />
      </div>

      <motion.div 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 bg-emerald-500 text-white rounded-2xl p-4 shadow-[0_0_40px_rgba(16,185,129,0.5)] border border-emerald-400 flex flex-col items-center justify-center"
      >
        <div className="flex items-center gap-1 mb-1">
          <Zap className="w-8 h-8 fill-yellow-300 text-yellow-300 animate-pulse" />
          <span className="text-4xl font-black italic tracking-tighter">Day<span className="text-yellow-300">0</span></span>
        </div>
        <div className="text-[10px] font-bold tracking-widest uppercase bg-emerald-950 px-3 py-1 rounded-full text-emerald-300">
          极速结算 T+0
        </div>
      </motion.div>
    </div>
  );
}
