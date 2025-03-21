import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserDashboardHeader from "./UserDashboardHeader";
import UserDashboardSidebar from "./UserDashboardSidebar";
import SocialAccount from "../cards/SocialAccount";
import UserDescription from "../cards/UserDescription";
import UpcomingActivities from "../cards/UpcomingActivities";

const UserDashboard = () => {
  const darkMode = useSelector((state) => state.theme.darkMode); // Get dark mode state

  const user = useSelector((state) => state.user);
  const updateUser = useSelector((state) => state.updateuser);

  const userData = {
    name: user.name,
    email: user.email,
    linkedin: "" || updateUser?.linkedin,
    github: "" || updateUser?.github,
    codingProfile: "" || updateUser?.codingProfile,
  };

  return (
    <div
      className={`min-h-screen transition-all ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <UserDashboardHeader />
      <div className="flex">
        <UserDashboardSidebar />

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Socials Row */}
          <div className="flex justify-between items-center pb-2 mb-3">
            <h1
              className={`text-2xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Welcome {userData.name} to TechHire
            </h1>

            <div className="flex gap-4">
              {/* LinkedIn */}
              <Link
                to={`${userData.linkedin}`}
                target="_blank"
                className={`px-4 py-2 rounded-md font-medium transition-all ${
                  darkMode
                    ? "bg-[#48596f] text-gray-300 hover:bg-gray-800"
                    : "bg-[#48596f] text-white hover:bg-[#222]"
                }`}
              >
                LinkedIn
              </Link>

              {/* GitHub */}
              <Link
                to={`${userData.github}`}
                target="_blank"
                className={`px-4 py-2 rounded-md font-medium transition-all ${
                  darkMode
                    ? "bg-[#48596f] text-gray-300 hover:bg-gray-800"
                    : "bg-[#48596f] text-white hover:bg-[#222]"
                }`}
              >
                Github
              </Link>

              {/* Coding Profile */}
              <Link
                to={`${userData.codingProfile}`}
                target="_blank"
                className={`px-4 py-2 rounded-md font-medium transition-all ${
                  darkMode
                    ? "bg-[#48596f] text-gray-300 hover:bg-gray-800"
                    : "bg-[#48596f] text-white hover:bg-[#222]"
                }`}
              >
                Coding Profile
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1">
            {/* User Profile Section */}
            <div className="flex justify-between gap-6">
              <div
                className={`flex flex-col items-center w-4/5 rounded-lg shadow-sm p-6 transition-all ${
                  darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
                }`}
              >
                <div className="w-24 h-24 rounded-full bg-blue-500 mb-4 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h3 className="text-xl font-bold">{userData.name}</h3>

                <div className="flex w-full justify-evenly mb-6">
                  <div className="relative w-20 h-20">
                    <svg
                      viewBox="0 0 36 36"
                      className="w-20 h-20 transform -rotate-90"
                    >
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={darkMode ? "#444" : "#eee"}
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#6366f1"
                        strokeWidth="3"
                        strokeDasharray="50, 100"
                      />
                    </svg>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                      <span className="text-lg font-bold text-indigo-400">
                        50%
                      </span>
                    </div>
                    <p className="text-center text-sm mt-2">Selection</p>
                  </div>

                  <div className="relative w-20 h-20">
                    <svg
                      viewBox="0 0 36 36"
                      className="w-20 h-20 transform -rotate-90"
                    >
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={darkMode ? "#444" : "#eee"}
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3"
                        strokeDasharray="50, 100"
                      />
                    </svg>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                      <span className="text-lg font-bold text-emerald-400">
                        50%
                      </span>
                    </div>
                    <p className="text-center text-sm mt-2">Profile Rank</p>
                  </div>
                </div>

                <div className="w-full">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold">Last Activities</h4>
                    <a
                      href="#"
                      className={`text-sm transition ${
                        darkMode ? "text-violet-400" : "text-indigo-600"
                      }`}
                    >
                      See All
                    </a>
                  </div>

                  <div className="space-y-4">
                    <div
                      className={`border rounded-lg p-4 transition-all ${
                        darkMode
                          ? "border-gray-700 bg-gray-800 text-gray-300"
                          : "border-gray-200 bg-white text-gray-900"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            darkMode
                              ? "bg-gray-700 text-violet-400"
                              : "bg-teal-100 text-teal-500"
                          }`}
                        >
                          ✓
                        </div>
                        <div>
                          <p>
                            Your Application has{" "}
                            <span className="font-bold">accepted</span>
                          </p>
                          <p
                            className={`text-sm ${
                              darkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            3 Companies
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`border rounded-lg p-4 transition-all ${
                        darkMode
                          ? "border-gray-700 bg-gray-800 text-gray-300"
                          : "border-gray-200 bg-white text-gray-900"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            darkMode
                              ? "bg-gray-700 text-orange-400"
                              : "bg-orange-100 text-orange-500"
                          }`}
                        >
                          ✓
                        </div>
                        <div>
                          <p>
                            Your Resume has{" "}
                            <span className="font-bold">viewed</span>
                          </p>
                          <p
                            className={`text-sm ${
                              darkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            3 Companies
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Section */}
              <div className="w-1/5 grid grid-cols-1 gap-3">
                {[
                  { label: "Application Sent", count: 56 },
                  { label: "Interview Schedule", count: 10 },
                  { label: "Profile Visited", count: 150 },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-lg border transition-all ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 hover:bg-gray-800 hover:text-white"
                        : "bg-white border-gray-200 hover:bg-[#48596f] hover:text-white"
                    }`}
                  >
                    <h2 className="text-4xl font-bold">{item.count}</h2>
                    <p className="text-sm">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <UpcomingActivities />
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
