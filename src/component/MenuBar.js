/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter, usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const MenuBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  // ✅ Listen for route change events
  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    // Simulate Next.js router events (for App Router)
    window.addEventListener('beforeunload', handleStart);
    router.prefetch('/'); // prefetching home for smoother UX
    handleComplete(); // reset if component remounts

    return () => {
      window.removeEventListener('beforeunload', handleStart);
    };
  }, [router]);

  // ✅ When pathname changes (route finished), hide loader
  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  const handleNavigate = (path) => {
    if (pathname === path) return;
    setLoading(true);
    router.push(path);
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
    </>
  );
};

export default MenuBar;
