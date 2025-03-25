import React from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Stats from "../cards/Stats";
import AnalyticsChart from "../cards/AnalyticsChart";
import CandidatePipeline from "../cards/CandidatePipeline";

const CompanyDashboard = () => {
  const darkMode = useSelector((state) => state.hrTheme.darkMode); // Get dark mode state

  const statsData = [
    {
      title: "Active Jobs",
      value: "24",
      color: "text-purple-600",
    },
    {
      title: "Total Applications",
      value: "842",
      color: "text-blue-600",
    },
    {
      title: "Interviews Scheduled",
      value: "38",
      color: "text-green-600",
    },
    {
      title: "Shortlisted Candidates",
      value: "20",
      color: "text-orange-500",
    },
  ];

  return (
    <div
      className={`min-h-screen transition-all ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <Header />
      <div className="flex">
        <Sidebar />

        {/* Main Content */}
        <main
          className={`flex-1 p-6 ${
            darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
          }`}
        >
          <div className="container mx-auto">
            <div
              className={`rounded-lg mb-6 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              <h1 className="text-2xl font-bold mb-5">Welcome to Dashboard</h1>

              {/* Pass statsData as props */}
              <Stats stats={statsData} />

              {/* Analytics Section */}
              <AnalyticsChart />

              {/* Candidate Pipeline */}
              <CandidatePipeline />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CompanyDashboard;
