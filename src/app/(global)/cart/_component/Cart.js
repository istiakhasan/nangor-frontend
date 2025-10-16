/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementQuantityByInput,
  removeToCart,
  clearCart,
} from "../../../../redux/feature/cartSlice";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  // Calculate total items
  const totalItems = cartItems?.cart?.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Calculate subtotal
  const subtotal = cartItems?.cart?.reduce(
    (total, item) => total + item.salePrice * item.quantity,
    0
  );

  return (
    <main className=" bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className=" mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8 p-4 bg-white rounded-lg shadow-sm">
          <div className="flex items-center text-sm text-gray-600">
            <Link
              href="/"
              className="flex items-center hover:text-[#4d321d] transition-colors"
            >
              <i className="ri-home-3-line mr-1"></i> Home
            </Link>
            <i className="ri-arrow-right-s-line mx-2"></i>
            <span>Shop</span>
            <i className="ri-arrow-right-s-line mx-2"></i>
            <span className="font-medium text-gray-900">Cart</span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Your Cart
            </h1>
            <p className="mt-2 text-gray-600">
              There are{" "}
              <span className="font-semibold text-[#4d321d]">{totalItems}</span>{" "}
              products in your cart
            </p>
          </div>
          <button
            onClick={() => dispatch(clearCart())}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors shadow-sm"
          >
            <i className="ri-delete-bin-line"></i> Clear Cart
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            {cartItems?.cart?.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <i className="ri-shopping-cart-line text-3xl text-gray-400"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-600 mb-6">
                  Add some products to your cart
                </p>
                <Link
                  href="/"
                  className="inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Subtotal
                        </th>
                        <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Remove
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {cartItems?.cart.map((product, idx) => (
                        <tr
                          key={idx}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-4 px-6">
                            <div className="flex items-center">
                              <img
                                src={product?.images[0]?.url}
                                alt={product?.name}
                                className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                              />
                              <div className="ml-4">
                                <h3 className="text-lg font-medium text-gray-900">
                                  {product?.name}
                                </h3>
                                <p className="text-lg text-gray-500 mt-1">
                                  {product?.category?.label}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-lg font-medium text-gray-900">
                              BDT {Number(product?.salePrice)?.toFixed(2)}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex justify-center">
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
                                className="w-16 px-3 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                type="number"
                              />
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-lg font-medium text-[#4d321d]">
                              BDT{" "}
                              {(product?.salePrice * product?.quantity).toFixed(
                                2
                              )}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <button
                              onClick={() =>
                                dispatch(removeToCart({ index: idx }))
                              }
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <i className="ri-delete-bin-line text-lg"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden divide-y divide-gray-200">
                  {cartItems?.cart.map((product, idx) => (
                    <div key={idx} className="p-4">
                      <div className="flex items-start">
                        <img
                          src={product.images[0]?.url}
                          alt={product?.name}
                          className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                        />
                        <div className="ml-4 flex-1">
                          <h3 className="text-base font-medium text-gray-900">
                            {product?.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            ${Number(product?.salePrice).toFixed(2)}
                          </p>

                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() =>
                                  dispatch(
                                    incrementQuantityByInput({
                                      value: product.quantity - 1,
                                      index: idx,
                                    })
                                  )
                                }
                                className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                disabled={product.quantity <= 1}
                              >
                                <i className="ri-subtract-line"></i>
                              </button>
                              <span className="px-3 py-1 text-center w-8">
                                {product.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  dispatch(
                                    incrementQuantityByInput({
                                      value: product.quantity + 1,
                                      index: idx,
                                    })
                                  )
                                }
                                className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                              >
                                <i className="ri-add-line"></i>
                              </button>
                            </div>

                            <button
                              onClick={() =>
                                dispatch(removeToCart({ index: idx }))
                              }
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <i className="ri-delete-bin-line text-lg"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                        <span className="text-sm text-gray-600">Subtotal:</span>
                        <span className="text-base font-medium text-[#4d321d]">
                          <span className="text-[18px]">৳</span>
                          {(product?.salePrice * product?.quantity)?.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Cart Totals */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    <span>BDT</span>
                    {subtotal?.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-lg">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-base font-medium text-gray-900">
                      Total
                    </span>
                    <span className="text-xl font-bold text-[#4d321d]">
                      BDT: {subtotal?.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Desktop Checkout Button */}
              <div className="hidden md:block">
                <button
                  onClick={() => router.push("/checkout")}
                  disabled={cartItems.cart.length === 0}
                  className={`mt-8 w-full py-3 px-4 rounded-lg cursor-pointer font-medium transition-colors ${
                    cartItems.cart.length === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#4d321d] text-white hover:bg-[#3a2414] shadow-md hover:shadow-lg"
                  }`}
                >
                  Proceed to Checkout
                  <i className="ri-arrow-right-line ml-2"></i>
                </button>

                <div className="mt-6 text-center">
                  <Link
                    href="/"
                    className="inline-flex items-center text-sm text-[#4d321d] hover:text-indigo-800"
                  >
                    <i className="ri-arrow-left-line mr-1"></i> Continue
                    Shopping
                  </Link>
                </div>
              </div>

              {/* Mobile Fixed Checkout Button */}
              <div className="md:hidden fixed bottom-[65px] left-0 right-0 bg-white border-t border-gray-200  shadow-lg z-[9999]">
                <button
                  onClick={() => router.push("/checkout")}
                  disabled={cartItems.cart.length === 0}
                  className={`w-full py-4 px-4   font-bold transition-colors ${
                    cartItems.cart.length === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#4d321d] text-white hover:bg-[#3a2414]"
                  }`}
                >
                  Proceed to Checkout
                  <i className="ri-arrow-right-line ml-2"></i>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
