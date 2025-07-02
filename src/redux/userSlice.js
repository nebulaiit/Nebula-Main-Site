// src/redux/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserDetails } from '../Components/APIService/apiservice';

// Thunk to fetch user details
export const fetchUserDetails = createAsyncThunk(

  'user/fetchUserDetails',
  async (userId, { rejectWithValue }) => {
    try {
      const data = await getUserDetails(userId);
      return data;
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || 'Unknown error';
      console.error('❌ Failed to fetch user details:', message);
      return rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
