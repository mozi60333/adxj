import React from 'react';
import { MessageCircle, Send } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="w-full max-w-7xl mx-auto px-6 md:px-10 py-16 scroll-mt-28">
      <div className="bg-white rounded-3xl p-8 md:p-10 border border-blue-100 shadow-xl shadow-slate-200/50">
        <div className="flex flex-col gap-3 mb-8">
          <div className="text-sm font-bold text-blue-950 uppercase tracking-widest flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            联系我们 / Contact Us
          </div>
          <h2 className="text-3xl font-black text-blue-950 tracking-tighter font-[family-name:var(--font-display)]">
            立刻开启增长与合作
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">
            无论是社群资源、开发者服务还是媒体买量合作，都可以通过以下方式联系 ADXJ 团队。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <a
            href="https://t.me/M7HHHH"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-100/70"
          >
            <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-5 shadow-md shadow-blue-200">
              <Send className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Telegram</div>
            <div className="text-xl font-black text-slate-900 mb-2">@M7HHHH</div>
            <p className="text-xs text-slate-500 leading-relaxed">
              适合快速沟通增长方案、买量合作与跨境业务资源对接。
            </p>
          </a>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div className="w-11 h-11 rounded-xl bg-green-500 text-white flex items-center justify-center mb-5 shadow-md shadow-green-100">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">WeChat</div>
            <div className="text-xl font-black text-slate-900 mb-2">M7HHHH</div>
            <p className="text-xs text-slate-500 leading-relaxed">
              可添加微信咨询社群、开发者账号、技术服务与商务合作。
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-6 flex flex-col sm:flex-row md:flex-col gap-5 items-center md:items-start">
            <div className="shrink-0 w-32 h-32 rounded-2xl bg-white border border-blue-100 p-2 shadow-sm">
              <img
                src="/wecom-qr.png"
                alt="企业微信二维码"
                width={128}
                height={128}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-2">WeCom</div>
              <div className="text-xl font-black text-slate-900 mb-2">企业微信</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                扫码添加企业微信，获取更稳定的企业级合作沟通入口。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
