import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  cart: [],
  wishList: [],
  total: 0,
  shipping: 0,
  coupon: "",
};

// const calculateShipping = (subtotal: number): number => {
//   if (subtotal > 200) return 10;
//   if (subtotal > 100) return 20;
//   return 30;
// };

const updateTotalAndShipping = (state) => {
  const subtotal = state.cart.reduce(
    (acc, product) => acc + product.salePrice * (product.quantity || 1),
    0
  );
  state.total = subtotal;
  // state.shipping = calculateShipping(subtotal);
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    productAddToCart: (state, { payload }) => {
      const isExist = state.cart.find((item) =>item?.id === payload?.id);
      if (isExist) {
        // message.error("Already added");
      } else {
        state.cart.push({...payload,quantity:payload?.quantity?payload?.quantity:1});
        updateTotalAndShipping(state);
        // toast.success("Product added successfully...");
      }
    },

  incrementQuantityByInput: (state, { payload }) => {
  let qty = Number(payload.value);

  if (isNaN(qty) || qty <= 0) {
    qty = 1; // fallback to 1 if invalid
  }

  state.cart[payload.index].quantity = qty;
  updateTotalAndShipping(state);
},

    incrementQuantity: (
      state,
      { payload }
    ) => {
      state.cart[payload.index].quantity =
        Number(state.cart[payload.index].quantity || 1) + 1;
      updateTotalAndShipping(state);
    },

    decrementQuantity: (
      state,
      { payload }) => {
      const currentItem = state.cart[payload.index];

      if ((currentItem.quantity || 1) - 1 === 0) {
        state.cart.splice(payload.index, 1);
      } else {
        currentItem.quantity = (currentItem.quantity || 1) - 1;
      }

      updateTotalAndShipping(state);
    },
    removeToCart: (state, { payload }) => {
      if (payload.index >= 0 && payload.index < state.cart.length) {
        state.cart.splice(payload.index, 1);
        updateTotalAndShipping(state);
      }
    },

    clearCart: (state) => {
      state.cart = [];
      state.total = 0;
      state.shipping = 0;
    },
    selectAll: (state, { payload }) => {
      state.cart = state.cart.map((item) => {
        return {
          ...item,
          select: payload?.select,
        };
      });
    },
    selectById: (state, { payload }) => {
      state.cart[payload?.index].select = payload?.select;
    },
    addCoupon: (state, { payload }) => {
      state.coupon = payload?.coupon;
    },
  },
});

export const {
  productAddToCart,
  incrementQuantity,
  decrementQuantity,
  incrementQuantityByInput,
  removeToCart,
  clearCart,
  selectAll,
  selectById,
  addCoupon,
  
} = cartSlice.actions;

export default cartSlice.reducer;