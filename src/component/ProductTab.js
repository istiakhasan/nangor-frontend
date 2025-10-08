/* eslint-disable @next/next/no-img-element */
import { getBaseUrl } from "../helpers/config/envConfig";
import React from "react";


const ProductSection = ({ title, products }) => (
  <div className="product-sidebar mb-[10px] bg-grey border-radius-10">
    <h5 className="section-title style-1 mb-[20px]">{title}</h5>
    {products.map((item) => (
      <div
        key={item.id}
        className="single-post hide clearfix hover:-translate-y-[3px] transition-transform duration-200"
      >
        <div className="image">
          <img src={item.images[0]?.url} alt={item.name} />
        </div>
        <div className="content">
          <h5>
            <a className="hover:text-[#3BB77E]" href="shop-product-detail.html">
              {item.name}
            </a>
          </h5>
          <p className="price mb-0 mt-5">{item.salePrice}</p>
          <div className="product-rate">
            <div className="product-rating" style={{ width: "90%" }}></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// Fetch products by badge
async function fetchProducts(badge, limit = 3, page = 1) {
  const res = await fetch(`${getBaseUrl()}/products?limit=${limit}&page=${page}&badge=${badge}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Failed to fetch ${badge} products`);
  const data = await res.json();
  return data.data;
}

const ProductTab = async () => {
  // Fetch all product types in parallel
  const [saleProducts, trendingProducts, newProducts, topProducts] = await Promise.all([
    fetchProducts("Sale"),
    fetchProducts("Trending"),
    fetchProducts("New"),
    fetchProducts("Top"),
  ]);

  return (
    <div className="md:grid grid-cols-4 gap-3 p-[20px]">
      <ProductSection title="Top selling" products={saleProducts} />
      <ProductSection title="Trending products" products={trendingProducts} />
      <ProductSection title="Recently added" products={newProducts} />
      <ProductSection title="Top products" products={topProducts} />
    </div>
  );
};

export default ProductTab;
