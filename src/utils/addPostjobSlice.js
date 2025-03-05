import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobs: [],
};

const jobSlice = createSlice({
  name: 'addpostjob',
  initialState,
  reducers: {
    postJob: (state, action) => {
      state.jobs.push(action.payload);
    },

  },
});

export const { postJob} = jobSlice.actions;
export default jobSlice.reducer;
