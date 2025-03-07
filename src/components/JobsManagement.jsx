import React, { useState } from "react";
import {
  LayoutGrid,
  Bell,
  Briefcase,
  Calendar,
  Settings,
  LogOut,
  Search,
  MapPin,
  Eye,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const jobsPerPage = 15; // Jobs per page

const jobsLists = [
  {
    id: 1,
    title: "Technical Support Specialist",
    company: "Google Inc.",
    location: "Bangalore, India",
    type: "PART-TIME",
    salary: "₹6,00,000 - ₹9,00,000",
  },
  {
    id: 2,
    title: "Senior UX Designer",
    company: "Microsoft",
    location: "Hyderabad, India",
    type: "FULL-TIME",
    salary: "₹12,00,000 - ₹18,00,000",
  },
  {
    id: 3,
    title: "Junior Graphic Designer",
    company: "Adobe",
    location: "Mumbai, India",
    type: "INTERNSHIP",
    salary: "₹3,00,000 - ₹5,00,000",
  },
  {
    id: 4,
    title: "Interaction Designer",
    company: "Amazon",
    location: "Chennai, India",
    type: "PART-TIME",
    salary: "₹7,00,000 - ₹10,00,000",
  },
  {
    id: 5,
    title: "Software Engineer",
    company: "TCS",
    location: "Pune, India",
    type: "FULL-TIME",
    salary: "₹10,00,000 - ₹15,00,000",
  },
  {
    id: 6,
    title: "Visual Designer",
    company: "Meta",
    location: "Delhi, India",
    type: "FULL-TIME",
    salary: "₹8,50,000 - ₹13,00,000",
  },
  {
    id: 7,
    title: "UI/UX Designer",
    company: "Netflix",
    location: "Bangalore, India",
    type: "FULL-TIME",
    salary: "₹9,00,000 - ₹14,00,000",
  },
  {
    id: 8,
    title: "Product Designer",
    company: "Deloitte",
    location: "Gurgaon, India",
    type: "FULL-TIME",
    salary: "₹11,00,000 - ₹16,00,000",
  },
  {
    id: 9,
    title: "Cloud Engineer",
    company: "IBM",
    location: "Hyderabad, India",
    type: "FULL-TIME",
    salary: "₹14,00,000 - ₹18,00,000",
  },
  {
    id: 10,
    title: "Backend Developer",
    company: "Spotify",
    location: "Bangalore, India",
    type: "FULL-TIME",
    salary: "₹12,00,000 - ₹17,00,000",
  },
  {
    id: 11,
    title: "Data Scientist",
    company: "Flipkart",
    location: "Bangalore, India",
    type: "FULL-TIME",
    salary: "₹15,00,000 - ₹22,00,000",
  },
  {
    id: 12,
    title: "Mobile App Developer",
    company: "Ola Cabs",
    location: "Mumbai, India",
    type: "FULL-TIME",
    salary: "₹10,00,000 - ₹14,00,000",
  },
  {
    id: 13,
    title: "Full Stack Developer",
    company: "Zomato",
    location: "Delhi, India",
    type: "FULL-TIME",
    salary: "₹12,00,000 - ₹16,00,000",
  },
  {
    id: 14,
    title: "DevOps Engineer",
    company: "Wipro",
    location: "Pune, India",
    type: "FULL-TIME",
    salary: "₹13,00,000 - ₹20,00,000",
  },
  {
    id: 15,
    title: "Product Manager",
    company: "Samsung",
    location: "Gurgaon, India",
    type: "FULL-TIME",
    salary: "₹20,00,000 - ₹30,00,000",
  },
  {
    id: 16,
    title: "Marketing Specialist",
    company: "Twitter",
    location: "Bangalore, India",
    type: "PART-TIME",
    salary: "₹5,00,000 - ₹7,00,000",
  },
  {
    id: 17,
    title: "Cybersecurity Analyst",
    company: "Cisco",
    location: "Chennai, India",
    type: "FULL-TIME",
    salary: "₹14,00,000 - ₹19,00,000",
  },
  {
    id: 18,
    title: "HR Manager",
    company: "Infosys",
    location: "Pune, India",
    type: "FULL-TIME",
    salary: "₹10,00,000 - ₹15,00,000",
  },
  {
    id: 19,
    title: "AI Researcher",
    company: "NVIDIA",
    location: "Hyderabad, India",
    type: "FULL-TIME",
    salary: "₹20,00,000 - ₹25,00,000",
  },
  {
    id: 20,
    title: "Frontend Developer",
    company: "Accenture",
    location: "Chennai, India",
    type: "FULL-TIME",
    salary: "₹9,00,000 - ₹13,00,000",
  },
];

const JobsManagement = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/update-job`;
    navigate(path);
  };

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredJobs = jobsLists.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase())
  );

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

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 bg-gray-50 p-6">
          {/* Search Bar */}
          <div className="flex bg-white p-3 rounded-full shadow-md w-full mb-6 border border-gray-300">
            <input
              type="text"
              placeholder="Search by name or anything"
              className="w-full p-2 outline-none text-gray-700"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="bg-[#48596f] text-white px-6 py-2 rounded-full hover:bg-[#2b3c52] cursor-pointer transition">
              Search
            </button>
          </div>

          {/* Jobs */}
          <div className="grid grid-cols-3 gap-5">
            {currentJobs.map((job) => (
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
                    className="text-white px-4 py-1 cursor-pointer rounded-full bg-[#2b3c52] hover:bg-[#48596f] transition"
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
