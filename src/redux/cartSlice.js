// redux/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // array of course objects
  },
  reducers: {
    addToCart: (state, action) => {
      const exists = state.items.find(item => item.courseId === action.payload.courseId);
      if (!exists) {
        state.items.push(action.payload); // push full course object
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.courseId !== action.payload);
    }
  }
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
