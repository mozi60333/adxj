"use client";
import React from 'react';

export function GrowthCurve() {
  return (
    <div className="relative w-full h-32 mt-8 mb-4">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:1rem_1rem] opacity-50 [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]" />
      
      {/* Curve SVG */}
      <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="curve-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="area-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Fill Area */}
        <path
          d="M 0 100 C 30 100, 40 60, 60 40 S 80 20, 100 0 L 100 100 Z"
          fill="url(#area-gradient)"
          className="animate-in fade-in duration-1000"
        />

        {/* Line */}
        <path
          d="M 0 100 C 30 100, 40 60, 60 40 S 80 20, 100 0"
          fill="none"
          stroke="url(#curve-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
          className="[stroke-dasharray:200] [stroke-dashoffset:200] animate-[dash_2s_ease-out_forwards]"
        />

        {/* Dot */}
        <circle cx="100" cy="0" r="4" fill="#22d3ee" className="animate-pulse shadow-lg shadow-cyan-400" />
        <circle cx="100" cy="0" r="12" fill="#22d3ee" opacity="0.2" className="animate-ping" />
      </svg>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}} />
    </div>
  );
}
