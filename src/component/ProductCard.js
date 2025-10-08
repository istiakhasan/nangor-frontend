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
    <div className="product-cart-wrap mb-6 h-full flex flex-col">
      {/* Product Image & Actions */}
      <div className="product-img-action-wrap relative group">
        <div className="product-img product-img-zoom overflow-hidden py-5">
          <Link href={`/shop/${item?.id}`}>
            <Image
              unoptimized
              src={item?.images[0]?.url}
              alt={item?.name || "Product"}
              width={300}
              height={300}
              className="default-img w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <Image
              unoptimized
              src="https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/0f35a4098_179691.jpg"
              alt={`${item?.name} Hover`}
              width={300}
              height={300}
              className="hover-img w-full h-64 object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="product-action-1 absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
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
        </div>

        {/* Badge */}
        {item?.badge && (
          <div className="product-badges absolute top-3 left-3">
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
      <div className="product-content-wrap p-4 flex flex-col justify-between flex-1">
        <div>
          <div className="product-category text-sm text-gray-500">
            <Link href="/shop-grid-right">{item?.category?.label}</Link>
          </div>

          {/* Product Title with fixed height */}
          <h2 className="text-lg font-semibold text-gray-800 mt-1 line-clamp-2 min-h-[3.5rem]">
            <Link href="/shop-product-right">{item?.name}</Link>
          </h2>

          {/* Rating */}
          <div className="product-rate-cover flex items-center mt-2">
            <div>
              <i className="ri-star-fill text-amber-500"></i>
              <i className="ri-star-fill text-amber-500"></i>
              <i className="ri-star-fill text-amber-500"></i>
              <i className="ri-star-fill text-amber-500"></i>
            </div>
            <span className="ml-2 font-small text-xs text-gray-500">(4.0)</span>
          </div>

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
        <div className="product-card-bottom flex items-end justify-between mt-3">
          <div className="product-price flex flex-col">
               {item?.regularPrice && (
              <span className="old-price line-through text-gray-400 ml-2 whitespace-nowrap">
                <em className="not-italic">৳</em> {item?.regularPrice}
              </span>
            )}
            <span className="text-lg font-bold text-green-600 whitespace-nowrap">
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
