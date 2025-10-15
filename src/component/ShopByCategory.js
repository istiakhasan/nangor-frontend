/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect } from "react";
import Slider from "react-slick";
import { useGetCategoryOptionsQuery } from "../redux/api/categoryApi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; // ✅ important for layout after reload

const CategorySlider = () => {
  const { data: categoryData } = useGetCategoryOptionsQuery(undefined);

  // Fix slick slider rendering issues after hydration
  useEffect(() => {
    if (typeof window !== "undefined") {
      // force slick to recalc width properly
      window.dispatchEvent(new Event("resize"));
    }
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1280, // laptop
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1024, // tablet
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640, // mobile
        settings: {
          slidesToShow: 2, // ✅ better for mobile, 2 items visible
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="relative w-full mb-10 p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          Shop by Categories
        </h2>
        <button className="text-gray-500 hidden hover:text-green-600 font-medium text-sm sm:text-base">
          All Categories →
        </button>
      </div>

      {/* Slider */}
      <Slider {...settings}>
        {categoryData?.data?.map((cat) => (
          <div key={cat.id} className="px-2 sm:px-4">
            <div className="flex flex-col items-center justify-center min-h-[140px] sm:min-h-[180px] bg-gray-50 rounded-2xl shadow-sm hover:shadow-md cursor-pointer p-4 sm:p-6 transition-all duration-200">
              <img
                src={
                  "https://nest-frontend-v6.vercel.app/assets/imgs/theme/icons/category-11.svg"
                }
                alt={cat?.label}
                className="w-12 h-12 sm:w-16 sm:h-16 mb-2 sm:mb-4"
              />
              <p className="font-medium text-center text-sm sm:text-base">
                {cat?.label}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CategorySlider;
