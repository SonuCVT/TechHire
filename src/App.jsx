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

function App() {

  const userouter = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/jobposting",
      element: <PostJobs/>,
    },
    {
      path: "/applications",
      element: <Applications/>,
    },
    {
      path:"/assessments",
      element:<Assessments/>
    },
    {
      path:"/interviews",
      element:<Interview/>
    },
    {
      path:"/addinterview",
      element:<AddInterview/>
    },
    {
      path:"/addassessment",
      element:<AddnewAssessments/>
    },
    {
      path:"/jobopening",
      element:<JobOpening/>
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
      path: "/user-profile",
      element: <UserProfile />,
    },
    {
      path: "/companies",
      element: <Companies />,
    },
  ]);

  return (
    <>
    <div className="App">
      <RouterProvider router={userouter} />
    </div>
    </>
  )
}

export default App
