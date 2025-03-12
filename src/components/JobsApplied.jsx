import React, { useState } from "react";
import { Search, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "./UserDashboardHeader";
import Sidebar from "./UserDashboardSidebar";
import { useSelector } from "react-redux";

const jobsPerPage = 9;

const jobsLists = [
  {
    id: 1,
    title: "Technical Support Specialist",
    company: "Google Inc.",
    location: "Bangalore, India",
    status: "Under Review",
    salary: "₹6,00,000 - ₹9,00,000",
  },
  {
    id: 2,
    title: "Senior UX Designer",
    company: "Microsoft",
    location: "Hyderabad, India",
    status: "Pending",
    salary: "₹12,00,000 - ₹18,00,000",
  },
  {
    id: 3,
    title: "Junior Graphic Designer",
    company: "Adobe",
    location: "Mumbai, India",
    status: "Rejected",
    salary: "₹3,50,000 - ₹5,00,000",
  },
  {
    id: 4,
    title: "Interaction Designer",
    company: "Amazon",
    location: "Chennai, India",
    status: "Pending",
    salary: "₹7,00,000 - ₹10,00,000",
  },
  {
    id: 5,
    title: "Software Engineer",
    company: "TCS",
    location: "Pune, India",
    status: "Rejected",
    salary: "₹2,00,000 - ₹3,50,000",
  },
  {
    id: 6,
    title: "Visual Designer",
    company: "Meta",
    location: "Delhi, India",
    status: "Under Review",
    salary: "₹8,50,000 - ₹13,00,000",
  },
  {
    id: 7,
    title: "UI/UX Designer",
    company: "Netflix",
    location: "Bangalore, India",
    status: "Under Review",
    salary: "₹9,00,000 - ₹14,00,000",
  },
  {
    id: 8,
    title: "Product Designer",
    company: "Deloitte",
    location: "Gurgaon, India",
    status: "Pending",
    salary: "₹11,00,000 - ₹16,00,000",
  },
  {
    id: 9,
    title: "Cloud Engineer",
    company: "IBM",
    location: "Hyderabad, India",
    status: "Rejected",
    salary: "₹14,00,000 - ₹18,00,000",
  },
  {
    id: 10,
    title: "Backend Developer",
    company: "Spotify",
    location: "Bangalore, India",
    status: "Under Review",
    salary: "₹12,00,000 - ₹17,00,000",
  },
  {
    id: 11,
    title: "Data Scientist",
    company: "Flipkart",
    location: "Bangalore, India",
    status: "Pending",
    salary: "₹15,00,000 - ₹22,00,000",
  },
  {
    id: 12,
    title: "Mobile App Developer",
    company: "Ola Cabs",
    location: "Mumbai, India",
    status: "Rejected",
    salary: "₹10,00,000 - ₹14,00,000",
  },
  {
    id: 13,
    title: "Full Stack Developer",
    company: "Zomato",
    location: "Delhi, India",
    status: "Under Review",
    salary: "₹12,00,000 - ₹16,00,000",
  },
  {
    id: 14,
    title: "DevOps Engineer",
    company: "Wipro",
    location: "Pune, India",
    status: "Pending",
    salary: "₹13,00,000 - ₹20,00,000",
  },
  {
    id: 15,
    title: "Product Manager",
    company: "Samsung",
    location: "Gurgaon, India",
    status: "Rejected",
    salary: "₹20,00,000 - ₹30,00,000",
  },
  {
    id: 16,
    title: "Marketing Specialist",
    company: "Twitter",
    location: "Bangalore, India",
    status: "Under Review",
    salary: "₹5,00,000 - ₹7,00,000",
  },
];

const salaryRanges = [
  { label: "₹2,00,000 - ₹3,50,000", min: 200000, max: 350000 },
  { label: "₹3,50,000 - ₹5,00,000", min: 350000, max: 500000 },
  { label: "₹5,00,000 - ₹10,00,000", min: 500000, max: 1000000 },
  { label: "₹10,00,000 - ₹15,00,000", min: 1000000, max: 1500000 },
];

const JobsManagement = () => {
  const routeChange = () => navigate(`/update-job`);
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    title: "",
    company: "",
    location: "",
    status: "",
    salary: null,
  });

  const parseSalary = (salary) => {
    const [min, max] = salary.replace(/₹|,/g, "").split(" - ").map(Number);
    return { min, max };
  };

  const filteredJobs = jobsLists.filter((job) => {
    const jobSalary = parseSalary(job.salary);

    return (
      (filters.status === "" || job.status === filters.status) &&
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

  const nextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <div className={`min-h-screen flex flex-col ${darkTheme ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}>
      {/* Header */}
      <Header />

      <div className="flex flex-1">
        {/* Sidebar */}
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

            {/* Job Status Filter */}
            <select
              className="p-2 border rounded"
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
            >
              <option value="">Status</option>
              <option value="Pending">Pending</option>
              <option value="Under Review">Under Review</option>
              <option value="Rejected">Rejected</option>
            </select>

            {/* Location Filter */}
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
              <option value="Pune">Delhi</option>
            </select>

            {/* Salary Filter Dropdown */}
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

            {/* Reset Button */}
            <button
              className="bg-gray-200 px-4 py-2 rounded cursor-pointer"
              onClick={() =>
                setFilters({
                  title: "",
                  company: "",
                  location: "",
                  status: "",
                  salary: null,
                })
              }
            >
              Reset
            </button>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {currentJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow-sm p-4 flex items-start justify-between"
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <div>
                      <h3 className="text-lg font-medium">{job.title}</h3>
                      <div className="text-gray-600 text-sm">{job.company}</div>
                      <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
                        <MapPin size={16} /> {job.location}
                      </div>
                      <div className="mt-4 text-gray-600 text-sm">
                        {job.salary.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Job Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={`
                      px-3 py-1 rounded-full text-xs font-medium
                      ${
                        job.status === "Rejected"
                          ? "bg-[#e41616] text-[#fff]"
                          : ""
                      }
                      ${
                        job.status === "Under Review"
                          ? "bg-[#48596f] text-[#fff]"
                          : ""
                      }
                      ${
                        job.status === "Pending"
                          ? "bg-[#2b992d] text-[#fff]"
                          : ""
                      }
                    `}
                    >
                      {job.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
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
