"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

const Dropdown = ({ options, defaultValue, className }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(
    options.find((o) => o.value === defaultValue) || options[0]
  );

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
  };

  return (
    <li className={`relative list-none ${className || ""}`}>
      <button
        onClick={() => setOpen(!open)}
        className="language-dropdown-active flex items-center gap-1 cursor-pointer"
      >
        {selected.icon && <img src={selected.icon} alt="" className="w-4 h-4" />}
        {selected.label} <i className="fi-rs-angle-small-down"></i>
      </button>

      {open && (
        <ul className="absolute right-0 bg-white shadow-md rounded-md mt-2 w-32 z-50">
          {options.map((opt) => (
            <li key={opt.value}>
              <button
                onClick={() => handleSelect(opt)}
                className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100"
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

const HeaderTop = () => {
  const languageOptions = [
    { value: "en", label: "English" },
    { value: "fr", label: "Français" },
    { value: "de", label: "Deutsch" },
    { value: "ru", label: "Pусский" },
  ];

  const currencyOptions = [
    { value: "usd", label: "USD" },
    { value: "inr", label: "INR" },
    { value: "mbp", label: "MBP" },
    { value: "eu", label: "EU" },
  ];

  return (
    <div  style={{ color: "rgb(126, 126, 126)",borderBottom:"1px solid rgba(0,0,0,.1)" }} className="py-2 text-[13px] px-4">
      <div>
        <div className="flex justify-between">
          {/* Left side links */}
          <div className="header-info">
            <ul className="flex gap-3 ">
              <li><a href="page-about.html">About Us</a></li>
              <li><a href="page-account.html">My Account</a></li>
              <li><a href="shop-wishlist.html">Wishlist</a></li>
              <li><a href="shop-order.html">Order Tracking</a></li>
            </ul>
          </div>

          {/* Right side info */}
          <div className="header-info header-info-right">
            <ul className="flex gap-3">
              <li>
                Need help? Call Us:
                <strong className="text-brand text-[#3bb77e]"> + 1800 900</strong>
              </li>
              <Dropdown options={languageOptions} defaultValue="en" />
              <Dropdown options={currencyOptions} defaultValue="usd" />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
