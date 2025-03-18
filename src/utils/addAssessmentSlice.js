import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assessment: [],
};

const addassessmentSlice = createSlice({
  name: "addassessment",
  initialState,
  reducers: {
    addAssessment: (state, action) => {
      state.assessment = action.payload;
    },
  },
});
export const { addAssessment } = addassessmentSlice.actions;
export default addassessmentSlice.reducer;
