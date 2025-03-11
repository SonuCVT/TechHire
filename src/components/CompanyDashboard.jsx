import React from "react";
import Sidebar from "./Sidebar";
import Stats from "../cards/Stats";
import AnalyticsChart from "../cards/AnalyticsChart";
import CandidatePipeline from "../cards/CandidatePipeline";

const CompanyDashboard = () => {
  //const [activeTab, setActiveTab] = useState('Home');

  const statsData = [
    {
      title: "Active Jobs",
      value: "24",
      change: "+12%",
      period: "month",
      color: "text-purple-600",
    },
    {
      title: "Totanpm dev runl Applications",
      value: "842",
      change: "+8%",
      period: "month",
      color: "text-blue-600",
    },
    {
      title: "Interviews Scheduled",
      value: "38",
      change: "+6%",
      period: "month",
      color: "text-green-600",
    },
    {
      title: "Time to Hire",
      value: "18d",
      change: "faster than avg",
      period: "",
      color: "text-orange-500",
    },
  ];


  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
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
