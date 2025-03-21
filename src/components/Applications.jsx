import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Applications = () => {
  const [search, setSearch] = useState("");
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const response = await axios.get("/api/job_applied");
      setApplications(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Shortlist candidate (select)
  const selected = async (jobAppliedId) => {
    try {
      await axios.post(`/api/shortlist/${jobAppliedId}`);
      alert("Candidate shortlisted successfully!");
      fetchApplications(); // Refresh applications
    } catch (error) {
      console.error("Error shortlisting candidate:", error);
      alert("Failed to shortlist candidate.");
    }
  };

  // Reject candidate (delete)
  const rejectApplication = async (jobId, candidateId) => {
    try {
      await axios.delete(`/api/job_applied/${jobId}/${candidateId}`);
      alert("Candidate rejected successfully!");
      fetchApplications(); // Refresh applications
    } catch (error) {
      console.error("Error rejecting candidate:", error);
      alert("Failed to reject candidate.");
    }
  };

  // Filter applications where status is "pending"
  const filteredApplications = applications
    .filter((app) => app.status === "Pending")
    .filter(
      (app) =>
        (app.name?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (app.appliedFor?.toLowerCase() || "").includes(search.toLowerCase())
    );

  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 p-6">
          {/* Search Bar */}
          <div className="flex items-center bg-white p-2 px-3 rounded-full shadow-md w-full mb-6 border border-gray-300">
            <input
              type="text"
              placeholder="Search by name or job title"
              className="w-full outline-none text-gray-700"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Applications List */}
          <div className="w-full grid grid-cols-2 gap-3">
            {filteredApplications.length > 0 ? (
              filteredApplications.map((app) => (
                <div
                  key={app.id}
                  className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex justify-between"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      <span className="text-gray-700">{app.name}</span>
                      <span className="text-sm text-gray-500"> {app.role}</span>
                    </h3>
                    <p className="text-gray-600">
                      Applied for: <span className="font-medium">{app.appliedFor}</span>
                    </p>
                    <p className="text-gray-600">Email: {app.email}</p>
                    <p className="text-gray-600">Phone: {app.phoneNumber}</p>
                    <p className="text-blue-500">
                      Resume:{" "}
                      <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" className="underline">
                        View Resume
                      </a>
                    </p>
                  </div>

                  <div className="flex flex-col justify-between">
                    <div className="toprow flex gap-3">
                      <button 
                        className="text-white px-6 py-1 cursor-pointer rounded-full mt-2 bg-green-600 hover:bg-[#2b3c52] transition"
                        onClick={() => selected(app.id)}
                      >
                        Select
                      </button>
                      <button
                        className="text-white px-6 py-1 cursor-pointer rounded-full mt-2 bg-red-600 hover:bg-[#2b3c52] transition"
                        onClick={() => rejectApplication(app.jobId, app.candidateId)}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No pending applications found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Applications;
