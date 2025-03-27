import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/Home";
import PostJobs from "./components/PostJobs";
import Applications from "./components/Applications";
import Assessments from "./components/Assessments";
import Interview from "./components/Interview";
import AddInterview from "./components/AddInterview";
import AddnewAssessments from "./components/AddnewAssessments";
import JobOpening from "./components/JobOpening";
import Login from "./components/LoginPage";
import Signup from "./components/Signup";
import UserProfile from "./components/UserProfile";
import Companies from "./components/Companies";
import CompanyCardProfile from "./components/CompanyCardProfile";
import JobsManagement from "./components/JobsManagement";
import CandidateStatus from "./components/CandidateStatus";
import AddTeamMember from "./components/AddTeamMember";
import UpdateJob from "./components/UpdateJob";
import CompanyProfile from "./components/CompanyProfile";
import UserDashboard from "./components/UserDashboard";
import CompanySetting from "./components/CompanySetting";
import CompanyNotifications from "./components/CompanyNotifications";
import UserNotifications from "./components/UserNotifications";
import Jobs from "./components/JobsApplied";
import AuthGaurd from "./utils/authgaurd";
import UserInterviewSection from "./components/UserInterviewSection";
import HelpSupport from "./components/HelpSupport";
import UserSetting from "./components/UserSetting";
import UpdateProfile from "./components/UpdateProfile";
import keycloak from "./auth/keycloak";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import RegistrationSuccess from "./components/RegistrationSuccess";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/registration-success",
      element: <RegistrationSuccess />,
    },
    {
      path: "/hr-dashboard",
      element: (
        <AuthGaurd allowedRoles={["HR"]}>
          <Home />
        </AuthGaurd>
      ),
    },
    {
      path: "/user-dashboard",
      element: (
        <AuthGaurd allowedRoles={["CANDIDATE"]}>
          <UserDashboard />
        </AuthGaurd>
      ),
    },
    {
      path: "/jobopening",
      element: (
        <AuthGaurd allowedRoles={["CANDIDATE"]}>
          <JobOpening />
        </AuthGaurd>
      ),
    },
    {
      path: "/update-profile",
      element: (
        <AuthGaurd allowedRoles={["CANDIDATE"]}>
          <UpdateProfile />
        </AuthGaurd>
      ),
    },
    {
      path: "/jobposting",
      element: (
        <AuthGaurd allowedRoles={["HR"]}>
          <PostJobs />
        </AuthGaurd>
      ),
    },
    {
      path: "/applications",
      element: (
        <AuthGaurd allowedRoles={["HR"]}>
          <Applications />
        </AuthGaurd>
      ),
    },
    {
      path: "/assessments",
      element: (
        <AuthGaurd allowedRoles={["HR"]}>
          <Assessments />
        </AuthGaurd>
      ),
    },
    {
      path: "/interviews",
      element: (
        <AuthGaurd allowedRoles={["HR"]}>
          <Interview />
        </AuthGaurd>
      ),
    },
    {
      path: "/addinterview",
      element: (
        <AuthGaurd allowedRoles={["HR"]}>
          <AddInterview />
        </AuthGaurd>
      ),
    },
    {
      path: "/addassessment",
      element: (
        <AuthGaurd allowedRoles={["HR"]}>
          <AddnewAssessments />
        </AuthGaurd>
      ),
    },
    {
      path: "/user-profile",
      element: (
        <AuthGaurd allowedRoles={["CANDIDATE"]}>
          <UserProfile />
        </AuthGaurd>
      ),
    },
    {
      path: "/companies",
      element: (
        <AuthGaurd allowedRoles={["CANDIDATE"]}>
          <Companies />
        </AuthGaurd>
      ),
    },
    {
      path: "/company-card-profile",
      element: (
        <AuthGaurd allowedRoles={["CANDIDATE"]}>
          <CompanyCardProfile />
        </AuthGaurd>
      ),
    },
    {
      path: "/jobs-management",
      element: (
        <AuthGaurd allowedRoles={["HR"]}>
          <JobsManagement />
        </AuthGaurd>
      ),
    },
    {
      path: "/update-job/:id",
      element: (
        <AuthGaurd allowedRoles={["CANDIDATE"]}>
          <UpdateJob />
        </AuthGaurd>
      ),
    },
    {
      path: "/addteammember",
      element: (
        <AuthGaurd allowedRoles={["CANDIDATE"]}>
          <AddTeamMember />
        </AuthGaurd>
      ),
    },
    {
      path: "/company-setting",
      element: (
        <AuthGaurd allowedRoles={["HR"]}>
          <CompanySetting />
        </AuthGaurd>
      ),
    },
    {
      path: "/company-notifications",
      element: (
        <AuthGaurd allowedRoles={["HR"]}>
          <CompanyNotifications />
        </AuthGaurd>
      ),
    },
    {
      path: "/user-setting",
      element: (
        <AuthGaurd allowedRoles={["CANDIDATE"]}>
          <UserSetting />
        </AuthGaurd>
      ),
    },
    {
      path: "/user-notifications",
      element: (
        <AuthGaurd allowedRoles={["CANDIDATE"]}>
          <UserNotifications />
        </AuthGaurd>
      ),
    },
    {
      path: "/jobs-applied",
      element: (
        <AuthGaurd allowedRoles={["CANDIDATE"]}>
          <Jobs />
        </AuthGaurd>
      ),
    },
    {
      path: "/help-support",
      element: (
        <AuthGaurd allowedRoles={["CANDIDATE"]}>
          <HelpSupport />
        </AuthGaurd>
      ),
    },
    {
      path: "/company-profile",
      element: (
        <AuthGaurd allowedRoles={["HR"]}>
          <CompanyProfile />
        </AuthGaurd>
      ),
    },
    {
      path: "/candidates",
      element: (
        <AuthGaurd allowedRoles={["HR"]}>
          <CandidateStatus />
        </AuthGaurd>
      ),
    },
    {
      path: "/user-interview",
      element: (
        <AuthGaurd allowedRoles={["CANDIDATE"]}>
          <UserInterviewSection />
        </AuthGaurd>
      ),
    },
    // ... other protected routes
    {
      path: "/unauthorized",
      element: <div>You don't have permission to access this page</div>,
    },
  ]);
  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{
        onLoad: "check-sso",
        pkceMethod: "S256",
        checkLoginIframe: false,
      }}
      onEvent={(event, error) => {
        if (event === "onAuthError") {
          console.error("Keycloak error:", error);
        }
      }}
    >
      <RouterProvider router={router} />
    </ReactKeycloakProvider>
  );
}
export default App;
