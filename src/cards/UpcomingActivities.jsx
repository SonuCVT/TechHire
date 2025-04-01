import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UpcomingActivities = () => {
  const darkMode = useSelector((state) => state.theme.darkMode); // Get dark mode state
  const [mergedData, setMergedData] = useState([]);
  const [upcomingShortlist,setUpcomingShortlist]=useState([])
  const [coding,setCoding]=useState([])
  // Hardcoded Upcoming Interviews

  const { id } = useSelector((state) => state.user);
  const candidateId = id;

  const fetchInterviewSchedule = async () => {
    try {
      const response = await fetch(`/api/addInterviews/candidate/${candidateId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch assessments");
      }
      const interviews = await response.json();
      //console.log("Interviews:", interviews);
      
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
    //console.log("Job IDs:", jobIds);

    try {
      const response = await axios.get(`/api/job_applied/${jobIds}/${candidateId}`);
      const jobs = Array.isArray(response.data) ? response.data : [response.data];
     // console.log("Jobs:", jobs);
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

   // console.log("Merged Data:", merged);
    setMergedData(merged[merged.length-1]);
  };

  const fetchUpcomingResumeShortlisted =async()=>{
    try {
      const response = await fetch(`/api/shortlist/candidate/${candidateId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch assessments");
      }
      const data = await response.json();
     // console.log(data[data.length-1])
      setUpcomingShortlist(data[data.length-1]);
    } catch (error) {
      console.error("Error fetching assessments:", error);
    }
  }

  const fetchUpcomingTest=async()=>{
    try {
      const response = await fetch(`/api/codingRound/candidate/${candidateId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch assessments");
      }
      const data = await response.json();
      //console.log(data[data.length-1])
      setCoding(data[data.length-1]);
    } catch (error) {
      console.error("Error fetching assessments:", error);
    }
  }

  useEffect(() => {
    fetchInterviewSchedule();
    fetchUpcomingResumeShortlisted();
    fetchUpcomingTest()
  }, []);


  const upcomingInterviews = mergedData
  console.log(upcomingInterviews)

  
  const upcomingresumeShortlist = upcomingShortlist
  const upcomingtest=coding
 console.log(upcomingtest)
  // Merge all activities into one array for uniform rendering
  //const activities = [...upcomingInterviews, ...upcomingAssignments];

  return (
    <div className="py-6 w-4/5">
      <h2 className="text-2xl font-semibold mb-4">Upcoming Activities</h2>
      
          <div
            className="flex flex-row gap-5"
          >
            <div className={`w-96 p-4 rounded-lg shadow-md border flex flex-col justify-between h-60 transition-all ${
              darkMode
                ? "bg-gray-800 text-white border-gray-700"
                : "bg-white text-gray-900 border-gray-200"
            }`}>
            <h3 className="text-lg font-medium border-b pb-2">
              Interview
            </h3>
            <div>
              <p className="font-semibold mt-2">{upcomingInterviews.companyName}</p>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {upcomingInterviews.interviewMode}
              </p>
              {upcomingInterviews.timeInterview && (
                <p
                  className={`mt-2 text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Timing: {upcomingInterviews.timeInterview}
                </p>
              )}
              {upcomingInterviews.dateInterview && (
                <p
                  className={`mt-2 text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Deadline: {upcomingInterviews.dateInterview}
                </p>
              )}
              <p className="mt-2 text-sm">
                <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
                  Status:{" "}
                </span>
                <span
                  className={
                    upcomingInterviews.status === "Pending"
                      ? "text-red-500"
                      : "text-green-500"
                  }
                >
                  {upcomingInterviews.status}
                </span>
              </p>
            </div>
            <div className="flex justify-end items-center mt-auto">
              <Link
                to={upcomingInterviews.meetingLink}
                target="_blank"
                className={`px-4 py-2 rounded-md shadow-md transition duration-300 ${
                  upcomingInterviews.status === "Completed"
                    ? "bg-gray-500 text-white cursor-not-allowed"
                    : darkMode
                    ? "bg-violet-600 text-white hover:bg-violet-700"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
                disabled={upcomingInterviews.status === "Completed"}
              >
                {upcomingInterviews.type === "Interview"
                  ? "Join Interview"
                  : "Take Assessment"}
              </Link>
            </div>
            </div>
            <div className={`w-96 p-4 rounded-lg shadow-md border flex flex-col justify-between h-60 transition-all ${
              darkMode
                ? "bg-gray-800 text-white border-gray-700"
                : "bg-white text-gray-900 border-gray-200"
            }`}>
            <h3 className="text-lg font-medium border-b pb-2">
              Assessment
            </h3>
            <div>
              <p className="font-semibold mt-2">{upcomingtest.appliedFor}</p>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Score : {upcomingtest.score}
              </p>
              {upcomingtest.codingTestStartTime && (
                <p
                  className={`mt-2 text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Timing: {upcomingtest.codingTestStartTime}
                </p>
              )}
              {upcomingtest.codingTestDate && (
                <p
                  className={`mt-2 text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Deadline: {upcomingtest.codingTestDate}
                </p>
              )}
              <p className="mt-2 text-sm">
                <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
                  Status:{" "}
                </span>
                <span
                  className={
                    upcomingtest.status === "Pending"
                      ? "text-red-500"
                      : "text-green-500"
                  }
                >
                  {upcomingtest.status}
                </span>
              </p>
            </div>
            <div className="flex justify-end items-center mt-auto">
              <Link
                to={upcomingtest.codingPlatformUrl}
                target="_blank"
                className={`px-4 py-2 rounded-md shadow-md transition duration-300 ${
                  upcomingtest.status === "Completed"
                    ? "bg-gray-500 text-white cursor-not-allowed"
                    : darkMode
                    ? "bg-violet-600 text-white hover:bg-violet-700"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
                disabled={upcomingtest.status === "Completed"}
              >
                {upcomingtest.status !== "Completed"
                  ? "Join Interview"
                  : "Take Assessment"}
              </Link>
            </div>
            </div>
          </div>
        
      
    </div>
  );
};

export default UpcomingActivities;
