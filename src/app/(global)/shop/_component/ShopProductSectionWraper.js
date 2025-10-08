"use client";
import React, { useState } from "react";
import ShopProductSection from "./ShopProductSection";
import TopSearchBar from "./TopSearchBar";

const ShopProductSectionWrapper = ({ initialSearchParams }) => {
  const [searchParams, setSearchParams] = useState(initialSearchParams);

  return (
    <div>
      <TopSearchBar onUpdateParams={(newParams) => setSearchParams((prev) => ({ ...prev, ...newParams }))} />
      {/* Only this server component re-renders on state change */}
      <ShopProductSection searchParams={searchParams} />
    </div>
  );
};

export default ShopProductSectionWrapper;
