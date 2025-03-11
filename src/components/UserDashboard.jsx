import React from "react";
import UserDashboardHeader from "./UserDashboardHeader";
import UserDashboardSidebar from "./UserDashboardSidebar";
import SocialAccount from "../cards/SocialAccount";
import UserDescription from "../cards/UserDescription";
import UpcomingActivities from "../cards/UpcomingActivities";
const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <UserDashboardHeader />
      <div className="flex">
        {/* Sidebar */}
        <UserDashboardSidebar />

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Search Bar */}
          {/* <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1">
              <Search className="text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search Keyword, jobs, sales" 
                className="w-full outline-none"
              />
            </div>
            <div className="flex items-center gap-4">
              <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm">1440</span>
              <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm">120</span>
            </div>
            <div className="flex items-center gap-4 ml-4">
              <Bell className="text-gray-500" />
              <MessageSquare className="text-gray-500" />
            </div>
          </div>
        </div> */}

          <SocialAccount />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Description Section */}
            <UserDescription />
            {/* User Profile Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-blue-500 mb-4 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">User Name</h3>
                <p className="text-gray-500 mb-6">Software Engineer</p>

                <div className="flex w-full justify-between mb-6  ">
                  <div className="relative w-20 h-20">
                    <svg
                      viewBox="0 0 36 36"
                      className="w-20 h-20 transform -rotate-90"
                    >
                      <path
                        d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#eee"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#6366f1"
                        strokeWidth="3"
                        strokeDasharray="50, 100"
                      />
                    </svg>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                      <span className="text-lg font-bold text-indigo-600">
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
                        d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#eee"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3"
                        strokeDasharray="50, 100"
                      />
                    </svg>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                      <span className="text-lg font-bold text-emerald-500">
                        50%
                      </span>
                    </div>
                    <p className="text-center text-sm mt-2">Profile Rank</p>
                  </div>
                </div>

                <div className="w-full">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold">Last Activites</h4>
                    <a href="#" className="text-indigo-600 text-sm">
                      See All
                    </a>
                  </div>

                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                          <span className="text-teal-500">✓</span>
                        </div>
                        <div>
                          <p>
                            Your Application has{" "}
                            <span className="font-bold">accepted</span>
                          </p>
                          <p className="text-sm text-gray-500">3 Companies</p>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                          <span className="text-orange-500">✓</span>
                        </div>
                        <div>
                          <p>
                            Your Resume has{" "}
                            <span className="font-bold">viewed</span>
                          </p>
                          <p className="text-sm text-gray-500">3 Companies</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
