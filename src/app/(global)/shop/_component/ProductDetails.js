'use client'
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { productAddToCart } from "../../../../redux/feature/cartSlice";
import Link from 'next/link';
import './style.css'
const ProductDetails = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);
  const [quantity, setQuantity] = useState(0);
  const [readmore, setReadMore] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const handleAddToCart = () => {
    if (quantity < 1) {
      setSnackbar({ open: true, message: 'Quantity should not be zero' });
      return;
    }
    dispatch(productAddToCart({ ...product, quantity }));
    setSnackbar({ open: true, message: 'Added to cart!' });
  };

  return (
    <div className="col-span-6">
     <div className="detail-info">
      <span className="stock-status out-stock">Sale Off</span>
      <h2 className="title-detail text-[40px]">Seeds of Change Organic Quinoa, Brown</h2>

      {/* Product Rating */}
      <div className="product-detail-rating">
        <div className="product-rate-cover text-end">
          <div className="product-rate inline-block">
            <div className="product-rating" style={{ width: "90%" }}></div>
          </div>
          <span className="font-small ml-1 text-muted">(32 reviews)</span>
        </div>
      </div>

      {/* Product Price */}
      <div className="clearfix product-price-cover">
        <div className="product-price primary-color float-left">
          <span className="current-price text-brand">$38</span>
          <span>
            <span className="save-price font-md color3 ml-2">26% Off</span>
            <span className="old-price font-md ml-2">$52</span>
          </span>
        </div>
      </div>

      {/* Short Description */}
      <div className="short-desc mb-[30px]">
        <p className="font-lg">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam rem
          officia, corrupti reiciendis minima nisi modi, quasi, odio minus dolore
          impedit fuga eum eligendi.
        </p>
      </div>

      {/* Size / Weight */}
      <div className="attr-detail attr-size mb-[30px]">
        <strong className="mr-10">Size / Weight: </strong>
        <ul className="list-filter size-filter font-small">
          <li>
            <a href="#">50g</a>
          </li>
          <li className="active">
            <a href="#">60g</a>
          </li>
          <li>
            <a href="#">80g</a>
          </li>
          <li>
            <a href="#">100g</a>
          </li>
          <li>
            <a href="#">150g</a>
          </li>
        </ul>
      </div>

      {/* Quantity & Actions */}
      <div className="detail-extralink mb-[40px]">
        <div className="detail-qty border radius">
          <a href="#" className="qty-down">
            <i className="fi-rs-angle-small-down"></i>
          </a>
          <input
            type="text"
            name="quantity"
            className="qty-val w-full outline-none"
            defaultValue="1"
            min="1"
          />
          <a href="#" className="qty-up">
            <i className="fi-rs-angle-small-up"></i>
          </a>
        </div>

        <div className="product-extra-link2">
          <button type="submit" className="button button-add-to-cart">
            <i className="fi-rs-shopping-cart"></i> Add to cart
          </button>
          <Link
            aria-label="Add To Wishlist"
            className="action-btn hover-up"
            href="/shop-wishlist"
          >
            <i className="fi-rs-heart"></i>
          </Link>
          <Link
            aria-label="Compare"
            className="action-btn hover-up"
            href="/shop-compare"
          >
            <i className="fi-rs-shuffle"></i>
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="font-xs">
        <ul className="mr-[20px] float-start">
          <li className="mb-5">
            Type: <span className="text-brand">Organic</span>
          </li>
          <li className="mb-5">
            MFG:<span className="text-brand"> Jun 4.2024</span>
          </li>
          <li>
            LIFE: <span className="text-brand">70 days</span>
          </li>
        </ul>

        <ul className="float-start">
          <li className="mb-5">
            SKU: <a href="#">FWM15VKT</a>
          </li>
          <li className="mb-5">
            Tags:{" "}
            <a href="#" rel="tag">
              Snack
            </a>
            ,{" "}
            <a href="#" rel="tag">
              Organic
            </a>
            ,{" "}
            <a href="#" rel="tag">
              Brown
            </a>
          </li>
          <li>
            Stock:
            <span className="in-stock text-brand ml-[4px]">8 Items In Stock</span>
          </li>
        </ul>
      </div>
    </div>
    </div>
  );
};

export default ProductDetails;
