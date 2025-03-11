import { configureStore } from "@reduxjs/toolkit"
import addinterviewReducer from "./addInterviewSlice"
import addassessmentReducer from "./addAssessmentSlice"
import addPostjobReducer from "./addPostjobSlice"
import addTeamMemberReducer from "./addTeammemberSlice"
import userReducer from "./userSlice"
const appstore = configureStore(
    {
        reducer:{
            addinterview:addinterviewReducer,
            addassessment:addassessmentReducer,
            addpostjob:addPostjobReducer,
            addmember:addTeamMemberReducer,
            user:userReducer
        }
    }
)
 export default appstore