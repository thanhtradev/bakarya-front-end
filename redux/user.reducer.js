import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    cart: [],
    pay: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    addPayment: (state, action) => {
      state.pay.push(action.payload);
    },
    payment: (state, action) => {
      state.cart = [];
    },
  },
});
export const { addToCart, addPayment, payment } = userSlice.actions;
export default userSlice.reducer;
