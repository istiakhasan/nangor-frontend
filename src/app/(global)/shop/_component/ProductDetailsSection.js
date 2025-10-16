"use client";
import { useParams } from "next/navigation";
import React ,{useState}from "react";
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
  const [open,setOpen]=useState(false)
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
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  if (isLoading) return;
  return (
    <section className="md:grid grid-cols-12 gap-[30px]  px-0 pt-5 mx-auto pb-5">
      <div className="col-span-12 md:flex gap-[30px] px-4">
        <div  onClick={()=>setOpen(true)} className="w-[312px] md:sticky md:top-[100px] relative mb-3  h-[400px] border-1 border-gray-400 px-[34px] py-[41px]">
          <p style={{color:"#E43A36",fontSize:"14px",fontWeight:"bold"}}  className="text-[#3bb77e]  text-[18px]  font-[500] absolute top-[10px] right-[34px] cursor-pointer">একটু পড়ে দেখুন</p>
           <img className="h-[100%] w-[100%] hover:border-r-[10px] border-gray-400 cursor-pointer"  alt="" src={data?.data?.data?.images[0]?.url} />
        </div>
       <ProductDetails product={data?.data?.data} open={open} setOpen={setOpen} />
      </div>
      <div className="col-span-12 ">
        <ProductInfo product={data?.data?.data} />
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
