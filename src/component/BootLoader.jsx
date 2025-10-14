// BootLoader.jsx
// Redesigned global boot loader using your color #4d321d
"use client"
import { useEffect, useState } from "react";

export default function BootLoader({ show = true, logoText = "MyApp", onFinish }) {
  const [visible, setVisible] = useState(show);
  const minVisible = 800;

  useEffect(() => {
    let t;
    if (show) {
      setVisible(true);
      t = setTimeout(() => {
        setVisible(false);
        if (onFinish) onFinish();
      }, minVisible);
    } else {
      t = setTimeout(() => setVisible(false), 200);
    }
    return () => clearTimeout(t);
  }, [show]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur transition-opacity duration-700">
      <div className="flex flex-col items-center gap-6">
        <div className="relative flex items-center justify-center w-28 h-28 rounded-full shadow-2xl" style={{ backgroundColor: '#4d321d' }}>
          <div className="absolute -inset-3 animate-pulse-ring pointer-events-none" style={{ boxShadow: '0 0 0 0 rgba(77,50,29,0.6)' }}/>
          <div className="text-2xl font-extrabold text-white select-none">{logoText[0]}</div>
        </div>

        <div className="text-center">
          <div className="text-xl font-semibold" style={{ color: '#4d321d' }}>{logoText}</div>
          <div className="mt-1 text-sm text-gray-500">Preparing a fresh experience...</div>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#4d321d' }} />
          <span className="w-2 h-2 rounded-full animate-bounce delay-150" style={{ backgroundColor: '#4d321d' }} />
          <span className="w-2 h-2 rounded-full animate-bounce delay-300" style={{ backgroundColor: '#4d321d' }} />
        </div>

        <div className="mt-4 w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full animate-progress" style={{ backgroundColor: '#4d321d' }}/>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(77,50,29,0.6); transform: scale(1); }
          70% { box-shadow: 0 0 0 20px rgba(77,50,29,0); transform: scale(1.06); }
          100% { box-shadow: 0 0 0 0 rgba(77,50,29,0); transform: scale(1); }
        }
        .animate-pulse-ring { border-radius: 9999px; animation: pulse-ring 1.6s cubic-bezier(.4,0,.2,1) infinite; }

        @keyframes bounce-dots {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.6; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
        .animate-bounce { animation: bounce-dots 1s infinite; width: 8px; height: 8px; border-radius:9999px; }
        .delay-150 { animation-delay: 0.15s; }
        .delay-300 { animation-delay: 0.3s; }

        @keyframes progress { 0% { transform: translateX(-100%); } 100% { transform: translateX(0%); } }
        .animate-progress { transform: translateX(-100%); animation: progress 1.4s forwards; }
      `}</style>
    </div>
  );
}