import React, { useState, useEffect } from "react";
import { Search, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "./UserDashboardHeader";
import Sidebar from "./UserDashboardSidebar";
import { useSelector } from "react-redux";
import axios from "axios";

const jobsPerPage = 9;

const JobsManagement = () => {
  const darkTheme = useSelector((state) => state.theme.darkMode);
  const {id} = useSelector(
      (state) => state.user
    );
  const candidateId = id;
  const [currentPage, setCurrentPage] = useState(1);
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    title: "",
    company: "",
    location: "",
    status: "",
    salaryRange: null,
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `/api/job_applied/candidate/${candidateId}`
        );
        console.log(response.data);
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs: ", error);
      }
    };
    fetchJobs();
  }, [candidateId]);

  const parseSalary = (salary) => {
    if (!salary) return { min: 0, max: 0 }; // Handle missing salary gracefully

    const [min, max] = salary.replace(/₹|,/g, "").split(" - ").map(Number);
    return { min, max };
  };

  const filteredJobs = jobs.filter((job) => {
    const jobSalary = parseSalary(job.salary);

    return (
      (filters.status === "" || job.status === filters.status) &&
      (filters.title === "" ||
        (job.appliedFor?.toLowerCase() || "").includes(
          filters.title.toLowerCase()
        )) &&
      (filters.company === "" ||
        (job.company?.toLowerCase() || "").includes(
          filters.company.toLowerCase()
        )) &&
      (filters.location === "" ||
        (job.location?.toLowerCase() || "").includes(
          filters.location.toLowerCase()
        )) &&
      (!filters.salaryRange ||
        (jobSalary.min >= filters.salaryRange.min &&
          jobSalary.max <= filters.salaryRange.max))
    );
  });

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage);

  const nextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkTheme ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
      }`}
    >
      <Header />
      <div
        className={`flex flex-1 ${
          darkTheme ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
        }`}
      >
        <Sidebar />
        <main
          className={`flex-1 bg-gray-50 p-6 ${
            darkTheme ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
          }`}
        >
          <div className="mb-6 flex gap-4">
            <input
              type="text"
              placeholder="Search by title, company, or keywords"
              className="p-2 border rounded w-full"
              onChange={(e) =>
                setFilters({ ...filters, title: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-3 gap-5">
            {currentJobs.map((job) => (
              <div
                key={job.id}
                className={`relative rounded-lg shadow-sm p-4 ${
                  darkTheme ? "bg-gray-600 text-white" : "bg-white text-black"
                }`}
              >
                {/* Status on Top Right */}
                <div
                  className={`absolute top-2 right-2 text-xs font-semibold px-2 py-1 rounded-md 
                  ${
                    job.status === "Accepted"
                      ? "bg-green-500 text-white"
                      : job.status === "Rejected"
                      ? "bg-red-500 text-white"
                      : "bg-yellow-500 text-white"
                  }`}
                >
                  {job.status}
                </div>

                {/* Job Title */}
                <h3 className="text-lg font-medium">{job.appliedFor}</h3>

                {/* Company Name */}
                <div
                  className={`text-sm ${
                    darkTheme ? "text-slate-300" : "text-gray-600"
                  }`}
                >
                  {job.company}
                </div>

                {/* Location */}
                <div
                  className={`flex items-center gap-2 text-sm mt-2 ${
                    darkTheme ? "text-slate-400" : "text-gray-500"
                  }`}
                >
                  <MapPin size={16} /> {job.location}
                </div>

                {/* Salary */}
                <div
                  className={`mt-4 text-sm ${
                    darkTheme ? "text-white" : "text-gray-600"
                  }`}
                >
                  ₹{job.salary}
                </div>
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center">
              <button
                className="p-2 cursor-pointer"
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`p-2 cursor-pointer ${
                    currentPage === i + 1 ? "bg-blue-500 text-white" : ""
                  }`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="p-2 cursor-pointer"
                onClick={nextPage}
                disabled={currentPage === totalPages}
              >
                <ChevronRight />
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default JobsManagement;
