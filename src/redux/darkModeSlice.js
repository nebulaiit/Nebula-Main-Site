// redux/slices/darkModeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  enabled: localStorage.getItem('darkMode') === 'true',
};

const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.enabled = !state.enabled;
      localStorage.setItem('darkMode', state.enabled);
      document.body.classList.toggle('dark-mode', state.enabled);
    },
    setDarkMode: (state, action) => {
      state.enabled = action.payload;
      localStorage.setItem('darkMode', action.payload);
      document.body.classList.toggle('dark-mode', action.payload);
    },
  },
});

export const { toggleDarkMode, setDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
