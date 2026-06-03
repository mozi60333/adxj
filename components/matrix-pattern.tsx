import React from 'react';

export function MatrixBackground({ className = '' }: { className?: string }) {
  // Generates a semi-transparent data node matrix of points connected by lines
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03] ${className}`}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="node-matrix" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            {/* Hexagonal / Grid connections */}
            <path d="M 0 50 L 50 0 L 100 50 L 50 100 Z" stroke="#2563EB" strokeWidth="0.5" fill="none" />
            <path d="M 50 0 L 50 100" stroke="#2563EB" strokeWidth="0.5" fill="none" />
            <path d="M 0 50 L 100 50" stroke="#2563EB" strokeWidth="0.5" fill="none" />
            
            {/* Dots */}
            <circle cx="50" cy="50" r="2" fill="#2563EB" />
            <circle cx="0" cy="50" r="1.5" fill="#2563EB" />
            <circle cx="100" cy="50" r="1.5" fill="#2563EB" />
            <circle cx="50" cy="0" r="1.5" fill="#2563EB" />
            <circle cx="50" cy="100" r="1.5" fill="#2563EB" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#node-matrix)" />
      </svg>
    </div>
  );
}
