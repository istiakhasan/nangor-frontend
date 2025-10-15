"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
const SidebarCategory = ({ categoryData }) => {
   const pathName=usePathname()
  const searchParams = useSearchParams();
  const router = useRouter();
  const handleCategoryClick = (cat) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("categoryId", cat.value);
    const searchTerm = searchParams.get("searchTerm");
    if (searchTerm) params.set("searchTerm", searchTerm);
      if(pathName==='/shop'){
      router.push(`/shop/?${params.toString()}`);
    }else{
      router.push(`/?${params.toString()}`);
    }
  };
  return (
    <div className="sidebar-widget widget-category-2 md:mb-[20px]">
      <h5 className="section-title style-1 md:mb-[20px] mb-6">Category</h5>
      <ul>
        {categoryData?.map((category, index) => (
          <li
            onClick={() => handleCategoryClick(category)}
            className="cursor-pointer"
            key={index}
          >
            <a className="flex items-center gap-2">
              {/* <Image src={category?.icon} alt={category?.name} width={20} height={20} /> */}
              {category?.label}
            </a>
            <span className="count">{category?.productCount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarCategory;
