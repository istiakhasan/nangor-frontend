"use client";
import { useState } from "react";

const SortBy = () => {
  const [showCountDropdown, setShowCountDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [selectedCount, setSelectedCount] = useState("50");
  const [selectedSort, setSelectedSort] = useState("Featured");

  const counts = ["50", "100", "150", "200", "All"];
  const sorts = ["Featured", "Price: Low to High", "Price: High to Low", "Release Date", "Avg. Rating"];

  return (
    <div className="sort-by-product-area flex flex-wrap gap-4">
      {/* Show Count Dropdown */}
      <div className="relative sort-by-cover">
        <div
          className="sort-by-product-wrap flex items-center cursor-pointer px-4 py-2 border rounded"
          onClick={() => setShowCountDropdown(!showCountDropdown)}
        >
          <span className="flex items-center gap-1">
            <i className="ri-apps-line text-xl"></i> Show:
          </span>
          <span className="ml-2 flex items-center gap-1">
            {selectedCount} <i className="ri-arrow-down-s-line text-xl"></i>
          </span>
        </div>
        {showCountDropdown && (
          <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow">
            <ul>
              {counts.map((count) => (
                <li key={count}>
                  <a
                    href="#"
                    className={`block px-4 py-2 hover:bg-gray-100 ${
                      selectedCount === count ? "font-bold text-green-600" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedCount(count);
                      setShowCountDropdown(false);
                    }}
                  >
                    {count}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Sort By Dropdown */}
      <div className="relative sort-by-cover">
        <div
          className="sort-by-product-wrap flex items-center cursor-pointer px-4 py-2 border rounded"
          onClick={() => setShowSortDropdown(!showSortDropdown)}
        >
          <span className="flex items-center gap-1">
            <i className="ri-sort-asc-line text-xl"></i> Sort by:
          </span>
          <span className="ml-2 flex items-center gap-1">
            {selectedSort} <i className="ri-arrow-down-s-line text-xl"></i>
          </span>
        </div>
        {showSortDropdown && (
          <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow">
            <ul>
              {sorts.map((sort) => (
                <li key={sort}>
                  <a
                    href="#"
                    className={`block px-4 py-2 hover:bg-gray-100 ${
                      selectedSort === sort ? "font-bold text-green-600" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedSort(sort);
                      setShowSortDropdown(false);
                    }}
                  >
                    {sort}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortBy;
