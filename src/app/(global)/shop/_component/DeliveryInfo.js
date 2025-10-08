/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DeliveryInfo = () => {
  // React Slick settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="col-span-3">
      <div
        style={{
          border: "1px solid rgba(0,0,0,.1)",
          borderRadius: "4px",
          padding: "10px",
        }}
      >
        <p className="cm_color mb-0">
          <i className="fa fa-location-dot"></i> Deliver to Chandigarh 160047
        </p>
        <p
          className="mb-0"
          style={{ fontSize: "14px", color: "black", fontWeight: "bold" }}
        >
          IN STOCK
        </p>

        <p
          style={{ fontSize: "12px" }}
          className="flex justify-content-between w-75 mb-0"
        >
          <span>Ships From</span>
          <span className="text-black">Sindhu Plaza</span>
        </p>
        <p
          style={{ fontSize: "12px" }}
          className="flex justify-content-between w-75 mb-0"
        >
          <span>Sold By</span>
          <span className="text-black">Tareq Jamil</span>
        </p>
        <p
          style={{ fontSize: "12px" }}
          className="flex justify-content-between w-75 mb-0"
        >
          <span>City</span>
          <span className="text-black">New Yourk</span>
        </p>
        <p
          style={{ fontSize: "12px" }}
          className="flex justify-content-between w-75 mb-0"
        >
          <span>State</span>
          <span className="text-black">California</span>
        </p>

        {/* Offers */}
        <p
          className="mb-0"
          style={{ fontSize: "14px", color: "black", fontWeight: "bold" }}
        >
          Offers
        </p>

        <div className="row mx-0">
          <div className="col-md-6 px-0">
            <div
              className="me-1"
              style={{
                border: "1px solid rgba(0,0,0,.1)",
                borderRadius: "4px",
                padding: "10px",
              }}
            >
              <p
                className="mb-0"
                style={{ fontSize: "10px", color: "black", fontWeight: "bold" }}
              >
                Bank Offer
              </p>
              <p className="mb-0" style={{ fontSize: "10px", color: "black" }}>
                10% Instant Discount up to INR 300 on Federal Bank C...
              </p>
            </div>
          </div>

          <div className="col-md-6 px-0">
            <div
              style={{
                border: "1px solid rgba(0,0,0,.1)",
                borderRadius: "4px",
                padding: "10px",
              }}
            >
              <p
                className="mb-0"
                style={{ fontSize: "10px", color: "black", fontWeight: "bold" }}
              >
                Partner Offer
              </p>
              <p className="mb-0" style={{ fontSize: "10px", color: "black" }}>
                10% Instant Discount up to INR 300 on Federal Bank C...
              </p>
            </div>
          </div>
        </div>

        {/* Slider Section */}
        <div className="my-4">
          <Slider {...settings}>
            {/* Slide 1 */}
            <div>
              <div className="flex flex-col items-center justify-center">
                <img
                  width="35"
                  height="35"
                  src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/trust_icon_free_shipping_81px._CB630870460_.png"
                  alt="Free Delivery"
                />
                <p
                  style={{ lineHeight: "15px" }}
                  className="cm_color text-center"
                >
                  <small>Free Delivery</small>
                </p>
              </div>
            </div>

            {/* Slide 2 */}
            <div>
              <div className="flex flex-col justify-center items-center">
                <img
                  width="35"
                  height="35"
                  src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-returns._CB484059092_.png"
                  alt="Non Returnable"
                />
                <p
                  style={{ lineHeight: "15px" }}
                  className="cm_color text-center"
                >
                  <small>Non Returnable</small>
                </p>
              </div>
            </div>

            {/* Slide 3 */}
            <div>
              <div className="flex flex-col justify-center items-center">
                <img
                  width="35"
                  height="35"
                  src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-returns._CB484059092_.png"
                  alt="Sindhu Delivery"
                />
                <p
                  style={{ lineHeight: "15px" }}
                  className="cm_color text-center"
                >
                  <small>Sindhu Delivery</small>
                </p>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;
