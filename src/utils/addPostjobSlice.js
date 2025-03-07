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
    deleteJob: (state, action) => {
      state.jobs = state.jobs.filter(job => job.id !== action.payload);
    },
  },
});

export const { postJob, deleteJob } = jobSlice.actions;
export default jobSlice.reducer;
