import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Stats from "../cards/Stats";
import AnalyticsChart from "../cards/AnalyticsChart";
import CandidatePipeline from "../cards/CandidatePipeline";

const CompanyDashboard = () => {
  const darkMode = useSelector((state) => state.hrTheme.darkMode); // Get dark mode state
  const totalActiveJob =useSelector((state)=>state.addpostjob.jobs)
  const [totalApplication,setTotalApplication]=useState(0);
  const [totalInterview,setTotalInterview]=useState(0);
  const [shortlistedCandidates,setShortlistedCandidates]=useState(0);
  const activeJobs=[...totalActiveJob].length;
  const fetchAllAplication = async () => {
        try {
          const response = await fetch("/api/job_applied");
          if (!response.ok) {
            throw new Error("Failed to fetch jobs");
          }
          const jobsData = await response.json();
          setTotalApplication([...jobsData].length);
          
        } catch (error) {
          console.error("Error fetching jobs:", error);
        }
  };
  const fetchAllInterview=async()=>{
    try {
      const response = await fetch("/api/addInterviews");
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const jobsData = await response.json();
      setTotalInterview([...jobsData].length);
      
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  }
  const fetchAllShortlistedCandidates=async()=>{
    try {
      const response = await fetch("/api/shortlist");
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const jobsData = await response.json();
      setShortlistedCandidates([...jobsData].length);
      
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  }
   useEffect(() => {
        fetchAllAplication()
        fetchAllInterview()
        fetchAllShortlistedCandidates()
      }, []);
      console.log(totalApplication)
  const statsData = [
    {
      title: "Active Jobs",
      value: activeJobs,
      color: "text-purple-600",
    },
    {
      title: "Total Applications",
      value: totalApplication,
      color: "text-blue-600",
    },
    {
      title: "Interviews Scheduled",
      value: totalInterview,
      color: "text-green-600",
    },
    {
      title: "Shortlisted Candidates",
      value: shortlistedCandidates,
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
