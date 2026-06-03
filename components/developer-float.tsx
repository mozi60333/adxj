"use client";
import React, { useState } from 'react';
import { MessageSquareCode, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function DeveloperFloatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-full shadow-2xl shadow-blue-600/50 flex items-center justify-center transition-colors group"
          >
            <MessageSquareCode className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="absolute right-full mr-4 bg-[#0F172A] text-white text-xs font-bold py-1.5 px-3 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-blue-900/50">
              账号即时询价 & 技术诊断
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50 w-80 bg-[#0F172A] border border-blue-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="bg-blue-900/30 p-4 flex items-center justify-between border-b border-blue-800/50">
              <div className="flex items-center gap-2">
                <MessageSquareCode className="w-5 h-5 text-blue-400" />
                <span className="font-bold text-sm text-white">技术诊断 & 询价</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-blue-400 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-5 space-y-3 relative">
              <div className="text-xs text-blue-300 bg-blue-900/20 p-3 rounded-xl border border-blue-800/30">
                您好，您需要遇到哪方面的问题？百人研发团队随时为您提供技术支持。
              </div>

              <div className="space-y-2 mt-4">
                <a href="https://t.me/M7HHHH" target="_blank" rel="noopener noreferrer" className="block w-full bg-[#1E293B] hover:bg-blue-900/40 border border-blue-800/30 rounded-xl p-3 text-xs font-bold text-slate-300 hover:text-white transition-all flex justify-between items-center group">
                  商店上架 / 代码合规诊断
                  <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity text-blue-400" />
                </a>
                <a href="https://t.me/M7HHHH" target="_blank" rel="noopener noreferrer" className="block w-full bg-[#1E293B] hover:bg-blue-900/40 border border-blue-800/30 rounded-xl p-3 text-xs font-bold text-slate-300 hover:text-white transition-all flex justify-between items-center group">
                  高权重账号即时询价 (买/卖)
                  <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity text-blue-400" />
                </a>
                <a href="https://t.me/M7HHHH" target="_blank" rel="noopener noreferrer" className="block w-full bg-[#1E293B] hover:bg-blue-900/40 border border-blue-800/30 rounded-xl p-3 text-xs font-bold text-slate-300 hover:text-white transition-all flex justify-between items-center group">
                  被下架/被封号 紧急救治
                  <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity text-blue-400" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
