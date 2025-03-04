import React, { useState } from "react";
import Header from "./Header";

const applicationsData = [
  {
    id: 1,
    name: "James",
    role: "Student",
    appliedFor: "Data Analyst",
    email: "aabc@gmail.com",
    phone: "+919999988888",
    resume: "https://drive.google.com/R4Q21FR",
    appliedDate: "24/08/23",
  },
  {
    id: 2,
    name: "Smith",
    role: "Professional",
    appliedFor: "Software Developer",
    email: "xxyz@gmail.com",
    phone: "+918123567321",
    resume: "https://drive.google.com/VB4Q21XQ",
    appliedDate: "14/09/23",
  },
  {
    id: 3,
    name: "Jessy",
    role: "Student",
    appliedFor: "Software Developer",
    email: "xxyz@gmail.com",
    phone: "+918734782987",
    resume: "https://drive.google.com/UBYIWQIK",
    appliedDate: "14/09/23",
  },
  {
    id: 4,
    name: "Micheal",
    role: "Professional",
    appliedFor: "Data Engineer",
    email: "pqkz@gmail.com",
    phone: "+91 8767665671",
    resume: "https://drive.google.com/VGH/24/WQIK",
    appliedDate: "14/09/23",
  },
];

const Applications = () => {
  const [search, setSearch] = useState("");

  const filteredApplications = applicationsData.filter((app) =>
    app.name.toLowerCase().includes(search.toLowerCase()) ||
    app.appliedFor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="p-6 bg-gray-100 min-h-screen">
        {/* Search Bar */}
        <div className="flex items-center bg-white p-3 rounded-md shadow-md w-full max-w-2xl mx-auto mb-6">
          <input
            type="text"
            placeholder="Search by name or anything"
            className="w-full p-2 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-green-500 text-white px-4 py-2 rounded-md ml-2">
            Search
          </button>
        </div>

        {/* Applications List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredApplications.map((app) => (
            <div key={app.id} className="bg-white p-4 rounded-md shadow-md flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{app.name}</h3>
                <p className="text-sm text-gray-500">{app.role}</p>
                <p className="mt-2 text-gray-600">
                  Apply: <span className="font-medium">{app.appliedFor}</span>
                </p>
                <p className="text-gray-600">Email: {app.email}</p>
                <p className="text-gray-600">Phone No: {app.phone}</p>
                <p className="text-blue-500">
                  Resume: <a href={app.resume} target="_blank" rel="noopener noreferrer" className="underline">{app.resume}</a>
                </p>
              </div>
              <div className="text-right">
                <p className="text-gray-500">Applied for job-{app.appliedDate}</p>
                <button className="bg-green-500 text-white px-4 py-2 rounded-md mt-2">
                  View More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Applications