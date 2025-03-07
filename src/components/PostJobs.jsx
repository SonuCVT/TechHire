import React, { useState } from "react";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { postJob } from "../utils/addPostjobSlice";
import Sidebar from "./Sidebar"; // Import Sidebar component

const PostJobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    jobTitle: "",
    location: "",
    companyName:"",
    experienceLevel: "",
    jobType: "",
    salaryRange: "",
    jobDescription: "",
    skills: "",
    deadline: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newJob = {
      id: Date.now(), // Unique ID for each job
      title: formData.jobTitle,
      company:formData.companyName , 
      location: formData.location,
      type: formData.jobType.toUpperCase(), // Ensure consistency
      salary: formData.salaryRange,
      jobDescription:formData.jobDescription,
      skills:formData.skills,
      deadline:formData.deadline
    };
    dispatch(postJob(newJob));
    navigate("/jobopening");
  };

  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content - Increased Width */}
        <div className="flex-1 p-10 -m-3">
          <div className="bg-white rounded-xl shadow-md w-full max-w-5xl mx-auto p-8">
            <h2 className="text-3xl font-semibold text-gray-700 mb-6 text-center">
              Post Your Job Here
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 font-medium">
                    Job Title:
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                    placeholder="Enter Job Title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium">
                    Company Name:
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                    placeholder="Enter Company Name"
                    required
                  />
               </div>
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
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                    placeholder="Enter Job Location"
                    required
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
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                    placeholder="Enter Experience Level"
                    required
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
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                  placeholder="Enter Salary Range"
                  required
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
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                  placeholder="Enter Job Description"
                  rows="4"
                  required
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
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                  placeholder="Enter Required Skills"
                  required
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
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
              >
                Post Job
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostJobs;
