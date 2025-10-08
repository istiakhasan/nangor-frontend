"use client";

import Link from "next/link";

const ArchiveHeader = () => {
  return (
    <div className="p-[20px]">
          <div className="archive-header">
      <div className="flex flex-wrap items-center">
        {/* Left Column */}
        <div className="w-full xl:w-1/4 mb-4 xl:mb-0">
          <h1 className="mb-4 text-[48px]">Snack</h1>
          <div className="breadcrumb flex items-center space-x-2">
            <Link href="/" rel="nofollow" className="flex items-center gap-1">
              <i className="ri-home-line mr-1"></i> Home
            </Link>
            <span>/</span>
            <span>Shop</span>
            <span>/</span>
            <span>Snack</span>
          </div>
        </div>

        {/* Right Column - Tags */}
        <div className="w-full xl:w-3/4 text-right hidden xl:block">
          <ul className="tags-list flex flex-wrap justify-end gap-2">
            {["Cabbage", "Broccoli", "Artichoke", "Celery", "Spinach"].map(
              (tag, index) => (
                <li
                  key={tag}
                  className={`hover-up ${tag === "Broccoli" ? "active" : ""}`}
                >
                  <Link
                    href="/blog-category-grid"
                    className="flex items-center gap-2"
                  >
                    <i className="ri-close-line mr-2"></i> {tag}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ArchiveHeader;
