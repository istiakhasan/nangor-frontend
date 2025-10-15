"use client";

import Link from "next/link";
import React from "react";

const Pagination = ({ totalPages = 1, currentPage = 1, basePath = "/" }) => {
  if (totalPages <= 1) return null;

  const activePage = Number(currentPage); // ensure number

  // Generate page numbers with ellipsis
  const getPages = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (activePage > 4) pages.push("...");
      const start = Math.max(2, activePage - 1);
      const end = Math.min(totalPages - 1, activePage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (activePage < totalPages - 3) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const pages = getPages();
  return (
    <div className="pagination-area mt-5 mb-5 flex justify-center">
      <nav aria-label="Page navigation">
        <ul className="flex space-x-2">
          {/* Previous */}
          <li>
            {activePage > 1 ? (
              <Link
                href={`${basePath}?page=${activePage - 1}`}
                className="page-link flex items-center justify-center w-8 h-8 border rounded hover:bg-gray-100"
              >
                <i className="ri-arrow-left-s-line text-lg"></i>
              </Link>
            ) : (
              <span className="page-link flex items-center justify-center w-8 h-8 border rounded opacity-50 cursor-not-allowed">
                <i className="ri-arrow-left-s-line text-lg"></i>
              </span>
            )}
          </li>

          {/* Page numbers */}
          {pages.map((page, idx) =>
            page === "..." ? (
              <li key={idx}>
                <span className="page-link flex items-center justify-center w-8 h-8 cursor-default">
                  {page}
                </span>
              </li>
            ) : (
              <li key={idx}>
                <Link
                 style={Number(page) === activePage? {background:"#4d321d",color:"white"}:{}}
                  href={`${basePath}?page=${page}`}
                  className={`page-link flex items-center justify-center w-8 h-8 border rounded hover:bg-gray-100 ${
                    Number(page) === activePage
                      ? "bg-[#4d321d] text-white border-green-500"
                      : "bg-white text-black"
                  }`}
                >
                  {page}
                </Link>
              </li>
            )
          )}

          {/* Next */}
          <li>
            {activePage < totalPages ? (
              <Link
                href={`${basePath}?page=${activePage + 1}`}
                className="page-link flex items-center justify-center w-8 h-8 border rounded hover:bg-gray-100"
              >
                <i className="ri-arrow-right-s-line text-lg"></i>
              </Link>
            ) : (
              <span className="page-link flex items-center justify-center w-8 h-8 border rounded opacity-50 cursor-not-allowed">
                <i className="ri-arrow-right-s-line text-lg"></i>
              </span>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
