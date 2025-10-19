/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productAddToCart } from "../../../../redux/feature/cartSlice";
import { useSnackbar } from "../../../../component/SnackbarContext";
import moment from "moment";
import "./style.css";
import { usePathname, useRouter } from 'next/navigation';
import { Modal } from "@mui/material";
import Image from "next/image";

const ProductDetails = ({ product,open,setOpen }) => {
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();
  const [quantity, setQuantity] = useState(1);
  const { cart } = useSelector((state) => state?.cart);
  const pathName=usePathname()
  const router=useRouter()
  // ✅ Check if product already in cart
  const isInCart = cart?.some((item) => item?._id === product?._id);

  const handleAddToCart = () => {
    if (quantity < 1) {
      showSnackbar("Quantity should not be zero", "error");
      return;
    }
    if (isInCart) {
      showSnackbar("Product already in cart", "warning");
      return;
    }
    dispatch(productAddToCart({ ...product, quantity }));
    showSnackbar("Added to cart!", "success");
  };

  const handleQuantityChange = (type) => {
    setQuantity((prev) => (type === "inc" ? prev + 1 : Math.max(1, prev - 1)));
  };

  return (
    <div className="flex-1 h-fit">
      <div className="detail-info">
        <span className="stock-status out-stock">{product?.badge}</span>
        <h2 style={{overflowWrap:"break-word"}} className="title-detail text-[40px] max-w-[400px] mb-2">{product?.name}</h2>
        <p onClick={()=>setOpen(true)} style={{color:"#3bb77e"}} className="text-[#3bb77e] underline font-[500] cursor-pointer">একটু পড়ে দেখুন</p>

        {/* Product Rating */}
        <div className="product-detail-rating">
          <div className="product-rate-cover text-end">
            <div className="product-rate inline-block">
              <div className="product-rating" style={{ width: "90%" }}></div>
            </div>
            <span className="font-small ml-1 text-muted">(32 reviews)</span>
          </div>
        </div>

        {/* Product Price */}
        <div className="clearfix product-price-cover">
          <div className="product-price primary-color float-left">
            <span className="current-price text-brand">
              {Number(product?.salePrice)?.toFixed(0)}
            </span>
            <span>
              <span className="save-price font-md color3 ml-2">26% Off</span>
              <span className="old-price font-md ml-2">
                {Number(product?.regularPrice)?.toFixed(0)}
              </span>
            </span>
          </div>
        </div>

        {/* Short Description */}
        <div className="short-desc mb-[30px]">
          <p className="font-lg">{product?.description?.length>200?`${product?.description?.slice(0,200)}...`:product?.description}</p>
        </div>

        {/* Quantity & Add to Cart */}
        <div className="detail-extralink mb-[40px]">
          <div className="detail-qty border radius flex items-center">
            <button
              className="qty-down"
              onClick={() => handleQuantityChange("dec")}
              disabled={isInCart}
            >
              <i className="fi-rs-angle-small-down"></i>
            </button>
            <input
              type="text"
              name="quantity"
              className="qty-val w-full text-center outline-none"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              disabled={isInCart}
            />
            <button
              className="qty-up"
              onClick={() => handleQuantityChange("inc")}
              disabled={isInCart}
            >
              <i className="fi-rs-angle-small-up"></i>
            </button>
          </div>

          <div className="product-extra-link2">
            <button
              onClick={handleAddToCart}
              className={`button button-add-to-cart ${
                isInCart ? "disabled opacity-60 cursor-not-allowed" : ""
              }`}
              disabled={isInCart}
            >
              <i className="fi-rs-shopping-cart"></i>
              {isInCart ? "Already in Cart" : "Add to cart"}
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="font-xs flex gap-3">
          <ul className="mr-[20px] ">
            <li className="mb-5">
              Category:{" "}
              <span className="text-brand">{product?.category?.label}</span>
            </li>
            {/* <li className="mb-5">
              MFG:
              <span className="text-brand">
                {" "}
                {moment(product?.createdAt).format("MMM DD YYYY")}
              </span>
            </li> */}
            <li className="mb-5">
              Author:{" "}
              <span
                onClick={() => {
                  if (pathName === "/shop") {
                    router.push(`/shop/?authorIds=${product?.author?.name}`);
                  } else {
                    router.push(`/?authorId=${product?.author?.name}`);
                  }
                }}
                className="text-brand cursor-pointer"
              >
                {product?.author?.name}
              </span>
            </li>
          </ul>

          {/* <ul className="">
            <li className="mb-5">
              SKU: <a href="#">{product?.sku || "N/A"}</a>
            </li>
            <li className="mb-5">
              Tags:{" "}
              <a href="#" rel="tag">
                Snack
              </a>
              ,{" "}
              <a href="#" rel="tag">
                Organic
              </a>
              ,{" "}
              <a href="#" rel="tag">
                Brown
              </a>
            </li>
            <li>
              Stock:
              <span className="in-stock text-brand ml-[4px]">
                8 Items In Stock
              </span>
            </li>
          </ul> */}
        </div>
      </div>

         <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50">
          {/* Modal Card */}
          <div className="bg-white rounded-xl w-full max-w-[600px] max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative">
            {/* Header */}
            <div className="flex justify-end p-3 border-b border-gray-200">
              <button
                onClick={() => setOpen(false)}
                className="text-gray-600 hover:text-red-500 transition"
                aria-label="Close modal"
              >
                <i className="ri-close-large-fill text-xl"></i>
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 hide-scrollbar">
              {product?.readMoreImages?.length ? (
                <div className="flex flex-col gap-4">
                  {product.readMoreImages.map((item, i) => (
                    <div key={i} className="w-full">
                      <img
                        src={item}
                        alt={`Product Image ${i + 1}`}
                        // width={1000}
                        // height={1000}
                        className="w-full h-auto rounded-lg object-contain bg-gray-50"
                        // placeholder="blur"
                        // blurDataURL="/placeholder.png"
                      />
                      {/* <Image
                        src={item}
                        alt={`Product Image ${i + 1}`}
                        width={1000}
                        height={1000}
                        className="w-full h-auto rounded-lg object-contain bg-gray-50"
                        placeholder="blur"
                        blurDataURL="/placeholder.png"
                      /> */}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 py-6 text-center">
                  No images available
                </p>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductDetails;
