import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
};

const jobSlice = createSlice({
  name: "addpostjob",
  initialState,
  reducers: {
    postJob: (state, action) => {
      state.jobs = action.payload;
    },
    deleteJob: (state, action) => {
      state.jobs = state.jobs.filter((job) => job.id !== action.payload);
    },
    updateJob: (state, action) => {
      state.jobs = state.jobs.map((job) =>
        job.id === action.payload.id ? { ...job, ...action.payload } : job
      );
    },
  },
});

export const { postJob, deleteJob, updateJob } = jobSlice.actions;
export default jobSlice.reducer;
