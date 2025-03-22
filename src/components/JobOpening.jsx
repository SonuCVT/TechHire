import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaAndroid,
  FaPython,
  FaDatabase,
  FaFigma,
  FaCode,
  FaJava,
  FaBeer,
} from "react-icons/fa";

import UserDashboardHeader from "./UserDashboardHeader";
import useFetchJobs from "../hooks/useFetchJobs";

const JobOpening = () => {
  useFetchJobs();
  const jobs = useSelector((state) => state.addpostjob.jobs);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const {name,email,resumeUrl,address,phoneNumber} = useSelector((state) => state.updateuser); // Candidate details

  const [filters, setFilters] = useState({
    category: "",
    location: "",
  });

  const [activeCategory, setActiveCategory] = useState(null);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const handleShowAllJobs = () => {
    setFilters({ category: "", location: "" });
  };

  const jobCategories = [
    { name: "Android Developer", icon: <FaAndroid /> },
    { name: "Python Developer", icon: <FaPython /> },
    { name: "Backend Developer", icon: <FaDatabase /> },
    { name: "Software Engineer", icon: <FaBeer /> },
    { name: "Full Stack Developer", icon: <FaCode /> },
    { name: "Java Developer", icon: <FaJava /> },
  ];

  const jobCounts = jobCategories.reduce((acc, category) => {
    acc[category.name] = jobs.filter(
      (job) =>
        job.title &&
        job.title.toLowerCase().includes(category.name.toLowerCase())
    ).length;
    return acc;
  }, {});

  const filteredJobs = jobs.filter((job) => {
    return (
      job.title &&
      (!filters.category ||
        job.title.toLowerCase().includes(filters.category.toLowerCase())) &&
      (!filters.location ||
        job.location?.toLowerCase().includes(filters.location.toLowerCase()))
    );
  });

  // Apply Job Function
  const applyjobs = (selectedJobId,appliedFor) => {
    console.log(selectedJobId)
    // const selectedJob = jobs.find((job) => job.jobId === selectedJobId);

    // if (!selectedJob) {
    //   toast.error("Job not found!");
    //   return;
   // }

    const jobId = selectedJobId;
    const candidateId = "67cabdc4c51cf2795d0e0213";

    if (!candidateId) {
      toast.error("Please log in to apply for jobs!");
      return;
    }

    const applicationData = {
      jobId,
      candidateId,
      appliedFor,
      name,
      email,
      phoneNumber,
      resumeUrl,
      address,
    };

    axios
      .post(`/api/job_applied/${jobId}/${candidateId}`, applicationData)
      .then((response) => {
        //toast.success("Job application submitted successfully!");
        alert("Job application submitted successfully!")
      })
      .catch((error) => {
        console.error("Error applying for job:", error);
        toast.error("Failed to apply. Please try again.");
      });
  };

  return (
    <>
      <UserDashboardHeader />
      <div
        className={`transition-all ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
        }`}
      >
        <div
          className={`relative p-8 text-center rounded-lg ${
            darkMode ? "bg-gray-800" : "bg-blue-100"
          }`}
        >
          <h1 className="text-4xl font-bold">Find Your Dream Job Here</h1>
          <div className="flex justify-center mt-4 space-x-2">
            <input
              type="text"
              placeholder="Keywords"
              className="border p-2 rounded-md bg-transparent"
            />
            <input
              type="text"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              placeholder="Location"
              className="border p-2 rounded-md bg-transparent"
            />
            <input
              type="text"
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              placeholder="Roles"
              className="border p-2 rounded-md bg-transparent"
            />
          </div>
        </div>

        <div className="p-6 grid grid-cols-3 gap-4">
          {jobCategories.map((category) => (
            <button
              key={category.name}
              className={`flex flex-col items-center justify-center p-6 border rounded-lg shadow-md transition duration-300 cursor-pointer hover:bg-[#48596f] hover:text-white ${
                darkMode ? "bg-gray-700 text-white" : "bg-white"
              } ${
                activeCategory === category.name
                  ? "!bg-[#48596f] text-white"
                  : ""
              } ${filters.category === category.name ? "bg-blue-500" : ""}`}
              onClick={() =>
                setFilters(
                  { ...filters, category: category.name },
                  handleCategoryClick(category.name)
                )
              }
            >
              <div className="text-3xl">{category.icon}</div>
              <h3 className="mt-2 text-lg font-semibold">{category.name}</h3>
              <p className="text-sm">({jobCounts[category.name] || 0} jobs)</p>
            </button>
          ))}
        </div>

        <div className="flex mt-3">
          <div
            className={`w-1/4 p-4 border-r ${
              darkMode ? "border-gray-600" : "border-gray-300"
            }`}
          >
            <h2 className="font-semibold text-lg">By Category:</h2>
            {jobCategories.map((category) => (
              <label key={category.name} className="block">
                <input
                  type="radio"
                  name="category"
                  value={category.name}
                  checked={filters.category === category.name}
                  onChange={handleFilterChange}
                  className="mr-2"
                />
                {category.name}
              </label>
            ))}

            <h2 className="font-semibold text-lg mt-4">By Location:</h2>
            {["Mumbai", "Delhi", "Noida", "Lucknow", "Bangalore"].map(
              (location) => (
                <label key={location} className="block">
                  <input
                    type="radio"
                    name="location"
                    value={location}
                    checked={filters.location === location}
                    onChange={handleFilterChange}
                    className="mr-2"
                  />
                  {location}
                </label>
              )
            )}

            <button
              onClick={handleShowAllJobs}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded w-full cursor-pointer"
            >
              Show All Jobs
            </button>
          </div>

          <div className="w-3/4 p-4 h-[40vh] overflow-y-scroll">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className={`p-4 border rounded-lg shadow-md mb-4 flex justify-between items-end ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <div>
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <p><strong>Company:</strong> {job.company}</p>
                    <p><strong>Location:</strong> {job.location}</p>
                    <p><strong>Experience:</strong> {job.experienceLevel} years</p>
                    <p><strong>Salary:</strong> {job.salary} CTC</p>
                  </div>
                  <button className="px-4 py-2 bg-[#48596f] text-white cursor-pointer rounded" onClick={() => applyjobs(job.id,job.title)}>
                    Apply
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No jobs found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default JobOpening;
