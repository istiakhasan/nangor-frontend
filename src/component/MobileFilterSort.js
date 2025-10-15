"use client";
import React, { useState } from "react";
import FilterIcon from "@mui/icons-material/Filter";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import { Drawer } from "@mui/material";
import SidebarCategory from "./FilterCategoryCard";
import FillByPrice from "./FillbyPrice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const MobileFilterSort = ({ categories }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Default");

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathNam=usePathname()
  const sortOptions = [
    { label: "Default", sortBy: "createdAt", sortOrder: "DESC" },
    { label: "Price: Low to High", sortBy: "salePrice", sortOrder: "ASC" },
    { label: "Price: High to Low", sortBy: "salePrice", sortOrder: "DESC" },
    { label: "Newest First", sortBy: "createdAt", sortOrder: "DESC" },
    // { label: "Popular", sortBy: "popularity", sortOrder: "DESC" },
  ];

  const handleSortSelect = (option) => {
    setSelectedSort(option.label);
    setShowSortOptions(false);

    // Build new URL params
    const params = new URLSearchParams(searchParams);
    params.set("sortBy", option.sortBy);
    params.set("sortOrder", option.sortOrder);

    // Push new query params to URL (Next.js will re-fetch)
    if(pathNam==='/shop'){
      router.push(`/shop/?${params.toString()}`);
    }else{
      router.push(`/?${params.toString()}`);
    }
  };

  return (
    <div className="mobile-filter-sort-container mb-5 relative">
      {/* Main Filter and Sort Bar */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <button
          className="flex items-center justify-center px-4 py-2 bg-gray-100 rounded-lg"
          onClick={() => setOpenSidebar(true)}
        >
          <FilterIcon className="mr-2 text-gray-700" />
          <span className="text-gray-700 font-medium">Filter</span>
        </button>

        <div className="flex items-center">
          <span className="mr-2 text-gray-500 text-sm">Sort By:</span>
          <button
            className="flex items-center"
            onClick={() => setShowSortOptions(!showSortOptions)}
          >
            <span className="text-gray-800 font-medium">{selectedSort}</span>
            <ArrowDropDownIcon
              className={`ml-1 text-gray-500 transition-transform ${
                showSortOptions ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Sort Options Dropdown */}
      {showSortOptions && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg z-10">
          {sortOptions.map((option, index) => (
            <div
              key={index}
              className={`px-4 py-3 border-b border-gray-100 cursor-pointer ${
                selectedSort === option.label ? "bg-blue-50" : ""
              }`}
              onClick={() => handleSortSelect(option)}
            >
              <span
                className={`${
                  selectedSort === option.label
                    ? "text-blue-600 font-medium"
                    : "text-gray-700"
                }`}
              >
                {option.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Filter Drawer (Right Sidebar) */}
      <Drawer anchor="right" open={openSidebar} onClose={() => setOpenSidebar(false)}>
        <div className="w-74 flex flex-col h-full">
          <span className="p-[10px]" onClick={() => setOpenSidebar(false)}>
            <CloseIcon />
          </span>
          <SidebarCategory categoryData={categories?.data} />
          <FillByPrice />
        </div>
      </Drawer>
    </div>
  );
};

export default MobileFilterSort;
