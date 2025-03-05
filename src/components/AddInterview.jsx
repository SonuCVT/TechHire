import React, { useState } from "react";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { addInterview } from "../utils/addInterviewSlice";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const AddInterview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    candidateName: "",
    interviewMode: "",
    dateOfInterview: "",
    timeOfInterview: "",
    assignedManager: "",
    panelMembers: "",
    meetingLink: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addInterview(formData));
    navigate("/interviews");
  };

  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b-2 pb-2">
            Add Interview Details :
          </h2>
          <div className="max-w-5xl bg-white p-8 rounded-xl shadow-md">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Candidate Name
                </label>
                <input
                  type="text"
                  name="candidateName"
                  value={formData.candidateName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter the candidate's name"
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
                  name="dateOfInterview"
                  value={formData.dateOfInterview}
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
                  name="timeOfInterview"
                  value={formData.timeOfInterview}
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
                  name="panelMembers"
                  value={formData.panelMembers}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                  placeholder="Panel members"
                />
              </div>
              <div className="md:col-span-2">
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