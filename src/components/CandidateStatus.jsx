import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const CandidateStatus = () => {
  const [shortlistedFilter, setShortlistedFilter] = useState(""); // New state for filtering "Shortlisted"

  const candidates = [
    {
      id: 1,
      status: "in progress",
      round: "Shortlisted",
      name: "Candidate Name",
      position: "Full Stack",
      appliedDate: "Mar 3, 2020",
      completed: false,
    },
    {
      id: 2,
      status: "completed",
      round: "OA Round",
      name: "Candidate Name",
      position: "React Developer",
      appliedDate: "Mar 3, 2020",
      completed: true,
    },
    {
      id: 3,
      status: "in progress",
      round: "Shortlisted",
      name: "Candidate Name",
      position: "SDE",
      appliedDate: "Mar 3, 2020",
      completed: false,
    },
    {
      id: 4,
      status: "completed",
      round: "Coding Round",
      name: "Candidate Name",
      position: "Position Applied",
      appliedDate: "Mar 3, 2020",
      completed: true,
    },
    {
      id: 5,
      status: "in progress",
      round: "Shortlisted",
      name: "Candidate Name",
      position: "Backend",
      appliedDate: "Mar 3, 2020",
      completed: false,
    },
    {
      id: 6,
      status: "completed",
      round: "OA Round",
      name: "Candidate Name",
      position: "Position Applied",
      appliedDate: "Mar 3, 2020",
      completed: true,
    },
    {
      id: 7,
      status: "in progress",
      round: "Shortlisted",
      name: "Candidate Name",
      position: "Frontend",
      appliedDate: "Mar 3, 2020",
      completed: false,
    },
    {
      id: 8,
      status: "in progress",
      round: "Shortlisted",
      name: "Candidate Name",
      position: "Data Analytics",
      appliedDate: "Mar 3, 2020",
      completed: false,
    },
    {
      id: 9,
      status: "in progress",
      round: "Shortlisted",
      name: "Candidate Name",
      position: "Full Stack",
      appliedDate: "Mar 3, 2020",
      completed: false,
    },
  ];

  return (
    <>
      <Header />
      <div className="flex bg-gray-100">
        <Sidebar />

        <div className="flex-grow p-6 overflow-hidden">
          <div className="grid grid-cols-3 gap-6">
            {["Shortlisted", "OA Round", "Coding Round"].map((round) => (
              <div
                key={round}
                className="bg-white p-6 rounded-xl shadow-md h-[80vh] overflow-y-scroll"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{round}</h3>

                  {/* Filter for "Shortlisted" Candidates Only */}
                  {round === "Shortlisted" && (
                    <div>
                      <select
                        className="border border-gray-300 rounded-md p-2"
                        value={shortlistedFilter}
                        onChange={(e) => setShortlistedFilter(e.target.value)}
                      >
                        <option value="">All Positions</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Full Stack">Full Stack</option>
                        <option value="Data Analytics">Data Analytics</option>
                        <option value="Data Engineer">Data Engineer</option>
                        <option value="SDE">SDE</option>
                      </select>
                    </div>
                  )}
                </div>

                <div className="">
                  {candidates
                    .filter((c) => c.round === round)
                    .filter((c) =>
                      round === "Shortlisted"
                        ? shortlistedFilter
                          ? c.position === shortlistedFilter
                          : true
                        : true
                    )
                    .map((candidate) => (
                      <div
                        key={candidate.id}
                        className="border rounded-lg p-4 mb-4 shadow-sm"
                      >
                        <span
                          className={`px-3 py-1 text-sm font-medium rounded-full ${
                            candidate.completed
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {candidate.status}
                        </span>
                        <p className="mt-2 font-medium">{candidate.name}</p>
                        <p className="text-sm text-gray-600">
                          {candidate.position}
                        </p>
                        <p className="text-xs text-gray-500">
                          Applied: {candidate.appliedDate}
                        </p>
                        <div className="mt-3 flex gap-2">
                          <button className="text-sm px-3 py-1 bg-red-100 text-red-600 cursor-pointer rounded-md">
                            Contact Info
                          </button>
                          <button className="text-sm px-3 py-1 bg-blue-100 text-blue-600 cursor-pointer rounded-md">
                            View Resume
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CandidateStatus;
