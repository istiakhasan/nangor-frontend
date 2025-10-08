/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useGetCategoryOptionsQuery } from "../redux/api/categoryApi";
import { useSelector } from "react-redux";
const TopSearchBar = () => {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const pathName=usePathname()
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const dropdownRef = useRef(null);
  const cartItems = useSelector((state) => state.cart);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: categoryData } = useGetCategoryOptionsQuery(undefined);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target )) {
        setCategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set("searchTerm", value);
    else params.delete("searchTerm");

    if (selectedCategory !== "All Categories") {
      const cat = categoryData?.data.find((c) => c.label === selectedCategory);
      if (cat) params.set("categoryId", cat.value);
    } else {
      params.delete("categoryId");
    }
    if(pathName==='/shop'){
      router.push(`/shop/?${params.toString()}`);
    }else{
      router.push(`/?${params.toString()}`);
    }
  };

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat.label);
    const params = new URLSearchParams(searchParams.toString());
    params.set("categoryId", cat.value);
    const searchTerm = searchParams.get("searchTerm");
    if (searchTerm) params.set("searchTerm", searchTerm);
      if(pathName==='/shop'){
      router.push(`/shop/?${params.toString()}`);
    }else{
      router.push(`/?${params.toString()}`);
    }
    setCategoryOpen(false);
  };

  return (
    <div
      style={{ borderBottom: "1px solid rgba(0,0,0,.1)",position:'sticky',top:0,background:"white",zIndex:'1000' }}
      className="flex justify-between items-center py-4 px-4"
    >
      {/* Logo */}
      <img
        className="w-[100px] md:w-auto"
        src="https://nest-frontend-v6.vercel.app/assets/imgs/theme/logo.svg"
        alt="Logo"
      />

      {/* Search bar */}
      <div className="border-[2px] hidden border-[#3BB77E] flex-1 mx-8 md:flex items-center px-4 relative">
        <div className="w-[150px] border-r " ref={dropdownRef}>
          <div
            onClick={() => setCategoryOpen(!categoryOpen)}
            className="text-[#253D4E] font-semibold text-[15px] cursor-pointer"
          >
            {selectedCategory}
          </div>
          {categoryOpen && (
            <div
              style={{ border: "1px solid rgba(0,0,0,.1)" }}
              className="h-[300px] w-[300px] bg-white absolute top-[100%] left-0 p-[15px] z-50"
            >
              <input
                type="text"
                className="border-[#3BB77E] border-[1px] w-full py-3 rounded-[5px] outline-none px-[15px]"
                placeholder="Search category..."
              />
              <ul className="mt-3 overflow-auto h-[200px]">
                {categoryData?.data?.map((cat, i) => (
                  <li
                    key={i}
                    onClick={() => handleCategoryClick(cat)}
                    className="py-3 hover:text-white cursor-pointer hover:bg-[#3BB77E] mb-[1px] px-2"
                  >
                    {cat?.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <input
          className="p-[14px] w-full outline-none flex-1"
          placeholder="Search for item"
          defaultValue={searchParams.get("searchTerm") || ""}
          onChange={handleSearch}
        />
      </div>

      {/* Cart + Account */}
      <div className="text-[16px] flex gap-5">
        {/* Cart */}
        <div className="relative cart_icon">
          <i className="ri-shopping-cart-2-line text-[34px]"></i> <span className="hidden md:inline">Cart</span>
          <span
            className="absolute left-[22px] top-[5px] bg-[#55b477] rounded-full text-white flex items-center justify-center"
            style={{
              width: `${Math.max(20, String(cartItems?.cart?.length).length * 10)}px`,
              height: `${Math.max(20, String(cartItems?.cart?.length).length * 10)}px`,
              fontSize: "10px",
            }}
          >
            {cartItems?.cart?.length}
          </span>

          {/* Dropdown */}
          <div className="cart-dropdown-wrap cart-dropdown-hm2">
            <ul style={{height:"300px"}} className="overflow-y-scroll">
              {cartItems?.cart?.map((c, i) => {
              
                return (
                  <li key={i} className="flex items-center gap-3">
                    <span className="shopping-cart-img">
                      <Link href={`/shop-product/${c?.id}`}>
                        <img alt={c?.name} src={c?.images[0]?.url} />
                      </Link>
                    </span>
                    <span className="shopping-cart-title">
                      <h4>
                        <Link href={`/shop-product/${c?.id}`}>
                          {c?.name}
                        </Link>
                      </h4>
                      <h4>
                        <span>{c.quantity} × </span>৳{c?.salePrice}
                      </h4>
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="shopping-cart-footer">
              <div className="shopping-cart-total">
                <h4>
                  Total <span>৳{cartItems?.total}</span>
                </h4>
              </div>
              <div className="shopping-cart-button">
                <Link href="/cart" className="outline">
                  View cart
                </Link>
                <Link href="/checkout">Checkout</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Account */}
        <span>
          <i className="ri-user-line text-[34px]"></i><span className="hidden md:inline">Account</span>
        </span>
      </div>
    </div>
  );
};

export default TopSearchBar;
