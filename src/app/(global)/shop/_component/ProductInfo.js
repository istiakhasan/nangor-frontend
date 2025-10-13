/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import ReviewsTab from './ReviewsTab';

const ProductInfo = ({product}) => {
  const [activeTab, setActiveTab] = useState("Description");

  const tabs = [
    { id: "Description", label: "Description" },
    // { id: "Additional-info", label: "Additional info" },
    // { id: "Vendor-info", label: "Author" },
    // { id: "Reviews", label: "Reviews (3)" },
  ];

  return (
  
      <div>
        {/* --- Tabs --- */}
        <ul className="flex flex-wrap border-b border-gray-300 text-sm font-semibold uppercase nav nav-tabs text-uppercase">
          {tabs.map((tab) => (
            <li key={tab.id} className="mr-2">
              <button
                className={`py-2 px-4 rounded-t-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-gray-100 text-black border-b-2 border-blue-500"
                    : "text-gray-500 hover:text-blue-500"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>

        {/* --- Tab Content --- */}
        <div className="tab-content mt-6">
          {/* Description */}
          {activeTab === "Description" && (
            <div id="Description" className="leading-relaxed text-gray-700"  dangerouslySetInnerHTML={{ __html: product?.htmldescription }}>

            </div>
          )}

          {/* Additional Info */}
          {activeTab === "Additional-info" && (
            <div id="Additional-info">
              <table className="w-full text-left border border-gray-200">
                <tbody>
                  <tr>
                    <th className="p-2 border">Stand Up</th>
                    <td className="p-2 border">35″L x 24″W x 37-45″H</td>
                  </tr>
                  <tr>
                    <th className="p-2 border">Folded (w/o wheels)</th>
                    <td className="p-2 border">32.5″L x 18.5″W x 16.5″H</td>
                  </tr>
                  <tr>
                    <th className="p-2 border">Frame</th>
                    <td className="p-2 border">Aluminum</td>
                  </tr>
                  <tr>
                    <th className="p-2 border">Color</th>
                    <td className="p-2 border">Black, Blue, Red, White</td>
                  </tr>
                  <tr>
                    <th className="p-2 border">Size</th>
                    <td className="p-2 border">M, S</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Vendor Info */}
          {activeTab === "Vendor-info" && (
            <div id="Vendor-info">
              <div className="flex items-center mb-6">
                <img
                  src="https://nest-frontend-v6.vercel.app/assets/imgs/vendor/vendor-18.svg"
                  alt="Vendor"
                  className="w-14 h-14"
                />
                <div className="ml-4">
                  <h6 className="font-semibold text-lg">Noodles Co.</h6>
                  <p className="text-sm text-gray-500">(32 reviews)</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-3">
                  <img
                    src="https://nest-frontend-v6.vercel.app/assets/imgs/theme/icons/icon-location.svg"
                    alt=""
                  />
                  <strong>Address:</strong> 5171 W Campbell Ave, Kent, Utah
                  53127, United States
                </li>
                <li className="flex items-center gap-3">
                  <img
                    src="https://nest-frontend-v6.vercel.app/assets/imgs/theme/icons/icon-contact.svg"
                    alt=""
                  />
                  <strong>Contact Seller:</strong> (+91) - 540-025-553
                </li>
              </ul>
              <div className="flex space-x-6 mt-6">
                <div>
                  <p className="text-blue-500 text-xs">Rating</p>
                  <h4 className="font-bold text-lg">92%</h4>
                </div>
                <div>
                  <p className="text-blue-500 text-xs">Ship on time</p>
                  <h4 className="font-bold text-lg">100%</h4>
                </div>
                <div>
                  <p className="text-blue-500 text-xs">Chat response</p>
                  <h4 className="font-bold text-lg">89%</h4>
                </div>
              </div>
              <p className="mt-6 text-gray-700 leading-relaxed">
                Noodles &amp; Company is an American fast-casual restaurant that
                offers international and American noodle dishes and pasta...
              </p>
            </div>
          )}

          {/* Reviews */}
          {activeTab === "Reviews" && (
            <div id="Reviews">
          <ReviewsTab />
            </div>
          )}
        </div>
      </div>
   
  );
};

export default ProductInfo;
