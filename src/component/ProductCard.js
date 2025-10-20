"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import AddToCartButton from "./AddToCartButton";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Image from "next/image";

export default function ProductCard({ item, index }) {
  const router = useRouter();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isImageError, setIsImageError] = useState(false);

  const badgeStyles = {
    hot: "bg-red-500 text-white",
    sale: "bg-blue-500 text-white",
    new: "bg-green-500 text-white",
    best: "bg-purple-500 text-white",
  };

  const handleNavigate = async (href) => {
    NProgress.start();
    try {
      await router.push(href);
    } finally {
      NProgress.done();
    }
  };

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const renderRating = () => {
    const rating = item?.rating || 4.5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center mt-1">
        {[...Array(fullStars)].map((_, i) => (
          <i key={`full-${i}`} className="ri-star-fill text-yellow-400 text-sm"></i>
        ))}
        {hasHalfStar && <i className="ri-star-half-fill text-yellow-400 text-sm"></i>}
        {[...Array(emptyStars)].map((_, i) => (
          <i key={`empty-${i}`} className="ri-star-line text-gray-300 text-sm"></i>
        ))}
        <span className="text-xs text-gray-500 ml-1">
          ({item?.reviews || 24})
        </span>
      </div>
    );
  };

  // ✅ Fix: ensure valid image URL
  const imageUrl =
    item?.images?.[0]?.url?.startsWith("http")
      ? item.images[0].url
      : `https://i.ibb.co/b5yvq8gc/Untitled-design.png`; // default remote fallback

  return (
    <div className="product-card bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group relative">
      <div className="product-image-container relative overflow-hidden">
        {!isImageLoaded && <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>}

        <div className="relative pt-[100%]">
          <Image
            src={isImageError ? "/placeholder-book.png" : imageUrl}
            alt={item?.name || "Book"}
            fill
            className={`object-contain transition-transform duration-500 group-hover:scale-105 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onLoad={() => setIsImageLoaded(true)}
            onError={() => setIsImageError(true)}
            priority={index < 4}
          />
        </div>

        {item?.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full shadow-sm ${
                badgeStyles[item?.badge?.toLowerCase()] ||
                "bg-gray-500 text-white"
              }`}
            >
              {item?.badge}
            </span>
          </div>
        )}

        <button
          onClick={toggleWishlist}
          className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow-md transition-all duration-300 hover:bg-red-50 hover:scale-110"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isWishlisted ? (
            <i className="ri-heart-fill text-red-500 text-lg"></i>
          ) : (
            <i className="ri-heart-line text-gray-600 text-lg group-hover:text-red-500"></i>
          )}
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="absolute bottom-3 right-3 z-10 bg-white rounded-full p-2 shadow-md opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-blue-50 hover:scale-110"
          aria-label="Quick view"
        >
          <i className="ri-eye-line text-gray-600 text-lg group-hover:text-blue-500"></i>
        </button>

        {item?.regularPrice && item?.salePrice && (
          <div className="absolute bottom-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {Math.round(
              ((item.regularPrice - item.salePrice) / item.regularPrice) * 100
            )}
            % OFF
          </div>
        )}
      </div>

      <div className="product-content p-4 flex flex-col flex-1">
        <div className="flex-1">
          <div className="product-category text-xs text-gray-500 uppercase tracking-wider">
            <Link
              href={`/category/${item?.category?.id}`}
              className="hover:text-blue-600 transition-colors"
            >
              {item?.category?.label}
            </Link>
          </div>

          <h2 className="text-sm md:text-base font-semibold text-gray-800 mt-1 line-clamp-2">
            <Link
              href={`/shop/${item?.id}`}
              className="hover:text-blue-600 transition-colors"
            >
              {item?.name}
            </Link>
          </h2>

          <div className="text-xs text-gray-500 mt-1">
            By{" "}
            <Link
              href={`/brand/${item?.brand?.id}`}
              className="text-blue-600 hover:underline transition-colors"
            >
              {item?.brand?.name || "nangor"}
            </Link>
          </div>

          {renderRating()}
        </div>

        <div className="product-footer mt-4">
          <div className="product-price flex items-center gap-2 mb-3">
            {item?.regularPrice && (
              <span className="old-price line-through text-gray-400 text-sm">
                <em className="not-italic">৳</em> {item?.regularPrice}
              </span>
            )}
            <span className="current-price text-lg font-bold text-green-600">
              <em className="not-italic">৳</em> {item?.salePrice || "28.85"}
            </span>
          </div>

          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex-1 order-2 md:order-1">
              <AddToCartButton item={item} index={index} />
            </div>
            <button
              onClick={() => handleNavigate(`/shop/${item?.id}`)}
              className="flex-1 border order-1 md:order-2 border-gray-300 cursor-pointer rounded-lg py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-1"
            >
              <i className="ri-eye-line"></i> View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
