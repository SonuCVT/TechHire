import React, { useState } from "react";
import { Search, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import useFetchJobs from "../hooks/useFetchJobs";
import { useDispatch, useSelector } from "react-redux";
import { deleteJob, updateJob } from "../utils/addPostjobSlice"; 
import axios from "axios";

const jobsPerPage = 9;

const salaryRanges = [
  { label: "₹0 - ₹50,000", min: 0, max: 50000 },
  { label: "₹50,000 - ₹1,00,000", min: 50000, max: 100000 },
  { label: "₹1,00,000 - ₹2,00,000", min: 100000, max: 200000 },
];

const JobsManagement = () => {
  useFetchJobs();
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.addpostjob.jobs);
  let navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    type: "",
    title: "",
    company: "",
    location: "",
    salaryRange: null,
  });

  const parseSalary = (salary) => {
    if (typeof salary !== "string") return { min: 0, max: 0 };
    const [min, max] = salary.replace(/₹|,/g, "").split(" - ").map(Number);
    return { min, max };
  };

  const handleDelete = async (jobId) => {
    try {
      await axios.delete(`/api/jobs_posting/${jobId}`);
      dispatch(deleteJob(jobId));
      alert("Job deleted successfully!");
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job!");
    }
  };

  const handleUpdate = (job) => {
    navigate(`/update-job/${job.id}`, { state: { job } });
  };

  const filteredJobs = jobs.filter((job) => {
    const jobSalary = parseSalary(job.salary);
    return (
      (filters.type === "" || job.type === filters.type) &&
      (filters.title === "" ||
        job.title.toLowerCase().includes(filters.title.toLowerCase())) &&
      (filters.company === "" ||
        job.company.toLowerCase().includes(filters.company.toLowerCase())) &&
      (filters.location === "" ||
        job.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (!filters.salaryRange ||
        (jobSalary.min >= filters.salaryRange.min &&
          jobSalary.max <= filters.salaryRange.max))
    );
  });

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-gray-50 p-6">
          <div className="mb-6 flex gap-4">
            <input
              type="text"
              placeholder="Search by title, company, or keywords"
              className="p-2 border rounded w-full"
              onChange={(e) =>
                setFilters({ ...filters, title: e.target.value })
              }
            />
            <select
              className="p-2 border rounded"
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="">Job Type</option>
              <option value="FULL-TIME">Full-Time</option>
              <option value="PART-TIME">Part-Time</option>
              <option value="INTERNSHIP">Internship</option>
            </select>
            <select
              className="p-2 border rounded"
              onChange={(e) =>
                setFilters({ ...filters, location: e.target.value })
              }
            >
              <option value="">Location</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Pune">Pune</option>
              <option value="Delhi">Delhi</option>
            </select>
            <select
              className="p-2 border rounded"
              onChange={(e) => {
                const selectedRange = salaryRanges.find(
                  (range) => range.label === e.target.value
                );
                setFilters({ ...filters, salaryRange: selectedRange });
              }}
            >
              <option value="">Select Salary Range</option>
              {salaryRanges.map((range) => (
                <option key={range.label} value={range.label}>
                  {range.label}
                </option>
              ))}
            </select>
            <button
              className="bg-gray-200 px-4 py-2 rounded cursor-pointer"
              onClick={() =>
                setFilters({
                  type: "",
                  title: "",
                  company: "",
                  location: "",
                  salaryRange: null,
                })
              }
            >
              Reset
            </button>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {currentJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium">{job.title}</h3>
                    <div className="text-gray-600 text-sm">{job.company}</div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
                      <MapPin size={16} /> {job.location}
                    </div>
                    <div className="mt-4 text-gray-600 text-sm">
                    ₹{job.salary.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span
                    className={`
                      px-3 py-1 rounded-full text-xs font-medium
                      ${
                        job.jobType === "FULL-TIME"
                          ? "bg-green-100 text-green-800"
                          : job.jobType === "PART-TIME"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-purple-100 text-purple-800"
                      }
                    `}
                  >
                    {job.jobType}
                  </span>
                </div>

                <div className="mt-4 flex justify-between">
                  <button
                    className="text-white px-4 py-1 cursor-pointer rounded-full bg-[#48596f] hover:bg-[#2b3c52] transition"
                    onClick={() => handleUpdate(job)}
                  >
                    Update
                  </button>
                  <button
                    className="text-white px-4 py-1 cursor-pointer rounded-full bg-[#d9534f] hover:bg-[#c9302c] transition"
                    onClick={() => handleDelete(job.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-6 flex justify-center">
              <button
                className="p-2 cursor-pointer"
                onClick={() => setCurrentPage(currentPage - 1)}
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
                onClick={() => setCurrentPage(currentPage + 1)}
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
