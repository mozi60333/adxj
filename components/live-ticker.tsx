"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity } from 'lucide-react';

const MESSAGES = [
  "来自深圳的 Slots 项目方刚加入了 Telegram 131 号群",
  "来自北京的独立开发者通过审核，加入 WeChat 核心业务圈",
  "东南亚支付服务商正在 Telegram 群内对接本地通道",
  "某头部应用开发团队在 Telegram 群分享了支付合规案例",
  "广州出海矩阵团队新加入了 WeChat 独立站讨论组",
  "出海 Fintech 创始人在私域圈发起了当地合规政策研讨"
];

export function LiveTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-[#0F172A] text-white border-b border-blue-900/50 overflow-hidden text-xs py-2.5 shadow-sm">
      <div className="max-w-7xl mx-auto px-10 flex items-center gap-4">
        <div className="flex items-center gap-2 text-cyan-400 font-bold tracking-widest uppercase flex-shrink-0 border-r border-blue-800/50 pr-4">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          社群动态 LIVE
        </div>
        <div className="flex-1 relative h-4 overflow-hidden mask-fade">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentIndex}
              initial={{ y: 20, opacity: 0, filter: 'blur(4px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: -20, opacity: 0, filter: 'blur(4px)' }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0 text-slate-300 truncate"
            >
              {MESSAGES[currentIndex]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .mask-fade {
          -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
        }
      `}} />
    </div>
  );
}
