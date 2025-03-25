import { configureStore } from "@reduxjs/toolkit";
import addinterviewReducer from "./addInterviewSlice";
import addassessmentReducer from "./addAssessmentSlice";
import addPostjobReducer from "./addPostjobSlice";
import addTeamMemberReducer from "./addTeammemberSlice";
import userReducer from "./userSlice";
import themeReducer from "./themeSlice";
import hrThemeReducer from "./hrThemeSlice";
import updateUserReducer from "./updateUserSlice";

const appstore = configureStore({
  reducer: {
    addinterview: addinterviewReducer,
    addassessment: addassessmentReducer,
    addpostjob: addPostjobReducer,
    addmember: addTeamMemberReducer,
    user: userReducer,
    theme: themeReducer,
    hrTheme: hrThemeReducer,
    updateuser: updateUserReducer,
  },
});
export default appstore;
