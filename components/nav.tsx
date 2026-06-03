"use client";
import React from 'react';
import Link from 'next/link';
import { AdxjLogo } from '@/components/logo';

export function Nav() {
  return (
    <nav className="flex items-center justify-between px-10 py-6 border-b border-blue-100 bg-white/90 backdrop-blur-md relative z-50 sticky top-0">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto space-x-8">
        <Link href="/">
          <AdxjLogo />
        </Link>
        <div className="hidden md:flex gap-10 text-sm font-bold text-blue-900">
          <Link href="/" className="hover:text-blue-600 transition-colors flex items-center gap-1">首页</Link>
          <Link href="/community" className="hover:text-blue-600 transition-colors flex items-center gap-1">出海行业交流群</Link>
          <Link href="/developer" className="hover:text-blue-600 transition-colors flex items-center gap-1">开发者与技术服务</Link>
          <Link href="/media" className="hover:text-blue-600 transition-colors flex items-center gap-1">全渠道媒体买量</Link>
        </div>
        <button className="px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-full hover:bg-blue-700 transition-colors shadow-md shadow-blue-200">
          联系合作
        </button>
      </div>
    </nav>
  );
}
