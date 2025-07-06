// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';
import wishlistReducer from './wishlistSlice'
import cartReducer from './cartSlice'
import toastReducer from './toastSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
    toast: toastReducer,
  },
});
