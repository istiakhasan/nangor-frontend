/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import "./ImageSliderWithZoom.css";
import "react-image-gallery/styles/css/image-gallery.css";
import ReactImageGallery from "react-image-gallery";
import { ZoomIn, ZoomOut } from "lucide-react";

const ImageSliderWithZoom = ({ images }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleImageClick = () => {
    setIsZoomed((prev) => !prev);
  };

  return (
    <div className="image-viewer-container"  style={{ maxWidth: "480px", margin: "0 auto" }}>
      <div className={`image-gallery-wrapper ${isZoomed ? "zoomed" : ""}`}>
        <ReactImageGallery
          items={images}
          showPlayButton={false}
          showFullscreenButton={false}
          showBullets={false}
          slideInterval={4000}
          lazyLoad={true}
          showNav={true}
          renderLeftNav={(onClick, disabled) => (
            <button
              type="button"
              className="custom-left-nav"
              onClick={onClick}
              disabled={disabled}
            >
              <i className="ri-arrow-left-s-line"></i>
            </button>
          )}
          renderRightNav={(onClick, disabled) => (
            <button
              type="button"
              className="custom-right-nav"
              onClick={onClick}
              disabled={disabled}
            >
              <i className="ri-arrow-right-s-line"></i>
            </button>
          )}
          renderItem={(item) => (
            <div className="image-gallery-image-wrapper" onClick={handleImageClick}>
              <img
                src={item.original}
                alt={item.originalAlt}
                className={`main-image ${isZoomed ? "zoomed" : ""}`}
              />
              <button className="zoom-btn" onClick={handleImageClick}>
                {isZoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
              </button>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default ImageSliderWithZoom;
