"use client";
import { productAddToCart } from "../redux/feature/cartSlice";
import { useDispatch, useSelector } from "react-redux";

export default function AddToCartButton({ item,index }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const handleAddToCart = async () => {
    dispatch(productAddToCart(item));
  };

  return (
    <button
      disabled={cartItems?.cart?.some((ab)=>ab?.id===item?.id)}
      onClick={()=>{
          handleAddToCart()
      }}
      className={` text-white px-2 py-1 text-[12px] w-full  rounded ${cartItems?.cart?.some((ab)=>ab?.id===item?.id)?'bg-gray-300':'bg-[#4d321d] cursor-pointer'}`}
    >
      {cartItems?.cart?.some((ab)=>ab?.id===item?.id)?'Added':'Add to Cart'}
      
    </button>
  );
}
