/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import LogoutIcon from "@mui/icons-material/Logout"; // Material UI Logout Icon
import { IconButton,Button } from "@mui/material";

export default function DashboardLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navigating, setNavigating] = useState(false);
  const router = useRouter();

  const menuItems = [
    { name: "Overview", icon: "fa fa-home", href: "/dashboard" },
    { name: "Orders", icon: "fa fa-shopping-cart", href: "/orders" },
    { name: "Products", icon: "fa fa-box", href: "/dashboard/products" },
    { name: "Category", icon: "fa fa-cog", href: "/dashboard/category" },
    { name: "Author", icon: "fa fa-cog", href: "/dashboard/author" },
  ];

  const isLoggedIn = () => !!localStorage.getItem("token");

  // Initial login check
  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace("/login");
    } else {
      setLoading(false);
    }
  }, []);

  // NProgress for route changes
  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();

    const push = router.push;
    router.push = async (...args) => {
      handleStart();
      setNavigating(true);
      try {
        await push(...args);
      } finally {
        handleStop();
        setNavigating(false);
      }
    };
  }, [router]);

  const handleLinkClick = async (href) => {
    if (navigating) return;
    NProgress.start();
    setNavigating(true);
    await router.push(href);
    NProgress.done();
    setNavigating(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transition-transform duration-300 z-40 flex flex-col justify-between
        ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0`}
      >
        <div>
          <div className="p-7 shadow">
            <h2 onClick={()=>handleLinkClick('/')} className="text-xl font-bold text-gray-800 cursor-pointer">Nonggor</h2>
          </div>
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleLinkClick(item.href)}
                className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg hover:bg-gray-200 text-gray-700 transition-colors ${
                  navigating ? "cursor-not-allowed opacity-70" : ""
                }`}
                disabled={navigating}
              >
                <i className={`${item.icon}`} aria-hidden="true"></i>
                {item.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Logout Button at Bottom */}
        <div className="p-4">
          <Button
            onClick={handleLogout}
            disabled={navigating}
          >
            <LogoutIcon className="text-gray-700 mr-2" />
            <span className="text-gray-700 font-medium">Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Top Navbar */}
        <header className="flex items-center justify-between bg-white shadow px-4 py-6">
          <button
            className="md:hidden text-gray-600"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <i className="fa fa-bars" aria-hidden="true"></i>
          </button>
          <h1 className="text-lg font-semibold text-gray-800">Dashboard Panel</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Hi, Admin</span>
            <img
              src="https://i.pravatar.cc/40"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>

      {/* Loader CSS */}
      <style jsx>{`
        .loader {
          border-top-color: #3498db;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* NProgress bar custom style */
        #nprogress .bar {
          background: #3498db !important;
          height: 3px !important;
        }
        #nprogress .peg {
          box-shadow: 0 0 10px #3498db, 0 0 5px #3498db !important;
        }
      `}</style>
    </div>
  );
}
