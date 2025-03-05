import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";

const Interview = () => {
  const interviews = useSelector((state) => state.addinterview.interview);

  return (
    <>
      <Header />

      {/* Layout Container */}
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Header Section */}
          <div className="flex items-center justify-between border-b pb-4">
            <h1 className="text-3xl font-semibold text-gray-900">Interviews</h1>
            <Link
              to="/addinterview"
              className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-900 transition shadow-md"
            >
              Add Interview
            </Link>
          </div>

          {/* Interview List */}
          <div className="mt-6 grid grid-cols-2 gap-6">
            {interviews.length > 0 ? (
              interviews.map((interview, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg border w-full hover:shadow-lg transition"
                >
                  {/* Header */}
                  <div className="flex justify-between items-center px-6 py-3 border-b bg-gray-50">
                    <h2 className="text-lg font-semibold text-gray-800">Interview</h2>
                    <p className="text-gray-600 text-sm">
                      Scheduled For -{" "}
                      <span className="font-medium">{interview.candidateName}</span> (
                      {interview.dateOfInterview})
                    </p>
                  </div>

                  {/* Main Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-bold">
                          {interview.interviewType || "Technical Test"}
                        </h3>
                        <p className="text-gray-700">
                          {interview.dateOfInterview}, {interview.timeOfInterview}
                        </p>
                        <p className="text-gray-500">
                          Meet Link -{" "}
                          <a
                            href={interview.meetingLink}
                            className="text-blue-500 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {interview.meetingLink}
                          </a>
                        </p>
                      </div>
                      <span className="bg-gray-700 text-white px-3 py-1 rounded-md text-sm">
                        {interview.interviewMode || "Online Mode"}
                      </span>
                    </div>
                  </div>

                  {/* Footer Section */}
                  <div className="grid grid-cols-2 border-t p-6 bg-gray-50 text-gray-700">
                    <div>
                      <h4 className="font-semibold">Assigned Manager</h4>
                      <p>{interview.assignedManager}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Interview Panel</h4>
                      <p>{interview.panelMembers}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center">No interviews scheduled yet.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Interview;
