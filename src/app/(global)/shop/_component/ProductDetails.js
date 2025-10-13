"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productAddToCart } from "../../../../redux/feature/cartSlice";
import { useSnackbar } from "../../../../component/SnackbarContext";
import moment from "moment";
import "./style.css";
import { usePathname, useRouter } from 'next/navigation';

const ProductDetails = ({ product }) => {
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
    <div className="col-span-6 h-fit">
      <div className="detail-info">
        <span className="stock-status out-stock">{product?.badge}</span>
        <h2 className="title-detail text-[40px]">{product?.name}</h2>

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
          <p className="font-lg">{product?.description}</p>
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
            <li className="mb-5">
              MFG:
              <span className="text-brand">
                {" "}
                {moment(product?.createdAt).format("MMM DD YYYY")}
              </span>
            </li>
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

          <ul className="">
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
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
