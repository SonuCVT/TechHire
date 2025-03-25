import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false, // Default is light mode
};

const themeSlice = createSlice({
  name: "hrTheme",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
  },
});

export const { toggleDarkMode, setDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
