/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import "./checkout.css";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useCreateOrderMutation } from "../../../../redux/api/orderApi";
import { useState } from "react";
import { clearCart } from "../../../../redux/feature/cartSlice";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const [orderCreateHandler] = useCreateOrderMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      receiverPhoneNumber: "",
      receiverName: "",
      shippingCharge: "70",
      orderSource: "Website",
      currier: "",
      deliveryNote: "",
      paymentMethod: "Cash on delivery",
      statusId: 1,
      deliveryDate: "",
      paymentStatus: "Pending",
      discount: 0,
      shippingType: "Regular",
      orderType: "Regular",
      receiverDivision: "",
      receiverDistrict: "",
      receiverThana: "",
      receiverAddress: "",
      products:
        cartItems?.cart?.map((item) => ({
          productId: item?.id || item?.productId,
          productQuantity: item?.quantity,
        })) || [],
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await orderCreateHandler(data).unwrap();
      if (res) {
        setSnackbarOpen({
          open: true,
          message: "Order placed successfully!",
          severity: "success",
        });
        setIsModalOpen(true);
        reset();
        dispatch(clearCart());
      }
    } catch (error) {
      // console.error("Order creation failed:", error);

      // Extract backend error message
      const errorMessage =
        error?.data?.message ||
        error?.data?.errorMessages?.[0]?.message ||
        "Something went wrong! Please try again.";

      // Show error Snackbar
      setSnackbarOpen({
        open: true,
        message: errorMessage,
        severity: "error",
      });

      // Optional: redirect to login if unauthorized
      // if (errorMessage.includes("not authorized")) {
      //   setTimeout(() => {
      //     router.push("/login");
      //   }, 2000);
      // }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSnackbarClose = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen({ open: false, message: "", severity: "success" });
  };

  return (
    <main className="main bg-gray-50 p-4 md:p-8">
      {/* Snackbar Notification */}
      <Snackbar
        open={snackbarOpen.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarOpen.severity}
          variant="filled"
          sx={{
            width: "100%",
            backgroundColor:
              snackbarOpen.severity === "success" ? "#4d321d" : "#b91c1c",
          }}
        >
          {snackbarOpen.message}
        </Alert>
      </Snackbar>

      {/* Breadcrumb */}
      <div className="page-header breadcrumb-wrap mb-6">
        <div className="container mx-auto">
          <div className="breadcrumb text-sm text-gray-600">
            <Link
              href="/"
              rel="nofollow"
              className="text-[#4d321d] hover:underline"
            >
              <i className="fi-rs-home mr-2"></i>Home
            </Link>
            <span className="mx-2">/</span> Shop
            <span className="mx-2">/</span> Checkout
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="container mx-auto mb-12 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6 text-[#4d321d]">
                Billing Details
              </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Name & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      {...register("receiverName", { required: true })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d321d]"
                    />
                    {errors.receiverName && (
                      <span className="text-red-500 text-sm mt-1">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      {...register("receiverPhoneNumber", { required: true })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d321d]"
                    />
                    {errors.receiverPhoneNumber && (
                      <span className="text-red-500 text-sm mt-1">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium">
                    Address *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your address"
                    {...register("receiverAddress", { required: true })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d321d]"
                  />
                  {errors.receiverAddress && (
                    <span className="text-red-500 text-sm mt-1">
                      This field is required
                    </span>
                  )}
                </div>

                {/* Division/District/Thana */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      Division *
                    </label>
                    <input
                      type="text"
                      placeholder="Division"
                      {...register("receiverDivision", { required: true })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d321d]"
                    />
                    {errors.receiverDivision && (
                      <span className="text-red-500 text-sm mt-1">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      District *
                    </label>
                    <input
                      type="text"
                      placeholder="District"
                      {...register("receiverDistrict", { required: true })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d321d]"
                    />
                    {errors.receiverDistrict && (
                      <span className="text-red-500 text-sm mt-1">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      Thana *
                    </label>
                    <input
                      type="text"
                      placeholder="Thana"
                      {...register("receiverThana", { required: true })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d321d]"
                    />
                    {errors.receiverThana && (
                      <span className="text-red-500 text-sm mt-1">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>

                {/* Delivery Note */}
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium">
                    Delivery Note
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Add any special instructions for delivery"
                    {...register("deliveryNote")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4d321d]"
                  ></textarea>
                </div>

                {/* Payment Method */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 text-[#4d321d]">
                    Payment Method
                  </h3>
                  <div className="space-y-3">
                    {["Cash on delivery"].map((method) => (
                      <div
                        key={method}
                        className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        <input
                          type="radio"
                          id={method}
                          value={method}
                          {...register("paymentMethod")}
                          defaultChecked={method === "Cash on delivery"}
                          className="h-5 w-5 text-[#4d321d] focus:ring-[#4d321d]"
                        />
                        <label
                          htmlFor={method}
                          className="ml-3 text-gray-700 font-medium cursor-pointer"
                        >
                          {method}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Place Order Button */}
                <div className="hidden md:block">
                  <button
                    type="submit"
                    className="w-full bg-[#4d321d] hover:bg-opacity-90 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    Place an Order
                  </button>
                </div>

                {/* Mobile Order Button */}
                <div className="md:hidden fixed bottom-[65px] left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-[9999]">
                  <button
                    type="submit"
                    className="w-full bg-[#4d321d] hover:bg-[#3a2414] text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    Place an Order{" "}
                    {cartItems?.cart?.reduce(
                      (total, item) => total + item.quantity * item.salePrice,
                      0
                    ) + 70}{" "}
                    Tk
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 sticky top-8">
              <h2 className="text-2xl font-bold text-[#4d321d] mb-6">
                Your Order
              </h2>
              <div className="max-h-[500px] overflow-y-auto pr-2">
                <table className="w-full">
                  <tbody>
                    {cartItems?.cart?.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-4 w-24">
                          <img
                            className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover"
                            src={item?.images[0]?.url}
                            alt={item?.name}
                          />
                        </td>
                        <td className="py-4">
                          <h3 className="font-medium max-w-[200px] w-[100px] text-gray-800 break-words">
                            {item?.name}
                          </h3>
                          <span className="text-gray-600 text-sm">
                            x {item?.quantity}
                          </span>
                        </td>
                        <td className="py-4 text-right font-bold text-[#4d321d]">
                          {item?.quantity * item?.salePrice} Tk
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="border-t border-gray-200 mt-6 pt-6">
                <div className="flex justify-between mb-3">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    BDT{" "}
                    {cartItems?.cart?.reduce(
                      (t, i) => t + i.quantity * i.salePrice,
                      0
                    )}
                  </span>
                </div>
                <div className="flex justify-between mb-3">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">BDT 70</span>
                </div>
                <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-lg font-bold text-[#4d321d]">
                    BDT{" "}
                    {cartItems?.cart?.reduce(
                      (t, i) => t + i.quantity * i.salePrice,
                      0
                    ) + 70}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog
        open={isModalOpen}
        onClose={handleModalClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: { borderRadius: "16px", overflow: "hidden" },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            bgcolor: "#4d321d",
            color: "white",
            py: 3,
          }}
        >
          🎉 Order Successful!
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", p: 4 }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
            alt="success"
            style={{ width: 100, margin: "20px auto" }}
          />
          <h2 className="text-xl font-bold mb-2">
            Your order has been placed successfully!
          </h2>
          <p className="text-gray-600 mb-4">
            Well notify you once your order is shipped.
          </p>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 3, bgcolor: "#f9f9f9" }}>
          <Button
            onClick={handleModalClose}
            variant="contained"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: "8px",
              bgcolor: "#4d321d",
              "&:hover": { bgcolor: "#3a2516" },
            }}
          >
            Continue Shopping
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}
