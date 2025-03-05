import { configureStore } from "@reduxjs/toolkit"
import addinterviewReducer from "./addInterviewSlice"
import addassessmentReducer from "./addAssessmentSlice"
import addPostjobReducer from "./addPostjobSlice"
const appstore = configureStore(
    {
        reducer:{
            addinterview:addinterviewReducer,
            addassessment:addassessmentReducer,
            addpostjob:addPostjobReducer
        }
    }
)
 export default appstore