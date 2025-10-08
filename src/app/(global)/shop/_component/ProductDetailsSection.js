"use client";
import { useParams } from "next/navigation";
import React from "react";
import {
  useGetAllProductQuery,
  useGetProductByIdQuery,
} from "../../../../redux/api/productApi";
import ProductImageSlider from "../_component/ProductImageSlider";
import ProductDetails from "../_component/ProductDetails";
import ProductInfo from "./ProductInfo";
import Slider from "react-slick";
import ProductCard from "../../../../component/ProductCard";
const ProductDetailsSection = () => {
  const params = useParams();
  const { data, isLoading } = useGetProductByIdQuery({
    id: params?.slug,
    type: "id",
  });
  const { data: relatedProduct, isLoading: productLoading } =
    useGetAllProductQuery({
      limit: 7,
    });
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
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
  if (isLoading) return;
  return (
    <section className="grid grid-cols-12 gap-[30px]  px-0 pt-5 mx-auto pb-5">
      <div className="col-span-6 px-4">
        <ProductImageSlider
          images={data?.data?.data?.images?.map((item) => {
            return {
              original: item?.url,
              thumbnail: item?.url,
            };
          })}
        />
      </div>
      <ProductDetails product={data?.data?.data} />
      <div className="col-span-12">
        <ProductInfo />
      </div>
      <div className="col-span-12">
        <div className="relative w-full mb-10 p-[20px]">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Related Products
            </h2>
            <button className="text-gray-500 hover:text-green-600 font-medium">
              All Product →
            </button>
          </div>

          {/* Slider */}
          <Slider {...settings}>
            {relatedProduct?.data?.map((cat) => (
              <div key={cat.id} className="px-4">
                <ProductCard item={cat} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsSection;
