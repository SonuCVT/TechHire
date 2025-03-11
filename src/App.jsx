import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import AuthGuard from "./utils/authgaurd";
import UserInterviewSection from "./components/UserInterviewSection";

function App() {
  const userouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/hr-dashboard",
      element: (
        <AuthGuard>
          <Home /> {/* HR Dashboard */}
        </AuthGuard>
      ),
    },
    {
      path: "/candidate-dashboard",
      element: (
        <AuthGuard>
          <UserDashboard /> {/* Candidate Dashboard */}
        </AuthGuard>
      ),
    },
    {
      path: "/jobposting",
      element: (
        <AuthGuard>
          <PostJobs />
        </AuthGuard>
      ),
    },
    {
      path: "/applications",
      element: (
        <AuthGuard>
          <Applications />
        </AuthGuard>
      ),
    },
    {
      path: "/assessments",
      element: (
        <AuthGuard>
          <Assessments />
        </AuthGuard>
      ),
    },
    {
      path: "/interviews",
      element: (
        <AuthGuard>
          <Interview />
        </AuthGuard>
      ),
    },
    {
      path: "/addinterview",
      element: (
        <AuthGuard>
          <AddInterview />
        </AuthGuard>
      ),
    },
    {
      path: "/addassessment",
      element: (
        <AuthGuard>
          <AddnewAssessments />
        </AuthGuard>
      ),
    },
    {
      path: "/jobopening",
      element: (
        <AuthGuard>
          <JobOpening />
        </AuthGuard>
      ),
    },
    {
      path: "/user-profile",
      element: (
        <AuthGuard>
          <UserProfile />
        </AuthGuard>
      ),
    },
    {
      path: "/companies",
      element: (
        <AuthGuard>
          <Companies />
        </AuthGuard>
      ),
    },
    {
      path: "/company-card-profile",
      element: (
        <AuthGuard>
          <CompanyCardProfile />
        </AuthGuard>
      ),
    },
    {
      path: "/jobs-management",
      element: (
        <AuthGuard>
          <JobsManagement />
        </AuthGuard>
      ),
    },
    {
      path: "/update-job",
      element: (
        <AuthGuard>
          <UpdateJob />
        </AuthGuard>
      ),
    },
    {
      path: "/candidates",
      element: (
        <AuthGuard>
          <CandidateStatus />
        </AuthGuard>
      ),
    },
    {
      path: "/addteammember",
      element: (
        <AuthGuard>
          <AddTeamMember />
        </AuthGuard>
      ),
    },
    {
      path: "/company-profile",
      element: <CompanyProfile />,
    },
    {
      path: "/user-dashboard",
      element: <UserDashboard />,
    },
    {
      path: "/company-setting",
      element: <CompanySetting />,
    },
    {
      path: "/company-notifications",
      element: <CompanyNotifications />,
    },
    {
      path: "/user-notifications",
      element: <UserNotifications />,
    },
    {
      path: "/user-interview",
      element: <UserInterviewSection/>
    },
    {
      path: "/jobs-applied",
      element: <Jobs />,
    },
  ]);

  return (
    <>
      <div className="App">
        <RouterProvider router={userouter} />
      </div>
    </>
  );
}

export default App;
