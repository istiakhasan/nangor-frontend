/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pageAnimating, setPageAnimating] = useState(false);

  const menuItems = [
    { name: "Overview", icon: "fa fa-home", href: "#" },
    { name: "Orders", icon: "fa fa-shopping-cart", href: "/orders" },
    { name: "Products", icon: "fa fa-box", href: "/dashboard/products" },
    { name: "Category", icon: "fa fa-cog", href: "/dashboard/category" },
    { name: "Author", icon: "fa fa-cog", href: "/dashboard/author" },
  ];

  const handleLinkClick = (href) => {
    // Trigger animation
    setPageAnimating(true);

    // Wait for animation duration before navigating
    setTimeout(() => {
      setPageAnimating(false);
      window.location.href = href;
    }, 300); // animation duration matches transition
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transition-transform duration-300 z-40
        ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0`}
      >
        <div className="p-7 shadow">
          <h2 className="text-xl font-bold text-gray-800">Ngr</h2>
        </div>
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleLinkClick(item.href)}
              className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg hover:bg-gray-200 text-gray-700 transition-colors"
            >
              <i className={`${item.icon}`} aria-hidden="true"></i>
              {item.name}
            </button>
          ))}
        </nav>
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

        {/* Page Content with animation */}
        <main
          className={`flex-1 p-6 overflow-y-auto transition-opacity duration-300 ${
            pageAnimating ? "opacity-0" : "opacity-100"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
