import React from 'react';

export function AdxjLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className} group cursor-pointer`}>
      <div className="relative">
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          {/* Subtle Whale Tail Logo Element / Background */}
          <path 
            d="M22 40 C14 40 8 34 4 28 C12 30 18 30 22 24 C26 30 32 30 40 28 C36 34 30 40 22 40 Z" 
            fill="#2563EB" 
            opacity="0.1" 
            className="group-hover:opacity-20 transition-opacity duration-300" 
          />
          
          {/* X - Descending line from top-left to bottom-right */}
          <path 
            d="M 12 12 L 32 32" 
            stroke="#2563EB" 
            strokeWidth="5" 
            strokeLinecap="round" 
            className="group-hover:stroke-blue-700 transition-colors"
          />
          {/* Nodes for connectivity */}
          <circle cx="12" cy="12" r="3" fill="#2563EB" className="group-hover:fill-blue-700 transition-colors" />
          <circle cx="32" cy="32" r="3" fill="#2563EB" className="group-hover:fill-blue-700 transition-colors" />

          {/* X - Ascending line (Exponential Growth Curve) from bottom-left to top-right */}
          <path 
            d="M 12 32 Q 24 32 32 12" 
            stroke="#10B981" 
            strokeWidth="5" 
            strokeLinecap="round" 
            fill="none"
          />
          {/* Connection Node */}
          <circle cx="12" cy="32" r="3" fill="#10B981" />
          
          {/* Arrow Head Pointing Up-Right */}
          <path 
            d="M 23 15 L 32 12 L 29 21" 
            stroke="#10B981" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            fill="none" 
            className="group-hover:translate-x-[1px] group-hover:-translate-y-[1px] transition-transform origin-center"
          />
        </svg>
      </div>
      
      <div className="flex flex-col">
        <div className="flex items-baseline leading-none">
          {/* AD in sturdy upright */}
          <span className="text-[26px] tracking-tighter text-[#0F172A] font-[family-name:var(--font-display)] font-black">
            AD
          </span>
          {/* XJ in forward-leaning italic */}
          <span className="text-[26px] italic tracking-tighter text-[#2563EB] font-[family-name:var(--font-display)] font-black -ml-[2px]">
            XJ
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-1.5">
          <span className="text-[9px] font-bold tracking-[0.2em] text-[#10B981] uppercase">
            Growth Network
          </span>
          <div className="w-1 h-1 rounded-full bg-slate-300"></div>
          <span className="text-[8px] font-bold tracking-widest text-slate-400 uppercase">
            By Blue Whale
          </span>
        </div>
      </div>
    </div>
  );
}
