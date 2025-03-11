import React, { useState } from "react";
import { Search, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteJob } from "../utils/addPostjobSlice";

const jobsPerPage = 15; // Jobs per page

// const jobsLists = [
//   {
//     id: 1,
//     title: "Technical Support Specialist",
//     company: "Google Inc.",
//     location: "Bangalore, India",
//     type: "PART-TIME",
//     salary: "₹6,00,000 - ₹9,00,000",
//   },
//   {
//     id: 2,
//     title: "Senior UX Designer",
//     company: "Microsoft",
//     location: "Hyderabad, India",
//     type: "FULL-TIME",
//     salary: "₹12,00,000 - ₹18,00,000",
//   },

//];

const JobsManagement = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const jobsLists = useSelector((state) => state.addpostjob.jobs);

  const routeChange = () => {
    let path = `/update-job`;
    navigate(path);
  };

  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState({
    type: "",
    title: "",
    company: "",
    location: "",
    salary: 2000000,
  });

  // Filtering jobs based on selected filters
  const filteredJobs = jobsLists.filter((job) => {
    return (
      (filters.type === "" || job.type === filters.type) &&
      (filters.title === "" || job.title.includes(filters.title)) &&
      (filters.company === "" || job.company.includes(filters.company)) &&
      (filters.location === "" || job.location.includes(filters.location)) &&
      (filters.salary === "" || job.salary.includes(filters.salary))
    );
  });

  // Update filter state when selecting from dropdowns
  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const goToPage = (page) => setCurrentPage(page);

  const handleDelete = (jobId) => {
    dispatch(deleteJob(jobId));
  };

  return (``
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 bg-gray-50 p-6">
          {/* Search & Filter Button */}
          <div className="mb-6">
            <div className="flex gap-4">
              <div className="flex-1 flex bg-white rounded-lg shadow-sm">
                <div className="flex-1 flex items-center border-r border-gray-200 px-4">
                  <Search size={20} className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Search by title, company, or keywords"
                    className="w-full py-3 focus:outline-none"
                    onChange={(e) =>
                      handleFilterChange("title", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Dropdown Filters */}
              <div className="flex gap-4">
                <select
                  className="p-2 bg-white shadow rounded"
                  onChange={(e) => handleFilterChange("type", e.target.value)}
                >
                  <option value="">Job Type</option>
                  <option value="FULL-TIME">Full-Time</option>
                  <option value="PART-TIME">Part-Time</option>
                  <option value="INTERNSHIP">Internship</option>
                </select>

                <select
                  className="p-2 bg-white shadow rounded"
                  onChange={(e) =>
                    handleFilterChange("location", e.target.value)
                  }
                >
                  <option value="">Location</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Pune">Pune</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Mumbai">Mumbai</option>
                </select>

                <select
                  className="p-2 bg-white shadow rounded"
                  onChange={(e) =>
                    handleFilterChange("company", e.target.value)
                  }
                >
                  <option value="">Company</option>
                  <option value="Google">Google</option>
                  <option value="Microsoft">Microsoft</option>
                  <option value="Amazon">Amazon</option>
                  <option value="Flipkart">Flipkart</option>
                  <option value="Netflix">Netflix</option>
                </select>

                <select
                  className="p-2 bg-white shadow rounded"
                  onChange={(e) => handleFilterChange("salary", e.target.value)}
                >
                  <option value="">Salary</option>
                  <option value="₹5,00,000">₹5,00,000</option>
                  <option value="₹9,00,000">₹9,00,000</option>
                  <option value="₹10,00,000">₹10,00,000</option>
                  <option value="₹12,00,000">₹12,00,000</option>
                  <option value="₹15,00,000">₹15,00,000</option>
                </select>

                {/* Reset Filters Button */}
                <button
                  className="bg-gray-200 px-4 py-2 rounded"
                  onClick={() =>
                    setFilters({
                      type: "",
                      title: "",
                      company: "",
                      location: "",
                      salary: "",
                    })
                  }
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Jobs */}
          <div className="grid grid-cols-3 gap-5">
            {jobsLists.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <div>
                      <h3 className="text-lg font-medium">{job.title}</h3>
                      <div className="text-gray-600 text-sm">{job.company}</div>
                      <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
                        <MapPin size={16} />
                        {job.location}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={`
                      px-3 py-1 rounded-full text-xs font-medium
                      ${
                        job.type === "FULL-TIME"
                          ? "bg-green-100 text-green-800"
                          : ""
                      }
                      ${
                        job.type === "PART-TIME"
                          ? "bg-blue-100 text-blue-800"
                          : ""
                      }
                      ${
                        job.type === "INTERNSHIP"
                          ? "bg-purple-100 text-purple-800"
                          : ""
                      }
                    `}
                    >
                      {job.type}
                    </span>
                    <span className="text-gray-600 text-sm">{job.salary}</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-4 flex justify-between">
                  <button
                    className="text-white px-4 py-1 cursor-pointer rounded-full bg-[#48596f] hover:bg-[#2b3c52] transition"
                    onClick={routeChange}
                  >
                    Update
                  </button>
                  <button
                    className="text-white px-4 py-1 cursor-pointer rounded-full bg-red-600 hover:bg-red-800 transition"
                    onClick={() => handleDelete(job.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center">
              <nav className="flex items-center gap-1">
                <button
                  className="p-2 rounded-lg hover:bg-gray-100"
                  onClick={prevPage}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={20} />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      currentPage === i + 1
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => goToPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="p-2 rounded-lg hover:bg-gray-100"
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight size={20} />
                </button>
              </nav>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default JobsManagement;
