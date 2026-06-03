"use client";
import React, { useEffect, useState } from 'react';

const codeSnippets = [
  "function obfuscate(src) { return transform(src, { layers: 3 }); }",
  "import { ASO } from '@adxj/store-optimization';",
  "const account = await AccountHub.match({ region: 'US', age: '2y' });",
  "let ipIsolated = fingerprint.isolate();",
  "if (policy.changeDetected()) { recompile(); }",
  "await googlePlay.submit(bundle, { antiBan: true });",
  "class SecureIM extends WebSocket { constructor() { super(); } }",
  "<SecureVault encrypted={true} />"
];

const generateLines = () => {
  return Array.from({ length: 20 }).map(() => {
    const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    const tabs = " ".repeat(Math.floor(Math.random() * 8));
    return tabs + snippet;
  });
};

export function CodeFlowBackground() {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLines(generateLines());
    }, 0);

    const interval = setInterval(() => {
      setLines(prev => {
        const newLines = [...prev];
        if (newLines.length > 0) {
          newLines.shift();
        }
        const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        const tabs = " ".repeat(Math.floor(Math.random() * 8));
        newLines.push(tabs + snippet);
        return newLines;
      });
    }, 800);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 font-mono text-[10px] text-blue-500/50 leading-relaxed whitespace-pre pl-4">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] via-transparent to-[#0F172A] z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-transparent to-[#0F172A] z-10" />
      <div className="animate-in fade-in duration-1000">
        {lines.map((line, i) => (
          <div key={i} className="opacity-80 transition-opacity duration-300">
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}
