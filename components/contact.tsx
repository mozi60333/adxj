"use client";
import React, { useState } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import Image from 'next/image';

export function Contact() {
  const [showQr, setShowQr] = useState(false);

  return (
    <section className="w-full max-w-7xl mx-auto px-10 py-16">
      <div className="bg-white rounded-3xl p-10 border border-blue-100 shadow-xl shadow-slate-200/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        <div className="flex flex-col gap-4">
          <div className="text-sm font-bold text-blue-950 uppercase tracking-widest flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            联系我们 / Contact Us
          </div>
          <h2 className="text-3xl font-black text-blue-950 tracking-tighter font-[family-name:var(--font-display)]">
            立刻开启增长与合作
          </h2>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 text-sm text-slate-600 bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-2">
            <Send className="w-4 h-4 text-blue-500" />
            <span>Telegram: <a href="https://t.me/M7HHHH" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 hover:underline font-bold transition-colors">@M7HHHH</a></span>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-green-500" />
            <span>WeChat: <span className="font-bold text-slate-800">M7HHHH</span></span>
          </div>
          
          {/* WeCom QR Code Trigger */}
          <div className="relative flex items-center gap-2 cursor-pointer group" onMouseEnter={() => setShowQr(true)} onMouseLeave={() => setShowQr(false)}>
            <div className="flex items-center justify-center w-4 h-4 bg-blue-600 text-white rounded-[4px] text-[10px] font-bold">企</div>
            <span className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">企业微信</span>
            
            {showQr && (
              <div className="absolute bottom-full right-0 md:left-1/2 md:-translate-x-1/2 mb-4 p-3 bg-white rounded-2xl shadow-xl shadow-slate-200 border border-slate-100 z-50 animate-in fade-in zoom-in duration-200">
                <div className="w-32 h-32 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center overflow-hidden relative">
                  <Image src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=WeCom:M7HHHH&color=0f172a" alt="WeCom QR" fill className="object-cover" unoptimized />
                </div>
                <div className="text-center mt-2 text-xs font-bold text-slate-600">扫码添加企业微信</div>
                <div className="absolute -bottom-2 right-6 md:left-1/2 md:-translate-x-1/2 border-8 border-transparent border-t-white"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
