/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useGetCategoryOptionsQuery } from "../redux/api/categoryApi";
import { useSelector } from "react-redux";

const TopSearchBar = () => {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const pathName = usePathname();
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const dropdownRef = useRef(null);
  const cartItems = useSelector((state) => state.cart);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: categoryData } = useGetCategoryOptionsQuery(undefined);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setCategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set("searchTerm", value);
    else params.delete("searchTerm");

    if (selectedCategory !== "All Categories") {
      const cat = categoryData?.data.find((c) => c.label === selectedCategory);
      if (cat) params.set("categoryId", cat.value);
    } else {
      params.delete("categoryId");
    }
    if (pathName === "/shop") {
      router.push(`/shop/?${params.toString()}`);
    } else {
      router.push(`/?${params.toString()}`);
    }
  };

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat.label);
    const params = new URLSearchParams(searchParams.toString());
    params.set("categoryId", cat.value);
    const searchTerm = searchParams.get("searchTerm");
    if (searchTerm) params.set("searchTerm", searchTerm);
    if (pathName === "/shop") {
      router.push(`/shop/?${params.toString()}`);
    } else {
      router.push(`/?${params.toString()}`);
    }
    setCategoryOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className=" mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div
            onClick={() => router.push("/")}
            className="flex-shrink-0 cursor-pointer"
          >
            <img
              className="h-10 w-auto md:h-12"
              src={"https://i.ibb.co.com/5ggRm6QC/nonggor.png"}
              alt="Nonggor Logo"
            />
          </div>

          {/* Search Bar */}
          <div className="flex-1 w-full max-w-2xl">
            <div className="relative flex items-center border-2 border-[#4d321d]  ">
              {/* Category Selector */}
              <div className="relative flex-shrink-0" ref={dropdownRef}>
                <button
                  onClick={() => setCategoryOpen(!categoryOpen)}
                  className="flex items-center justify-between w-full md:w-40 px-3 py-3 text-sm md:text-base font-medium text-[#253D4E] bg-gray-50 hover:bg-gray-100 focus:outline-none"
                >
                  <span className="truncate">{selectedCategory}</span>
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Category Dropdown - Fixed positioning */}
                {categoryOpen && (
                  <div className="absolute left-0 mt-1 w-full md:w-80 bg-white rounded-md shadow-lg z-[100] border border-gray-200">
                    <div className="p-2">
                      <input
                        type="text"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4d321d]"
                        placeholder="Search category..."
                      />
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      <ul>
                        <li
                          onClick={() => {
                            setSelectedCategory("All Categories");
                            setCategoryOpen(false);
                          }}
                          className="px-4 py-2 text-sm cursor-pointer hover:bg-[#4d321d] hover:text-white"
                        >
                          All Categories
                        </li>
                        {categoryData?.data?.map((cat, i) => (
                          <li
                            key={i}
                            onClick={() => handleCategoryClick(cat)}
                            className="px-4 py-2 text-sm cursor-pointer hover:bg-[#4d321d] hover:text-white"
                          >
                            {cat?.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Search Input */}
              <input
                className="flex-1 w-full px-4 py-3 text-gray-700 placeholder-gray-500 focus:outline-none"
                placeholder="Search for products..."
                defaultValue={searchParams.get("searchTerm") || ""}
                onChange={handleSearch}
              />

              {/* Search Button */}
              <button className="flex-shrink-0 px-4 py-3 bg-[#4d321d] text-white hover:bg-[#3a2817] transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Cart & Account Icons */}
          <div className="md:flex hidden items-center space-x-4 md:space-x-6">
            {/* Cart */}
            <div className="relative group">
              <button className="flex flex-col items-center justify-center p-2 text-gray-700 hover:text-[#4d321d] transition-colors">
                <div className="relative">
                  <svg
                    className="w-6 h-6 md:w-7 md:h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {cartItems?.cart?.length > 0 && (
                    <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#4d321d] rounded-full">
                      {cartItems?.cart?.length}
                    </span>
                  )}
                </div>
                <span className="mt-1 text-xs md:text-sm">Cart</span>
              </button>

              {/* Cart Dropdown */}
              <div
                style={{ overflowWrap: "break-word" }}
                className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-200"
              >
                <div className="max-h-80 overflow-y-auto">
                  {cartItems?.cart?.length > 0 ? (
                    <ul>
                      {cartItems?.cart?.map((c, i) => (
                        <li
                          key={i}
                          className="flex items-center p-3 border-b border-gray-100 hover:bg-gray-50"
                        >
                          <div className="flex-shrink-0 w-16 h-16 overflow-hidden rounded-md">
                            <img
                              src={c?.images[0]?.url}
                              alt={c?.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="ml-4 flex-1 min-w-0">
                            <h3 className="text-sm font-medium text-gray-900 break-words">
                            
                                {c?.name}
                              
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              {c.quantity} × ৳{c?.salePrice}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      Your cart is empty
                    </div>
                  )}
                </div>

                {cartItems?.cart?.length > 0 && (
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex justify-between mb-3">
                      <span className="font-medium">Total:</span>
                      <span className="font-semibold">৳{cartItems?.total}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        href="/cart"
                        className="flex-1 text-center py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        View Cart
                      </Link>
                      <Link
                        href="/checkout"
                        className="flex-1 text-center py-2 px-4 bg-[#4d321d] text-white rounded-md text-sm font-medium hover:bg-[#3a2817]"
                      >
                        Checkout
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Account */}
            <button
              onClick={() => router.push("/dashboard")}
              className="md:flex hidden flex-col items-center justify-center p-2 text-gray-700 hover:text-[#4d321d] transition-colors"
            >
              <svg
                className="w-6 h-6 md:w-7 md:h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="mt-1 text-xs md:text-sm">Account</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopSearchBar;
