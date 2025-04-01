import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    interview:"",
    addCandidateId:"",
}

const addinterviewSlice = createSlice({
    name :"addinterview",
    initialState,
    reducers:{
        addInterview:(state,action) =>{
            state.interview=action.payload;
        },
        selectCandidateId:(state,action)=>{
            state.addCandidateId=action.payload
        },
        removeCandidateId:(state)=>{
            state.addCandidateId=""
        }
    }
})
export const {addInterview,selectCandidateId,removeCandidateId} = addinterviewSlice.actions
export default addinterviewSlice.reducer