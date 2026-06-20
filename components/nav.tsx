"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { AdxjLogo } from '@/components/logo';

const navItems = [
  { label: '首页', href: '/' },
  { label: '蓝鲸出海', href: '/bluewhale' },
  { label: '出海资讯', href: '/insights' },
  { label: '开发者服务', href: '/developer' },
  { label: '媒体买量', href: '/media' },
  { label: '行业社群', href: '/community' },
  { label: '加入我们', href: '/join' },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const currentPath = pathname ?? '';

  const isActive = (href: string) => {
    if (href === '/') return currentPath === '/';
    return currentPath === href || currentPath.startsWith(`${href}/`);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-blue-100 bg-white/95 px-5 py-4 backdrop-blur-md md:px-8 lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">
        <Link href="/">
          <AdxjLogo />
        </Link>

        <div className="hidden items-center justify-center gap-2 rounded-full border border-slate-100 bg-slate-50/80 px-2 py-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-3 py-2 text-[11px] font-bold transition-all xl:px-4 xl:text-xs ${
                isActive(item.href)
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-100'
                  : 'text-blue-950 hover:bg-white hover:text-blue-700'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link href="#contact" className="hidden rounded-full bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-200 transition-colors hover:bg-blue-700 sm:inline-flex xl:px-6 xl:text-sm">
          联系合作
        </Link>

        <button
          type="button"
          aria-label={open ? '关闭导航菜单' : '打开导航菜单'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-blue-950 shadow-sm lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="mx-auto mt-4 w-full max-w-7xl rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200/60 lg:hidden">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                  isActive(item.href)
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-50 text-slate-700 hover:bg-blue-50 hover:text-blue-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setOpen(false)}
              className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white"
            >
              联系合作
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
