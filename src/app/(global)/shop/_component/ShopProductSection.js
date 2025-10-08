/* eslint-disable @next/next/no-img-element */


import React from "react";
import SortDropdown from "./SortDropdown";
import Pagination from "./Pagination";
import ProductCard from "../../../../component/ProductCard";
import SidebarCategory from "../../../../component/FilterCategoryCard";
import NewProducts from "../../../../component/NewProducts";
import { getBaseUrl } from "../../../../helpers/config/envConfig";
import FillByPrice from "../../../../component/FillbyPrice";

async function getProducts({
  page,
  limit,
  categoryId,
  searchTerm,
  salesPriceMin,
  salesPriceMax,
}) {
  let url = `${getBaseUrl()}/products?limit=${limit}&page=${page}`;
  if (categoryId) url += `&categoryId=${categoryId}`;
  if (searchTerm) url += `&searchTerm=${searchTerm}`;
  if (salesPriceMin != null) url += `&salesPriceMin=${salesPriceMin}`;
  if (salesPriceMax != null) url += `&salesPriceMax=${salesPriceMax}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

async function getCategories() {
  const res = await fetch(`${getBaseUrl()}/category/options?limit=4&page=1`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

const ShopProductSection = async ({ searchParams }) => {
  const page = parseInt(searchParams?.page || "1", 10);
  const limit = 5;

  const categoryId =
    searchParams?.categoryId && searchParams.categoryId !== "undefined"
      ? searchParams.categoryId
      : null;

  const searchTerm =
    searchParams?.searchTerm && searchParams.searchTerm !== "undefined"
      ? searchParams.searchTerm
      : null;

  const salesPriceMin = searchParams?.salesPriceMin
    ? Number(searchParams.salesPriceMin)
    : null;

  const salesPriceMax = searchParams?.salesPriceMax
    ? Number(searchParams.salesPriceMax)
    : null;

  // fetch products and categories in parallel
  const [products, categories] = await Promise.all([
    getProducts({ page, limit, categoryId, searchTerm, salesPriceMin, salesPriceMax }),
    getCategories(),
  ]);

  const totalPages = Math.ceil(products?.meta?.total / limit);

  return (
    <div className="p-[20px] grid grid-cols-5 gap-5">
      <div className="col-span-4">
        <div className="shop-product-fillter">
          <div className="totall-product">
            <p>
              We found <strong className="text-brand">{products?.meta?.total}</strong> items for you!
            </p>
          </div>
          <SortDropdown />
        </div>

        <div className="grid grid-cols-5 gap-3">
          {products?.data?.map((item, index) => (
            <ProductCard key={item.id} item={item} index={index} />
          ))}

          {/* Pagination */}
          <div className="col-span-5">
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              basePath="/shop"
            />
          </div>
        </div>
      </div>

      <div className="sticky top-0 h-fit">
        <SidebarCategory categoryData={categories?.data} />
        <FillByPrice page="shop" />
        <NewProducts />

        <div
          className="banner-img wow fadeIn mb-lg-0 animated"
          style={{ visibility: "visible" }}
        >
          <img
            src="https://nest-frontend-v6.vercel.app/assets/imgs/banner/banner-11.png"
            alt="Banner"
          />
          <div className="banner-text">
            <span>Organic</span>
            <h4>
              Save 17% <br />
              on <span className="text-brand">Organic</span>
              <br />
              Juice
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopProductSection;
