import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserDashboardHeader from "./UserDashboardHeader";
import UserDashboardSidebar from "./UserDashboardSidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

const UserInterviewSection = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [mergedData, setMergedData] = useState([]);

   const [user,setUser]=useState([])
      const { keycloak } = useKeycloak();
      const fetchUserData =async()=>{
        
        const email =await keycloak.tokenParsed?.email;
        console.log("User's email:", email);
        const response = await fetch(`/api/candidates/email/${email}`);
        const data=await response.json();
        console.log(data)
        setUser(data)
      }

  const candidateId = user.id;

  const fetchInterviewSchedule = async () => {
    try {
      const response = await fetch(`/api/addInterviews/candidate/${candidateId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch assessments");
      }
      const interviews = await response.json();
      console.log("Interviews:", interviews);
      
      if (interviews.length > 0) {
        fetchJobs(interviews);
      } else {
        setMergedData([]);
      }
    } catch (error) {
      console.error("Error fetching assessments:", error);
    }
  };

  const fetchJobs = async (interviews) => {
    const jobIds = [...new Set(interviews.map((item) => item.jobId))];
    console.log("Job IDs:", jobIds);

    try {
      const response = await axios.get(`/api/job_applied/${jobIds}/${candidateId}`);
      const jobs = Array.isArray(response.data) ? response.data : [response.data];
      console.log("Jobs:", jobs);
      mergeData(interviews, jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const mergeData = (interviews, jobs) => {
    const merged = interviews.map((interview) => {
      const jobDetails = jobs.find((job) => job.jobId === interview.jobId) || {};
      return {
        ...interview,
        companyName: jobDetails.company || "Unknown Company",
      };
    });

    console.log("Merged Data:", merged);
    setMergedData(merged);
  };

  useEffect(() => {
    fetchUserData()
    if(candidateId){
      fetchInterviewSchedule()
    }
  }, [candidateId]);

  return (
    <div className={`min-h-screen transition-all ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <UserDashboardHeader />
      <div className="flex">
        <UserDashboardSidebar />
        <div className={`flex-1 p-6 mx-6 rounded-lg shadow-lg transition-all ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
          {mergedData.length > 0 ? (
            <table className={`table-auto w-full shadow-lg rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-blue-50 border-gray-300"} text-center`}>
              <thead>
                <tr className={`${darkMode ? "bg-gray-600 text-white" : "bg-blue-200 text-black"}`}>
                  <th className="py-2 px-4">Company Name</th>
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Time</th>
                  <th className="py-2 px-4">Type</th>
                  <th className="py-2 px-4">Interviewer</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {mergedData.map((item, index) => (
                  <tr key={index} className={`border-t ${darkMode ? "border-gray-600 text-white" : "border-gray-300 text-black"}`}>
                    <td className="py-2 px-4">{item.companyName}</td>
                    <td className="py-2 px-4">{item.dateInterview}</td>
                    <td className="py-2 px-4">{item.timeInterview}</td>
                    <td className="py-2 px-4">{item.interviewMode}</td>
                    <td className="py-2 px-4">{item.interviewPanelMembers}</td>
                    <td className="py-2 px-4">{item.status}</td>
                    <td className="py-2 px-4">
                      <Link to={item.meetingLink} target="_blank" className={`px-4 py-2 rounded-md transition ${darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"}`}>
                        Join Meeting
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className={`text-center py-8 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              No interviews scheduled
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInterviewSection;