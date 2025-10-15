"use client";
import React, { useState } from "react";
import { Button, Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { productAddToCart } from "../redux/feature/cartSlice";

export default function AddToCartButton({ item }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);

  const isInCart = cartItems?.cart?.some((cartItem) => cartItem.id === item.id);

  const handleAddToCart = () => {
    dispatch(productAddToCart(item));
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const handleUndo = () => {
    // Remove item from cart (assuming you have a remove action)
    dispatch({ type: "cart/productRemoveFromCart", payload: item.id });
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleUndo}>
        UNDO
      </Button>
      <IconButton size="small" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      <button
        onClick={() => {
          if (isInCart) {
            setOpen(true); // Show Snackbar if already in cart
            return;
          }
          handleAddToCart();
        }}
        className={`text-white px-2 py-1 text-[12px] w-full rounded ${
          isInCart ? "bg-[#5f2b04]" : "bg-[#4d321d] cursor-pointer"
        }`}
      >
        {isInCart ? "Added" : "Add to Cart"}
      </button>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={isInCart ? "Already in cart" : "Added to cart"}
        action={action}
      />
    </>
  );
}
