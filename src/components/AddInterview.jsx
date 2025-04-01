import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { addInterview } from "../utils/addInterviewSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddInterview = () => {
  const [candidate, setCandidate] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const candidateId = useSelector((state) => state.addinterview.addCandidateId);

  useEffect(() => {
    const fetchCandidateData = async () => {
      if (!candidateId) {
        alert("Please select a candidate whose coding round is clear.");
        navigate("/candidates");
        return;
      }

      try {
        const response = await fetch(`/api/codingRound/candidate/${candidateId}`);
        if (!response.ok) throw new Error("Failed to fetch candidate details");

        const data = await response.json();
        if (data.length > 0) {
          setCandidate(data[0]); // Assuming the first record is the correct one
        }
      } catch (error) {
        console.error("Error fetching candidate:", error);
      }
    };

    fetchCandidateData();
  }, [candidateId, navigate]);

  // Initialize form data
  const [formData, setFormData] = useState({
    interviewMode: "",
    dateInterview: "",
    timeInterview: "",
    assignedManager: "",
    interviewPanelMembers: "",
    meetingLink: "",
  });

  useEffect(() => {
    if (candidate) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: candidate.candidateName || "",
        jobId: candidate.jobId || "", // Fetch job ID if available
      }));
    }
  }, [candidate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedTime = formData.timeInterview ? `${formData.timeInterview}:00` : "";
    const interviewData = {
      candidateId: candidateId,
      name: candidate.candidateName, // Automatically filled from backend
      interviewMode: formData.interviewMode,
      dateInterview: formData.dateInterview,
      timeInterview: formattedTime,
      assignedManager: formData.assignedManager,
      interviewPanelMembers: formData.interviewPanelMembers.split(","), // Convert to array
      meetingLink: formData.meetingLink,
      jobId: candidate.jobId,
    };
     const jobid=candidate.jobId;
    try {
      const response = await fetch(`/api/addInterviews/${candidateId}/${jobid}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(interviewData),
      });

      if (!response.ok) {
        throw new Error("Failed to schedule interview");
      }

      toast.success("Interview scheduled successfully!");
      navigate("/interviews");
    } catch (error) {
      console.error("Error scheduling interview:", error);
      toast.error("Failed to schedule interview!");
    }
  };

  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 p-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b-2 pb-2">
            Add Interview Details :
          </h2>
          <div className="max-w-5xl bg-white p-8 rounded-xl shadow-md">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Candidate Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Interview Mode
                </label>
                <input
                  type="text"
                  name="interviewMode"
                  value={formData.interviewMode}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                  placeholder="Online / Offline"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Date of Interview
                </label>
                <input
                  type="date"
                  name="dateInterview"
                  value={formData.dateInterview}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Time of Interview
                </label>
                <input
                  type="time"
                  name="timeInterview"
                  value={formData.timeInterview}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Assigned Manager
                </label>
                <input
                  type="text"
                  name="assignedManager"
                  value={formData.assignedManager}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter manager's name"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Interview Panel Members
                </label>
                <input
                  type="text"
                  name="interviewPanelMembers"
                  value={formData.interviewPanelMembers}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                  placeholder="Panel members"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Interview Meeting Link
                </label>
                <input
                  type="text"
                  name="meetingLink"
                  value={formData.meetingLink}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                  placeholder="Meeting link"
                />
              </div>
              <div className="md:col-span-2 flex justify-start">
                <button
                  type="submit"
                  className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition shadow-md font-semibold"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddInterview;
