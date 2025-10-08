"use client";
import React, { useState } from "react";

const TopSearchBar = ({ onUpdateParams }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryId, setCategoryId] = useState(null);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onUpdateParams({ searchTerm: value, page: 1 });
  };

  const handleCategoryChange = (catId) => {
    setCategoryId(catId);
    onUpdateParams({ categoryId: catId, page: 1 });
  };

  return (
    <div className="flex gap-4 py-4 px-4 border-b">
      <input
        placeholder="Search for item"
        value={searchTerm}
        onChange={handleSearchChange}
        className="p-2 border"
      />
      <select value={categoryId || ""} onChange={(e) => handleCategoryChange(e.target.value)}>
        <option value="">All Categories</option>
        <option value="1">Category 1</option>
        <option value="2">Category 2</option>
      </select>
    </div>
  );
};

export default TopSearchBar;
