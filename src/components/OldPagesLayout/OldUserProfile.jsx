import React from "react";
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

const CandidateProfile = () => {
  const darkMode = useSelector((state) => state.theme.darkMode); // Get dark mode state

  const candidateData = {
    name: "Sumit Desai",
    phone: "7800181112",
    location: "Mumbai",
    profileCompletion: 79,
    matched: {
      items: ["Education", "Skills", "Experience"],
      icon: <CheckCircle className="text-green-500" size={20} />,
    },
    against: {
      items: ["Location", "Salary expectation"],
      icon: <XCircle className="text-red-500" size={20} />,
    },
    skills: "HTML, CSS, Java, JavaScript, React, Spring",
    education: "2025 Bachelors of Engineering, Mumbai University",
    experience: "1 Year",
    salary: "4 Lakhs Current / 8 Lakhs Expected",
    noticePeriod: "30 Days",
    documents: [
      { name: "Resume", verified: true },
      { name: "Cover Letter", verified: false },
      { name: "Attachments", verified: false },
    ],
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
                  <div className="flex items-start space-x-4 mb-6">
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
                          <span>{candidateData.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Profile Completion Bar */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-2 relative">
                      <span
                        className={`${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Profile completion
                      </span>
                      <div className="flex items-center">
                        <span className="text-sm text-blue-500 absolute bottom-[-40px]">
                          {candidateData.profileCompletion}%
                        </span>
                        <button className="text-blue-500">
                          <Edit size={16} />
                          <span className="ml-1">Edit</span>
                        </button>
                      </div>
                    </div>

                    <div
                      className={`w-full rounded-full h-2.5 ${
                        darkMode ? "bg-gray-700" : "bg-gray-200"
                      }`}
                    >
                      <div
                        className="bg-blue-500 h-2.5 rounded-full"
                        style={{ width: `${candidateData.profileCompletion}%` }}
                      ></div>
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
                      <span>{candidateData.skills}</span>
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
                        {candidateData.documents.map((doc, index) => (
                          <button
                            key={index}
                            className={`w-full py-2 px-4 border rounded-md text-center transition-all ${
                              darkMode
                                ? "border-gray-600 bg-gray-700 text-white hover:bg-gray-600"
                                : "border-gray-200 bg-white hover:bg-gray-50"
                            }`}
                          >
                            {doc.name}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center mt-4 justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                            <span className="text-sm">Verified</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                            <span className="text-sm">Unverified</span>
                          </div>
                        </div>
                        <button className="text-blue-500 text-sm flex items-center">
                          <Download size={14} className="mr-1" />
                          Download All
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interviews Section */}
            <InterviewCard />
          </div>
        </main>
      </div>
    </div>
  );
};

export default CandidateProfile;
