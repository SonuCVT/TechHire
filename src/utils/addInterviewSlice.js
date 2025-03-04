import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    interview:[]
}

const addinterviewSlice = createSlice({
    name :"addinterview",
    initialState,
    reducers:{
        addInterview:(state,action) =>{
            state.interview.push(action.payload);
        },
        
    }
})
export const {addInterview} = addinterviewSlice.actions
export default addinterviewSlice.reducer