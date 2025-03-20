import { createSlice } from "@reduxjs/toolkit";

const updateUserSlice = createSlice({
  name: "updateuser",
  initialState: null,
  reducers: {
    updateUser: (state, action) => {
      return action.payload;
    },
    removeUSer: (state, action) => {
      return null;
    },
  },
});
export const { updateUser, removeUSer } = updateUserSlice.actions;
export default updateUserSlice.reducer;
