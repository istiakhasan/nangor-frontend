"use client";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import {
  useGetAllProductQuery,
  useGetProductByIdQuery,
} from "../../../../redux/api/productApi";
import ProductDetails from "../_component/ProductDetails";
import ProductInfo from "./ProductInfo";
import Slider from "react-slick";
import ProductCard from "../../../../component/ProductCard";
import Image from "next/image";

const ProductDetailsSection = () => {
  const params = useParams();
  const [open, setOpen] = useState(false);

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
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (isLoading) return null;

  const product = data?.data?.data;
  const imageUrl = product?.images?.[0]?.url;

  return (
    <section className="md:grid grid-cols-12 gap-[30px] px-0 pt-5 mx-auto pb-5">
      <div className="col-span-12 md:flex gap-[30px] px-4">
        <div
          onClick={() => setOpen(true)}
          className="w-[312px] md:sticky md:top-[100px] relative mb-3 h-[400px] border border-gray-400 px-[34px] py-[41px] rounded-md overflow-hidden cursor-pointer"
        >
          <p
            style={{ color: "#E43A36", fontSize: "14px", fontWeight: "bold" }}
            className="absolute top-[10px] right-[34px] cursor-pointer"
          >
            একটু পড়ে দেখুন
          </p>

          {imageUrl ? (
            <div className="w-full h-full hover:border-r-[10px]  hover:border-gray-400 transition-all duration-300 rounded-md overflow-hidden flex items-center justify-center">
              <Image
                loader={({ src }) => src}
                src={imageUrl}
                alt={product?.name || "Product Image"}
                width={312}
                height={400}
                className="object-cover w-full h-full transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>

        <ProductDetails product={product} open={open} setOpen={setOpen} />
      </div>

      <div className="col-span-12">
        <ProductInfo product={product} />
      </div>

    <div className="col-span-12">
  <div className="relative w-full mb-10 p-5">
    {/* Header */}
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800">Related Products</h2>
      <button className="text-gray-500 hover:text-green-600 font-medium">
        All Product →
      </button>
    </div>

    {/* Responsive Grid */}
    <div
      className="
        grid 
        gap-5 
        grid-cols-2 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-5
      "
    >
      {relatedProduct?.data?.map((cat) => (
        <div key={cat.id} className="w-full">
          <ProductCard item={cat} />
        </div>
      ))}
    </div>
  </div>
</div>

    </section>
  );
};

export default ProductDetailsSection;
