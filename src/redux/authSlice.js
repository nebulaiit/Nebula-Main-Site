import { createSlice } from '@reduxjs/toolkit';

// Load from localStorage
const tokenFromStorage = localStorage.getItem('token');
const userIdFromStorage = localStorage.getItem('userId');

const initialState = {
  token: tokenFromStorage || null,
  userId: userIdFromStorage || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      // Save to localStorage
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('userId', action.payload.userId);
    },
    clearAuthData: (state) => {
      state.token = null;
      state.userId = null;
      // Remove from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    },
  },
});

export const { setAuthData, clearAuthData } = authSlice.actions;
export default authSlice.reducer;
