import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  member: [],
};

const teamMemberSlice = createSlice({
  name: 'addmember',
  initialState,
  reducers: {
    addTeamMember: (state, action) => {
      state.member.push(action.payload);
    },

  },
});

export const {addTeamMember } =teamMemberSlice.actions;
export default teamMemberSlice.reducer;
