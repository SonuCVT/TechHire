import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Sidebar from "./Sidebar";

const CandidateStatus = () => {
  const [shortlistedFilter, setShortlistedFilter] = useState(""); 
  const [shortlistedCandidates, setShortlistedCandidates] = useState([]); 
  const [hoveredCandidateId, setHoveredCandidateId] = useState(null); // Track hovered candidate ID

  // Static data for "OA Round" & "Coding Round"
  const staticCandidates = [
    { id: 2, status: "completed", round: "OA Round", candidateName: "Alice Johnson", appliedFor: "React Developer", appliedDate: "Mar 3, 2025", resumeUrl: "", email: "alice@example.com", phone: "123-456-7890", completed: true },
    { id: 4, status: "completed", round: "Coding Round", candidateName: "Bob Smith", appliedFor: "SDE", appliedDate: "Mar 3, 2025", resumeUrl: "", email: "bob@example.com", phone: "987-654-3210", completed: true },
  ];

  // Fetch shortlisted candidates from backend
  useEffect(() => {
    const fetchShortlistedCandidates = async () => {
      try {
        const response = await axios.get("/api/shortlist"); 
        setShortlistedCandidates(response.data); 
      } catch (error) {
        console.error("Error fetching shortlisted candidates:", error);
      }
    };

    fetchShortlistedCandidates();
  }, []);

  return (
    <>
      <Header />
      <div className="flex bg-gray-100">
        <Sidebar />

        <div className="flex-grow p-6 overflow-hidden">
          <div className="grid grid-cols-3 gap-6">
            {["Shortlisted", "OA Round", "Coding Round"].map((round) => (
              <div key={round} className="bg-white p-6 rounded-xl shadow-md h-screen">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{round}</h3>

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

                <div className="max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {(
                    round === "Shortlisted"
                      ? shortlistedCandidates.filter((c) =>
                          shortlistedFilter ? c.position === shortlistedFilter : true
                        )
                      : staticCandidates.filter((c) => c.round === round)
                  ).map((candidate) => (
                    <div key={candidate.id} className="border rounded-lg p-4 mb-4 shadow-sm relative">
                      <span
                        className={`px-3 py-1 text-sm font-medium rounded-full ${
                          candidate.completed
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {candidate.status}
                      </span>
                      <p className="mt-2 font-medium">{candidate.candidateName}</p>
                      <p className="text-sm text-gray-600">{candidate.appliedFor}</p>
                      <p className="text-xs text-gray-500">Applied: {candidate.appliedDate}</p>
                      <div className="mt-3 flex flex-col gap-2">
                        {/* Contact Info Button with Hover Tooltip Inside the Card */}
                        <div 
                          className="relative"
                          onMouseEnter={() => setHoveredCandidateId(candidate.id)}
                          onMouseLeave={() => setHoveredCandidateId(null)}
                        >
                          <button className="text-sm px-3 py-1 bg-red-100 text-red-600 cursor-pointer rounded-md w-full">
                            Contact Info
                          </button>

                          {/* Show contact details inside the card */}
                          {hoveredCandidateId === candidate.id && (
                            <div className="mt-2 bg-gray-100 p-2 rounded-md text-sm">
                              <p><strong>Email:</strong> {candidate.candidateEmail || "Not Available"}</p>
                              <p><strong>Phone:</strong> {candidate.phoneNumber || "Not Available"}</p>
                            </div>
                          )}
                        </div>

                        <button className="text-sm px-3 py-1 bg-blue-100 text-blue-600 cursor-pointer rounded-md">
                          <a href={candidate.resumeUrl} target="_blank" rel="noopener noreferrer">
                            View Resume
                          </a>
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
