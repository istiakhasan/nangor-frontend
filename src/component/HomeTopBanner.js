/* eslint-disable @next/next/no-img-element */
// components/BannerCarousel.tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function BannerCarousel() {
  const banners = [
    {
      id: 1,
      title: "Fresh Vegetables",
      subtitle: "Big discount",
      desc: "Save up to 50% off on your first order",
      image:
        "https://nest-frontend-v6.vercel.app/assets/imgs/slider/slider-6.png", // add your banner image in /public/images
    },
    {
      id: 2,
      title: "Organic Fruits",
      subtitle: "Healthy & Fresh",
      desc: "Get the best organic fruits delivered to your home",
      image:
        "https://nest-frontend-v6.vercel.app/assets/imgs/slider/slider-6.png",
    },
  ];

  return (
    <section className="relative w-full bg-white">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        // autoplay={{ delay: 4000, disableOnInteraction: false }}
        // loop
        className="w-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative h-[200px] md:h-[400px]">
              {/* Text section */}
              <div className="text-center md:text-left max-w-xl absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <h1 className="text-xl md:text-6xl font-bold text-gray-800 leading-snug text-center">
                  {banner.title} <br /> {banner.subtitle}
                </h1>
                <p className="mt-4 text-gray-500 text-lg text-center">{banner.desc}</p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                  className=" mt-2 md:mt-6 hidden  items-center bg-white rounded-full shadow-md overflow-hidden  mx-auto md:mx-0"
                  // className=" mt-2 md:mt-6 hidden  md:flex items-center bg-white rounded-full shadow-md overflow-hidden  mx-auto md:mx-0"
                >
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 px-4 py-4 text-gray-700 outline-none"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-[#4d321d] hover:bg-green-600 text-white px-6 py-4 font-medium"
                  >
                    Subscribe
                  </button>
                </form>
              </div>

              {/* Banner Image */}
              <div className="mt-10 md:mt-0 flex items-center justify-center absolute w-full  top-0 left-0 h-full">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
