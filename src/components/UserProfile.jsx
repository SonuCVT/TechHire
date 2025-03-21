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

  const user = useSelector((state) => state.user);
  const updateUser = useSelector((state) => state.updateuser);
  console.log(user);
  console.log(updateUser);

  const candidateData = {
    name: user.name,
    email: user.email,
    phone: "" || updateUser?.phoneNumber,
    address: "" || updateUser?.address,
    skills: updateUser?.skills || [],
    education: "" || updateUser?.education,
    experience: "" || updateUser?.experience,
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
