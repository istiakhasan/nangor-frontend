/* eslint-disable @next/next/no-img-element */
// components/ProductCard.js
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ item,index }) {
  // Badge styles map
  const badgeStyles = {
    hot: "bg-red-500 text-white",
    sale: "bg-blue-500 text-white",
    new: "bg-green-500 text-white",
    best: "bg-purple-500 text-white",
  };
  return (
    <div className="product-cart-wrap  md:mb-6 h-full flex flex-col duration-300 hover:-translate-y-1 hover:scale-[1.02]">
      {/* Product Image & Actions */}
      <div className="product-img-action-wrap  relative group">
        <div className="product-img product-img-zoom pt-[30px] md:pt-0 px-[20px] md:px-0 overflow-hidden  md:py-5">
          <Link href={`/shop/${item?.id}`}>
            <img
              src={item?.images[0]?.url}
              alt={item?.name || "Product"}
              className="default-img w-full h-[180px] md:h-64  transition-transform duration-300 hover:border-t-[7px] hover:border-r-[7px] border-gray-400"
            />
            {/* <img
              src="https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/0f35a4098_179691.jpg"
              alt={`${item?.name} Hover`}
              className="hover-img w-full h-[100px] md:h-64 object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            /> */}
          </Link>
        </div>

        {/* Action Buttons */}
        {/* <div className="product-action-1 absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
          <Link
            href="/shop-wishlist"
            aria-label="Add To Wishlist"
            className="action-btn bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            <i className="fi-rs-heart"></i>
          </Link>
          <Link
            href="/shop-compare"
            aria-label="Compare"
            className="action-btn bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            <i className="fi-rs-shuffle"></i>
          </Link>
          <button
            aria-label="Quick view"
            className="action-btn bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            <i className="fi-rs-eye"></i>
          </button>
        </div> */}

        {/* Badge */}
        {item?.badge && (
          <div className="product-badges absolute top-0 left-3">
            <span
              className={`text-xs font-semibold px-2 py-1 rounded ${
                badgeStyles[item?.badge?.toLowerCase()] ||
                "bg-gray-500 text-white"
              }`}
            >
              {item?.badge}
            </span>
          </div>
        )}
      </div>

      {/* Product Content */}
      <div className="product-content-wrap px-[10px]  md:px-[20px] py-[20px] mt-3 md:mt-0 flex flex-col justify-between md:flex-1">
        <div>
          <div className="product-category text-sm text-gray-500">
            <Link href="/shop-grid-right">{item?.category?.label}</Link>
          </div>

          {/* Product Title with fixed height */}
          <h2 className="text-[14px] md:text-[16px] font-semibold text-gray-800 mt-1">
            <Link href="/shop-product-right">{item?.name}</Link>
          </h2>

          {/* Rating */}
          {/* <div className="product-rate-cover flex items-center md:mt-2">
            <div>
              <i className="ri-star-fill text-amber-500"></i>
              <i className="ri-star-fill text-amber-500"></i>
              <i className="ri-star-fill text-amber-500"></i>
              <i className="ri-star-fill text-amber-500"></i>
            </div>
            <span className="ml-2 font-small text-xs text-gray-500">(4.0)</span>
          </div> */}

          <div className="text-xs text-gray-500 mt-1">
            By{" "}
            <Link
              href="/vendor-details-1"
              className="text-blue-600 hover:underline"
            >
              nangor
            </Link>
          </div>
        </div>

        {/* Price & Add to Cart */}
        <div className="product-card-bottom md:flex items-end justify-between mt-0 md:mt-3">
          <div className="product-price flex md:flex-col">
               {item?.regularPrice && (
              <span className="old-price line-through order-2 md:order-1 text-gray-400 ml-2 whitespace-nowrap">
                <em className="not-italic">৳</em> {item?.regularPrice}
              </span>
            )}
            <span className="text-lg font-bold order-1 md:order-2 text-green-600 whitespace-nowrap">
              <em className="not-italic">৳</em> {item?.salePrice || "28.85"}
            </span>
         
          </div>
          <div className="add-cart whitespace-nowrap">
          <AddToCartButton item={item} index={index} />
          </div>
        </div>
      </div>
    </div>
  );
}
