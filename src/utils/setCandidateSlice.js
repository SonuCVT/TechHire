import { createSlice } from '@reduxjs/toolkit';

const setCandidateSlice = createSlice({
  name: 'candidate',
  initialState: {
    candidates: [],
  },
  reducers: {
    setCandidates: (state, action) => {
      state.candidates = action.payload;
    },
  },
});

export const { setCandidates } = setCandidateSlice.actions;
export default setCandidateSlice.reducer;
