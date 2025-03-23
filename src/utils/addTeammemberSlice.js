import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  member: [],
};

const teamMemberSlice = createSlice({
  name: 'addmember',
  initialState,
  reducers: {
    addTeamMember: (state, action) => {
      state.member=action.payload;
    },

  },
});

export const {addTeamMember } =teamMemberSlice.actions;
export default teamMemberSlice.reducer;
