/* eslint-disable @next/next/no-img-element */
'use client';

import { useRouter, usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const MenuBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  // ✅ Configure NProgress appearance
  NProgress.configure({ showSpinner: false, speed: 400, minimum: 0.05 });

  // ✅ Hide loader when pathname changes
  useEffect(() => {
    setLoading(false);
    NProgress.done();
  }, [pathname]);

  const handleNavigate = async (path) => {
    if (pathname === path) return;
    setLoading(true);
    NProgress.start();       // Start top progress bar
    try {
      await router.push(path);
    } finally {
      setLoading(false);
      NProgress.done();      // Complete top progress bar
    }
  };

  return (
    <>
      {/* Loader Overlay */}
      {loading && (
        <div className="fixed inset-0 z-[9999] bg-white/70 flex flex-col justify-center items-center">
          <div className="w-12 h-12 border-4 border-[#4d321d] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-3 text-[#4d321d] font-semibold">Loading...</p>
        </div>
      )}

      {/* Menu */}
      <div className="md:flex gap-[50px] items-center px-4 py-4">
        <div>
          <ul className="flex">
            <li
              onClick={() => handleNavigate('/')}
              className={`${pathname === '/' ? 'text-[#4d321d]' : 'text-[#253D4E]'} hover:text-[#4d321d] cursor-pointer text-[16px] font-[700] mr-[30px]`}
            >
              Home
            </li>
            <li
              onClick={() => handleNavigate('/about')}
              className={`${pathname === '/about' ? 'text-[#4d321d]' : 'text-[#253D4E]'} hover:text-[#4d321d] cursor-pointer text-[16px] font-[700] mr-[30px]`}
            >
              About
            </li>
            <li
              onClick={() => handleNavigate('/shop')}
              className={`${pathname === '/shop' ? 'text-[#4d321d]' : 'text-[#253D4E]'} hover:text-[#4d321d] cursor-pointer text-[16px] font-[700] mr-[30px]`}
            >
              Shop
            </li>
            <li
              onClick={() => handleNavigate('/contact')}
              className={`${pathname === '/contact' ? 'text-[#4d321d]' : 'text-[#253D4E]'} hover:text-[#4d321d] cursor-pointer text-[16px] font-[700] mr-[30px]`}
            >
              Contact
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="ml-auto md:flex hidden items-center gap-2">
          <div>
            <img
              className="h-[36px] w-[36px]"
              src="https://nest-frontend-v6.vercel.app/assets/imgs/theme/icons/icon-headphone.svg"
              alt="Support Icon"
            />
          </div>
          <div>
            <p className="text-[#4d321d] text-[26px] font-bold">1900-888</p>
            <p className="text-[#7E7E7E] text-[12px]">24/7 Support Center</p>
          </div>
        </div>
      </div>

      {/* NProgress custom styles */}
      <style jsx global>{`
        #nprogress .bar {
          background: #4d321d !important;
          height: 3px !important;
        }
        #nprogress .peg {
          box-shadow: 0 0 10px #4d321d, 0 0 5px #4d321d !important;
        }
      `}</style>
    </>
  );
};

export default MenuBar;
