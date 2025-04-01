import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assessment: [],
  selectOaAssessment: "",
  selectCodingAssessment:""
};

const addassessmentSlice = createSlice({
  name: "addassessment",
  initialState,
  reducers: {
    addAssessment: (state, action) => {
      state.assessment = action.payload;
    },
    selectedAssessment: (state, action) => {
      state.selectOaAssessment = action.payload; // Fix: Correctly updating state property
    },
    selectedCodingAssessment: (state, action) => {
      state.selectCodingAssessment = action.payload; // Fix: Correctly updating state property
    },
  },
});

export const { addAssessment, selectedAssessment,selectedCodingAssessment } = addassessmentSlice.actions;
export default addassessmentSlice.reducer;
