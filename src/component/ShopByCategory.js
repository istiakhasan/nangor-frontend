/* eslint-disable @next/next/no-img-element */
"use client";
import { useGetCategoryOptionsQuery } from "../redux/api/categoryApi";
import React from "react";
import Slider from "react-slick";

const CategorySlider = () => {
  const { data: categoryData } = useGetCategoryOptionsQuery(undefined);
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
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="relative w-full mb-10 p-[20px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Shop by Categories</h2>
        <button className="text-gray-500 hover:text-green-600 font-medium">
          All Categories →
        </button>
      </div>

      {/* Slider */}
      <Slider {...settings}>
        {categoryData?.data?.map((cat) => (
          <div key={cat.id} className="px-4">
            <div className="flex sop_category_slider_card flex-col items-center justify-center h-[180px] bg-gray-50 rounded-2xl shadow-sm hover:shadow-md cursor-pointer">
              <img src={'https://nest-frontend-v6.vercel.app/assets/imgs/theme/icons/category-11.svg'} alt={cat?.label} className="w-16 h-16 mb-4" />
              <p className=" font-medium text-center">
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
