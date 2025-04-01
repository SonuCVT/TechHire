import { createSlice } from '@reduxjs/toolkit';

const setCandidateCodingScoreSlice = createSlice({
  name: 'candidateScore',
  initialState: {
    candidates: [],
  },
  reducers: {
    setCodingRoundScore: (state, action) => {
      state.candidates = action.payload;
    },
  },
});

export const { setCodingRoundScore } = setCandidateCodingScoreSlice .actions;
export default setCandidateCodingScoreSlice .reducer;
