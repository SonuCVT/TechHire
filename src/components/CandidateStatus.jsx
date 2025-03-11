import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const CandidateStatus = () => {
  const candidates = [
    { id: 1, status: "in progress", round: "Shortlisted", name: "Candidate Name", position: "Position Applied", appliedDate: "Mar 3, 2020", completed: false },
    { id: 2, status: "completed", round: "OA Round", name: "Candidate Name", position: "Position Applied", appliedDate: "Mar 3, 2020", completed: true },
    { id: 3, status: "in progress", round: "OA Round", name: "Candidate Name", position: "Position Applied", appliedDate: "Mar 3, 2020", completed: false },
    { id: 4, status: "completed", round: "Coding Round", name: "Candidate Name", position: "Position Applied", appliedDate: "Mar 3, 2020", completed: true },
    { id: 5, status: "in progress", round: "Shortlisted", name: "Candidate Name", position: "Position Applied", appliedDate: "Mar 3, 2020", completed: false },
    { id: 6, status: "completed", round: "OA Round", name: "Candidate Name", position: "Position Applied", appliedDate: "Mar 3, 2020", completed: true },
    { id: 7, status: "in progress", round: "Coding Round", name: "Candidate Name", position: "Position Applied", appliedDate: "Mar 3, 2020", completed: false },
  ];

  return (
    <>
      <Header />
      <div className="flex bg-gray-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-grow p-6 overflow-hidden">
          <div className="grid grid-cols-3 gap-6">
            {["Shortlisted", "OA Round", "Coding Round"].map((round) => (
              <div key={round} className="bg-white p-6 rounded-xl shadow-md h-screen">
                <h3 className="text-lg font-semibold mb-4">{round}</h3>
                <div className="max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {candidates
                    .filter((c) => c.round === round)
                    .map((candidate) => (
                      <div key={candidate.id} className="border rounded-lg p-4 mb-4 shadow-sm">
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${candidate.completed ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                          {candidate.status}
                        </span>
                        <p className="mt-2 font-medium">{candidate.name}</p>
                        <p className="text-sm text-gray-600">{candidate.position}</p>
                        <p className="text-xs text-gray-500">Applied: {candidate.appliedDate}</p>
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
