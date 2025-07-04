// src/redux/slices/wishlistSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addWishlistItem, deleteWishlistItem, fetchWishlist } from '../Components/APIService/apiservice';

export const fetchWishlistThunk = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (userId) => {
    const data = await fetchWishlist(userId);
    return data;
  }
);

export const addToWishlist = createAsyncThunk(
  'wishlist/addToWishlist',
  async ({ userId, item }) => {
    const data = await addWishlistItem(userId, item);
    return data;
  }
);

export const removeFromWishlist = createAsyncThunk(
  'wishlist/removeFromWishlist',
  async ({ userId, courseId }) => {
    await deleteWishlistItem(userId, courseId);
    return courseId;
  }
)

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlistThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlistThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlistThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.courseId !== action.payload);
      });
  },
});


export default wishlistSlice.reducer;
