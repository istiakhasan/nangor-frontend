/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import "./checkout.css";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useCreateOrderMutation } from "../../../../redux/api/orderApi";
import { useState } from "react";
import {clearCart} from '../../../../redux/feature/cartSlice'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

export default function Checkout() {
  const [orderCreateHandler] = useCreateOrderMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart);
  const dispatch=useDispatch()
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
      console.log(res, "res");

      if (!!res) {
        setSnackbarOpen(true);
        setIsModalOpen(true);
        reset()
        dispatch(clearCart())
      } else {
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error(error);
      setSnackbarOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSnackbarClose = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };
console.log(cartItems,"cartitems");
  return (
    <main className="main p-[20px]">
      {/* Snackbar Notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Order placed successfully!
        </Alert>
      </Snackbar>

      {/* Breadcrumb */}
      <div className="page-header breadcrumb-wrap">
        <div className="">
          <div className="breadcrumb">
            <Link href="/" rel="nofollow">
              <i className="fi-rs-home mr-5"></i>Home
            </Link>
            <span></span> Shop
            <span></span> Checkout
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="mb-[80px] mt-[50px]">
        <div className="grid grid-cols-12">
          {/* Left Column */}
          <div className="col-span-7 border border-gray-200 p-[40px]">
            <div className="grid">
              <h4 className="mb-[30px]">Billing Details</h4>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-12 gap-6">
                  <div className="form-group col-span-6">
                    <input
                      type="text"
                      placeholder="First name *"
                      {...register("receiverName", { required: true })}
                    />
                    {errors.receiverName && (
                      <span className="text-red-500">Required</span>
                    )}
                  </div>
                  <div className="form-group col-span-6">
                    <input
                      type="text"
                      placeholder="Phone *"
                      {...register("receiverPhoneNumber", { required: true })}
                    />
                    {errors.receiverPhoneNumber && (
                      <span className="text-red-500">Required</span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Address *"
                    {...register("receiverAddress", { required: true })}
                  />
                  {errors.receiverAddress && (
                    <span className="text-red-500">Required</span>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-6 shipping_calculator">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Division"
                      {...register("receiverDivision", { required: true })}
                    />
                    {errors.receiverDivision && (
                      <span className="text-red-500">Required</span>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="District"
                      {...register("receiverDistrict", { required: true })}
                    />
                    {errors.receiverDistrict && (
                      <span className="text-red-500">Required</span>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Thana"
                      {...register("receiverThana", { required: true })}
                    />
                    {errors.receiverThana && (
                      <span className="text-red-500">Required</span>
                    )}
                  </div>
                </div>

                <div className="form-group mb-[30px]">
                  <textarea
                    rows="3"
                    placeholder="Delivery Note"
                    {...register("deliveryNote")}
                  ></textarea>
                </div>

                {/* Payment Method */}
                <div className="payment_option mb-[20px]">
                  {["Cash on delivery", "Online Gateway", "Bank Transfer"].map(
                    (method) => (
                      <div
                        key={method}
                        className="custome-radio flex items-center gap-2"
                      >
                        <input
                          type="radio"
                          value={method}
                          {...register("paymentMethod")}
                          defaultChecked={method === "Cash on delivery"}
                        />
                        <label className="form-check-label">{method}</label>
                      </div>
                    )
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-fill-out btn-block mt-[30px]"
                >
                  Place an Order <i className="fi-rs-sign-out ml-15"></i>
                </button>
              </form>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-5">
            <div className="border border-gray-200 p-[40px] cart-totals ml-[30px]">
              <div className="flex align-items-end justify-between mb-[30px]">
                <h4 className="text-[24px]">Your Order</h4>
                <h6 className="text-muted">Subtotal</h6>
              </div>
              <div className="divider-2 "></div>
              <div className="table-responsive order_table checkout h-[600px] overflow-y-scroll">
                <table>
                  <tbody>
                    {cartItems?.cart?.map((a, i) => (
                      <tr key={i}>
                        <td className="image product-thumbnail">
                          <img
                            height={200}
                            width={200}
                            src={a?.images[0]?.url}
                            alt="#"
                          />
                        </td>
                        <td>
                          <h6 className="w-[160px] mb-[5px]">
                            <Link
                              href="/shop-product-full"
                              className="text-heading"
                            >
                              {a?.name}
                            </Link>
                          </h6>
                          <div className="product-rate-cover">
                            <div className="product-rate d-inline-block">
                              <div
                                className="product-rating"
                                style={{ width: "90%" }}
                              ></div>
                            </div>
                            <span className="font-small text-muted">
                              {" "}
                              (4.0)
                            </span>
                          </div>
                        </td>
                        <td>
                          <h6 className="text-muted pl-[20px] pr-[20px]">
                            x {a?.quantity}
                          </h6>
                        </td>
                        <td>
                          <h4 className="text-brand text-[24px]">
                            {a?.quantity * a?.salePrice}
                          </h4>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ MUI Success Dialog */}
      <Dialog open={isModalOpen} onClose={handleModalClose} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
          🎉 Order Successful!
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", p: 3 }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
            alt="success"
            style={{ width: 80, margin: "10px auto" }}
          />
          <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>
            Your order has been placed successfully!
          </h2>
          <p style={{ color: "#777" }}>
            We’ll notify you once your order is shipped.
          </p>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            onClick={handleModalClose}
            variant="contained"
            color="primary"
            sx={{ px: 4, borderRadius: "8px" }}
          >
            Continue Shopping
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}
