import { configureStore } from "@reduxjs/toolkit"
import addinterviewReducer from "./addInterviewSlice"
import addassessmentReducer from "./addAssessmentSlice"
import addPostjobReducer from "./addPostjobSlice"
import addTeamMemberReducer from "./addTeammemberSlice"
import userReducer from "./userSlice"
import themeReducer from "./themeSlice"
const appstore = configureStore(
    {
        reducer:{
            addinterview:addinterviewReducer,
            addassessment:addassessmentReducer,
            addpostjob:addPostjobReducer,
            addmember:addTeamMemberReducer,
            user:userReducer,
            theme:themeReducer
        }
    }
)
 export default appstore