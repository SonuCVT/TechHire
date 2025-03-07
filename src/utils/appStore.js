import { configureStore } from "@reduxjs/toolkit"
import addinterviewReducer from "./addInterviewSlice"
import addassessmentReducer from "./addAssessmentSlice"
import addPostjobReducer from "./addPostjobSlice"
import addTeamMemberReducer from "./addTeammemberSlice"
const appstore = configureStore(
    {
        reducer:{
            addinterview:addinterviewReducer,
            addassessment:addassessmentReducer,
            addpostjob:addPostjobReducer,
            addmember:addTeamMemberReducer
        }
    }
)
 export default appstore