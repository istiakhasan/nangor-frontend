/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React from "react";
import "./cart.css";
import { useDispatch, useSelector } from "react-redux";
import { 
  incrementQuantityByInput,
  removeToCart,
  clearCart
} from "../../../../redux/feature/cartSlice";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const router=useRouter()
  return (
    <main className="main md:p-[20px]">
      {/* Breadcrumb */}
      <div className="page-header breadcrumb-wrap">
        <div className=" mx-auto ">
          <div className="breadcrumb flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <i className="ri-home-3-line"></i> Home
            </Link>
            <span><i className="ri-arrow-right-s-line"></i></span>
            Shop
            <span><i className="ri-arrow-right-s-line"></i></span>
            Cart
          </div>
        </div>
      </div>

      <div className=" mx-auto mb-20 mt-12 px-4">
        {/* Header */}
        <div className="flex flex-wrap -mx-4 mb-10">
          <div className="w-full lg:w-2/3 mb-10 lg:mb-0 px-4">
            <h1 className="mb-2 text-[48px]">Your Cart</h1>
            <div className="flex justify-between">
              <h6 className="text-body">
                There are <span className="text-brand">{cartItems.cart.length}</span> products in your cart
              </h6>
              <h6 className="text-body">
                <button 
                  onClick={() => dispatch(clearCart())} 
                  className="text-muted flex items-center gap-2"
                >
                  <i className="ri-delete-bin-line"></i> Clear Cart
                </button>
              </h6>
            </div>
          </div>
        </div>

        {/* Cart Table */}
        <div className="md:grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <div className="custom_border_table">
              <table className="w-full table-auto border-collapse border-spacing-5">
                <thead>
                  <tr className="bg-gray-100">
                    <th style={{fontSize:"10px"}} className="pl-8"><input type="checkbox" className="form-check-input" /></th>
                    <th style={{fontSize:"10px"}} colSpan="2" className="text-left">Product</th>
                    <th style={{fontSize:"10px"}} className="text-left">Unit Price</th>
                    <th style={{fontSize:"10px"}} className="text-center">Quantity</th>
                    <th style={{fontSize:"10px"}} className="text-left">Subtotal</th>
                    <th style={{fontSize:"10px"}} className="text-center">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems?.cart?.map((product, idx) => (
                    <tr key={idx} style={{ border: "1px solid rgba(0,0,0,.1)" }}>
                      <td className="pl-8">
                        <input type="checkbox" className="form-check-input" />
                      </td>
                      <td>
                        <img
                          src={product.images[0]?.url}
                          alt={product?.name}
                          className="md:w-20 w-[30px] h-[30px] md:h-20 object-cover"
                        />
                      </td>
                      <td>
                        <h6 className="mb-2">
                          <a href="#" className="text-heading">
                            {product?.name}
                          </a>
                        </h6>
                      </td>
                      <td>
                        <h4 className="text-body">{product?.salePrice}</h4>
                      </td>
                      <td>
                        <input
                          value={product?.quantity}
                          min={1}
                          onChange={(e) =>
                            dispatch(
                              incrementQuantityByInput({
                                value: e.target.value,
                                index: idx,
                              })
                            )
                          }
                          className="border border-[#4d321d] w-[60px] px-[10px] py-2 rounded-[4px] outline-0 "
                          type="number"
                        />
                      </td>
                      <td className="text-brand">
                        <h4 className="text-brand">
                          {product?.salePrice * product?.quantity}
                        </h4>
                      </td>
                      <td className="text-center">
                        <button 
                          onClick={() => dispatch(removeToCart({ index: idx }))}
                          className="text-body cursor-pointer"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Cart Totals */}
          <div>
            <div className="custom_border p-[30px] rounded-[4px] cart-totals">
              <div className="custom_border_table">
                <table>
                  <tbody>
                    <tr>
                      <td className="cart_total_label">
                        <h6 className="text-muted">Subtotal</h6>
                      </td>
                      <td className="cart_total_amount">
                        <h4 className="text-brand text-end">{cartItems?.total}</h4>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2"><div className="divider-2 mt-10 mb-10"></div></td>
                    </tr>
                    <tr>
                      <td className="cart_total_label">
                        <h6 className="text-muted">Shipping</h6>
                      </td>
                      <td className="cart_total_amount">
                        <h5 className="text-heading text-end">Free</h5>
                      </td>
                    </tr>
                    <tr>
                      <td className="cart_total_label">
                        <h6 className="text-muted">Total</h6>
                      </td>
                      <td className="cart_total_amount">
                        <h4 className="text-brand text-end">{cartItems?.total}</h4>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button onClick={()=>router.push('/checkout')} className="btn w-full mt-4">
                Proceed To CheckOut<i className="fi-rs-sign-out ml-15"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
