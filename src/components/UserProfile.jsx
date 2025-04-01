import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Phone,
  MapPin,
  Mail,
  FileText,
  Share2,
  Edit,
  CheckCircle,
  XCircle,
  Download,
} from "lucide-react";
import Header from "./UserDashboardHeader.jsx";
import Sidebar from "./UserDashboardSidebar.jsx";
import userImage from "../assets/images/user.svg";
import InterviewCard from "../cards/InterviewCard.jsx";
import axios from "axios";

const CandidateProfile = () => {
  const darkMode = useSelector((state) => state.theme.darkMode); // Get dark mode state
  const [mergedData, setMergedData] = useState([]);
  const user = useSelector((state) => state.user);

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
    setMergedData(merged);
  }

    useEffect(() => {
        fetchInterviewSchedule();
        
      }, []);
  

  const candidateData = {
    name: user.name,
    email: user.email,
    phone: user.phoneNumber,
    address: user.address,
    skills: user.skills || [],
    education: user.education,
    experience: user.experience,
    resumeUrl: user.resumeUrl,
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } min-h-screen`}
    >
      {/* Header */}
      <Header />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="container mx-auto flex gap-[30px]">
            {/* Candidate Profile Card */}
            <div
              className={`rounded-lg shadow-md p-6 mb-6 w-2/5 h-full transition-all ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex flex-row md:flex-col">
                {/* Left side - Profile info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden">
                      <img
                        src={userImage}
                        alt="Sumit Desai"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold">
                        {candidateData.name}
                      </h1>
                      <div className="flex items-center mt-2 space-x-4">
                        <div
                          className={`flex items-center ${
                            darkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          <Phone size={16} className="mr-1" />
                          <span>{candidateData.phone}</span>
                        </div>
                        <div
                          className={`flex items-center ${
                            darkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          <MapPin size={16} className="mr-1" />
                          <span>{candidateData.address}</span>
                        </div>
                        <div
                          className={`flex items-center ${
                            darkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          <Mail size={16} className="mr-1" />
                          <span>{candidateData.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Skills, Education, Experience */}
                  <div className="grid grid-cols-1 gap-4">
                    <div
                      className={`border-b py-3 flex justify-between ${
                        darkMode ? "border-gray-700" : "border-gray-200"
                      }`}
                    >
                      <span className="font-medium">Skills</span>
                      <ul>
                        <span>
                          {candidateData.skills.length > 0
                            ? candidateData.skills.join(", ")
                            : ""}
                        </span>
                      </ul>
                    </div>
                    <div
                      className={`border-b py-3 flex justify-between ${
                        darkMode ? "border-gray-700" : "border-gray-200"
                      }`}
                    >
                      <span className="font-medium">Education</span>
                      <span>{candidateData.education}</span>
                    </div>
                    <div
                      className={`border-b py-3 flex justify-between ${
                        darkMode ? "border-gray-700" : "border-gray-200"
                      }`}
                    >
                      <span className="font-medium">Experience</span>
                      <span>{candidateData.experience}</span>
                    </div>
                  </div>
                </div>

                {/* Documents Section */}
                <div className="w-full mt-6 md:mt-0 flex flex-col items-center">
                  <div className="mt-8 w-full">
                    <div
                      className={`border rounded-md p-4 ${
                        darkMode
                          ? "border-gray-700 bg-gray-800"
                          : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Documents</span>
                        <span className="text-sm text-gray-500">
                          Click to download
                        </span>
                      </div>

                      <div className="flex items-center gap-[10px]">
                        <a
                          href={candidateData.resumeUrl}
                          target="_blank"
                          className={`w-full py-2 px-4 border rounded-md text-center transition-all ${
                            darkMode
                              ? "border-gray-600 bg-gray-700 text-white hover:bg-gray-600"
                              : "border-gray-200 bg-white hover:bg-gray-50"
                          }`}
                        >
                          Resume
                        </a>

                        {/* <a
                          href={candidateData.coverLetter}
                          target="_blank"
                          className={`w-full py-2 px-4 border rounded-md text-center transition-all ${
                            darkMode
                              ? "border-gray-600 bg-gray-700 text-white hover:bg-gray-600"
                              : "border-gray-200 bg-white hover:bg-gray-50"
                          }`}
                        >
                          Cover Letter
                        </a> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interviews Section */}
            <div className="space-y-6 w-3/5">
              {mergedData.map((interview, index) => (
                <div
                  key={index}
                  className={`rounded-lg shadow-md overflow-hidden ${
                  darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                  }`}
                >
                  <div className={`p-4 border-b flex justify-between items-center ${
                      darkMode ? "border-gray-700" : "border-gray-200"
                    }`}>
                    <h2 className="text-lg font-medium">Interviews</h2>
                    <span className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>{interview.assignedManager}</span>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="mb-4 md:mb-0">
                        <h3 className="text-lg font-medium">{interview.companyName}</h3>
                        <div className="flex items-center mt-2">
                          <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">
                            {interview.interviewMode}
                          </span>
                          <span className={`ml-4 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                            {interview.dateInterview},{interview.timeInterview}
                          </span>
                        </div>
                        <div className="mt-2">
                          <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Meet Link - </span>
                          <a
                            href={interview.meetingLink}
                            className="text-sm text-blue-500"
                          >
                            {interview.meetingLink}
                          </a>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <p className={`mb-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Interview Panel Members</p>
                          <div className="flex gap-2">
                            {interview.interviewPanelMembers.map((avatar, i) => (
                              <div
                                key={i}
                                className=""
                              >
                                <span>{avatar}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* <div>
                          <p className={`mb-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Interiew Panel</p>
                          <div className="flex -space-x-2">
                            {interview.interviewPanel.map((avatar, i) => (
                              <div
                                key={i}
                                className="w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                              >
                                <img
                                  src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=50&q=80"
                                  alt="Avatar"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CandidateProfile;
