import React from "react";
import ProductCard from "./ProductCard";
import SidebarCategory from "./FilterCategoryCard";
import FillByPrice from "./FillbyPrice";
import NewProducts from "./NewProducts";
import { getBaseUrl } from "../helpers/config/envConfig";
import Link from "next/link";
async function getProducts({
  page,
  limit,
  categoryId,
  searchTerm,
  authorIds, // currently a comma-separated string
  salesPriceMin,
  salesPriceMax,
}) {

  let url = `${getBaseUrl()}/products?limit=${limit}&page=${page}`;
  if (categoryId) url += `&categoryId=${categoryId}`;
  if (searchTerm) url += `&searchTerm=${searchTerm}`;
  if (authorIds?.length > 0) {
    authorIds.forEach((id) => {
      url += `&authorIds=${id}`; // send each ID separately
    });
  }
  if (salesPriceMin != null) url += `&salesPriceMin=${salesPriceMin}`;
  if (salesPriceMax != null) url += `&salesPriceMax=${salesPriceMax}`;

  console.log(url, "url");
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

const ProductSection = async ({ searchParams }) => {
  const resolvedSearchParams = await searchParams;
  const categoryId = resolvedSearchParams?.categoryId || "";
    let authorIds = [];
  if (resolvedSearchParams?.authorIds) {
     const mdar=resolvedSearchParams?.authorIds?.split(',')
     if(mdar?.length>0){
      authorIds=mdar
     }else{
      authorIds=[resolvedSearchParams?.authorIds]
     }
  }
  const searchTerm = resolvedSearchParams?.searchTerm || "";
  const salesPriceMin = resolvedSearchParams?.salesPriceMin
    ? Number(resolvedSearchParams.salesPriceMin)
    : null;
  const salesPriceMax = resolvedSearchParams?.salesPriceMax
    ? Number(resolvedSearchParams.salesPriceMax)
    : null;

  const sanitizedCategoryId =
    categoryId && categoryId !== "undefined" ? categoryId : null;
  const sanitizedSearchTerm =
    searchTerm && searchTerm !== "undefined" ? searchTerm : null;

  const [products, categories] = await Promise.all([
    getProducts({
      page: 1,
      limit: 15,
      categoryId: sanitizedCategoryId,
      searchTerm: sanitizedSearchTerm,
      authorIds,
      salesPriceMin,
      salesPriceMax,
    }),
    getCategories(),
  ]);

  const css =
    "hover:text-[#29A56C] hover:cursor-pointer text-[16px] mr-[30px] hover:-translate-y-[3px] transition-transform duration-200";

  return (
    <div className="p-[20px] md:grid grid-cols-4 gap-5">
      <div className="col-span-3">
        <div className="flex flex-wrap  justify-between mb-6">
          <h3 className="text-[32px] font-bold mb-6 md:mb-0">Popular Books</h3>
          <ul className="flex">
            <li>
              <Link
                href="/"
                className={`${
                  !categoryId ? "text-[#29A56C]" : "text-[#253D4E]"
                } ${css}`}
              >
                All
              </Link>
            </li>
            {categories?.data?.map((item) => {
              // Convert searchParams to a plain object
              const paramsObj = {};
              if (resolvedSearchParams) {
                Object.keys(resolvedSearchParams).forEach((key) => {
                  const value = resolvedSearchParams[key];
                  if (typeof value === "string") paramsObj[key] = value; // only keep string values
                });
              }

              // Set the new categoryId
              paramsObj.categoryId = item.value;

              // Convert to query string
              const queryString = new URLSearchParams(paramsObj).toString();

              return (
                <li key={item.value}>
                  <Link
                    href={`/?${queryString}`}
                    className={`${
                      categoryId == item.value
                        ? "text-[#29A56C]"
                        : "text-[#253D4E]"
                    } ${css}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="grid md:grid-cols-5 grid-cols-1 gap-3">
          {products?.data?.map((item, index) => (
            <ProductCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>

      <div>
        <SidebarCategory categoryData={categories?.data} />
        <FillByPrice />
        <NewProducts />
      </div>
    </div>
  );
};

export default ProductSection;
