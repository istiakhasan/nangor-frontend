/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useGetAllMainCategoryQuery } from "../redux/api/categoryApi";

const CategorySlider = () => {
  const { data: categoryData } = useGetAllMainCategoryQuery(undefined);

  return (
    <div className="w-full mb-10 p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 relative">
          Shop by Categories
          <span className="absolute bottom-0 left-0 w-16 h-1 bg-[#4d321d] rounded-full"></span>
        </h2>
        {/* <button className="text-gray-600 hover:text-[#4d321d] font-medium text-sm sm:text-base flex items-center group transition-colors duration-300">
          All Categories
          <span className="ml-1 group-hover:translate-x-1 transition-transform duration-300">→</span>
        </button> */}
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
        {categoryData?.data?.map((cat) => (
          <div 
            key={cat.id} 
            className="group relative bg-white rounded-2xl shadow-sm hover:shadow-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
          >
            <div className="p-4 sm:p-6 flex flex-col items-center justify-center h-full">
              {/* Icon Container */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-[#4d321d]/10 group-hover:bg-[#4d321d]/20 transition-all duration-300 mb-3 sm:mb-4">
                <img
                  src={cat?.image}
                  alt={cat?.label}
                  className="w-8 h-8 sm:w-12 sm:h-12 object-contain"
                />
              </div>
              
              {/* Category Name */}
              <p className="font-medium text-center text-gray-800 group-hover:text-[#4d321d] transition-colors duration-300 text-sm sm:text-base">
                {cat?.label}
              </p>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-[#4d321d]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySlider;