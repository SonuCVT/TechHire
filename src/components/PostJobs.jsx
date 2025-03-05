import React, { useState } from "react";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { postJob } from "../utils/addPostjobSlice";

const PostJobs = () => {
  const dispatch =useDispatch();
  const navigate =useNavigate()
  const [formData, setFormData] = useState({
    jobTitle: "",
    location: "",
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
    dispatch(postJob(formData));
    navigate("/jobopening")
    //console.log("Job Posted:", formData);
  };

  return (
    <>
    <Header/>
    <div className="p-6 bg-white rounded-xl shadow-md w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
        Post Your Job Here
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600 font-medium">Job Title:</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            placeholder="Enter Job Title"
            required
          />
        </div>
        <div>
          <label className="block text-gray-600 font-medium">Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            placeholder="Enter Job Location"
            required
          />
        </div>
        <div>
          <label className="block text-gray-600 font-medium">Experience Level:</label>
          <input
            type="text"
            name="experienceLevel"
            value={formData.experienceLevel}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            placeholder="Enter Experience Level"
            required
          />
        </div>
        <div>
          <label className="block text-gray-600 font-medium">Job Type:</label>
          <div className="flex space-x-4">
            {["Full-time", "Part-time", "Contract", "Internship"].map((type) => (
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
            ))}
          </div>
        </div>
        <div>
          <label className="block text-gray-600 font-medium">Salary Range:</label>
          <input
            type="text"
            name="salaryRange"
            value={formData.salaryRange}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            placeholder="Enter Salary Range"
            required
          />
        </div>
        <div>
          <label className="block text-gray-600 font-medium">Job Description:</label>
          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            placeholder="Enter Job Description"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-600 font-medium">Skills/Technologies:</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            placeholder="Enter Required Skills"
            required
          />
        </div>
        <div>
          <label className="block text-gray-600 font-medium">Application Deadline:</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Post Job
          </button>
      </form>
    </div>
    </>
  );
};

export default PostJobs;
