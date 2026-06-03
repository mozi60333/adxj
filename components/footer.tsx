"use client";
import React from 'react';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-10 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex gap-4 sm:gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] flex-wrap justify-center md:justify-start">
           <span>Global HQ / Singapore</span>
           <span>Est. 2016</span>
           <span>ADXJ Agency Group</span>
           <span className="lowercase">business@adxj.com</span>
        </div>
        <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 border border-slate-100 rounded-full">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </div>
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Systems Online</span>
        </div>
      </div>
    </footer>
  );
}
