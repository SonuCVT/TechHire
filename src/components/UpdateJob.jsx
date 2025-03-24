import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { updateJob } from "../utils/addPostjobSlice"; // Redux action
import axios from "axios";
import Header from "./Header";
import Sidebar from "./Sidebar"; 

const UpdateJobs = () => {
  const location = useLocation();
  const job = location.state?.job || {}; // Get existing job details
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(job); // Pre-fill with existing data

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create a new object, keeping only non-empty fields
    const updatedJobData = { ...job }; // Start with previous job data
  
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== "" && formData[key] !== undefined) {
        updatedJobData[key] = formData[key]; // Only update changed fields
      }
    });
  
    console.log("Final data sent to backend:", updatedJobData);
  
    try {
      const response = await axios.put(`/api/jobs_posting/${job.id}`, updatedJobData);
      dispatch(updateJob(response.data)); // Update Redux store
      alert("Job updated successfully!");
      navigate("/jobs-management");
    } catch (error) {
      console.error("Error updating job:", error);
      alert("Failed to update job!");
    }
  };
  
  
  
  


  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-10 -m-3">
          <div className="bg-white rounded-xl shadow-md w-full max-w-5xl mx-auto p-8">
            <h2 className="text-3xl font-semibold text-gray-700 mb-6 text-center">
              Update the job details
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-600 font-medium">
                  Job Title:
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="Enter Job Title"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 font-medium">
                    Location:
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Enter Job Location"
                    
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium">
                    Experience Level:
                  </label>
                  <input
                    type="text"
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Enter Experience Level"
                    
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-600 font-medium">
                  Job Type:
                </label>
                <div className="flex space-x-6">
                  {["Full-time", "Part-time", "Contract", "Internship"].map(
                    (type) => (
                      <label key={type} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="jobType"
                          value={type}
                          checked={formData.jobType === type}
                          onChange={handleChange}
                          className="form-radio text-blue-500"
                        />
                        <span>{type}</span>
                      </label>
                    )
                  )}
                </div>
              </div>
              <div>
                <label className="block text-gray-600 font-medium">
                  Salary Range:
                </label>
                <input
                  type="text"
                  name="salaryRange"
                  value={formData.salaryRange}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="Enter Salary Range"
                  
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium">
                  Job Description:
                </label>
                <textarea
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="Enter Job Description"
                  rows="4"
                  
                ></textarea>
              </div>
              <div>
                <label className="block text-gray-600 font-medium">
                  Skills/Technologies:
                </label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="Enter Required Skills"
                 
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium">
                  Application Deadline:
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
              >
                Update Job
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateJobs;
