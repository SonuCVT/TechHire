import { configureStore } from "@reduxjs/toolkit"
import addinterviewReducer from "./addInterviewSlice"
import addassessmentReducer from "./addAssessmentSlice"
const appstore = configureStore(
    {
        reducer:{
            addinterview:addinterviewReducer,
            addassessment:addassessmentReducer
        }
    }
)
 export default appstore