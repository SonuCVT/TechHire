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
        <main className="flex-1 p-6">
          <div className="container mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h1 className="text-2xl font-bold">Company Dashboard</h1>

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
