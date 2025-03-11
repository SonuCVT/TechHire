import React, { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

const JobFilterPanel = ({ jobs, setFilteredJobs }) => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  // Handle filter change
  const handleFilterChange = (type) => {
    setSelectedType(type);

    const filtered = type ? jobs.filter((job) => job.type === type) : jobs;

    setFilteredJobs(filtered);
  };

  return (
    <>
      {/* Filter Button */}
      <button
        className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center gap-2"
        onClick={() => setFiltersOpen(true)}
      >
        <SlidersHorizontal size={20} />
        Filters
      </button>

      {/* Sliding Filter Panel */}
      {filtersOpen && (
        <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg p-6 flex flex-col z-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Filter Jobs</h3>
            <button onClick={() => setFiltersOpen(false)}>
              <X size={24} />
            </button>
          </div>

          {/* Job Type Filter */}
          <div>
            <h4 className="font-medium mb-2">Job Type</h4>
            <div className="space-y-2">
              {["FULL-TIME", "PART-TIME", "INTERNSHIP"].map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="jobType"
                    value={type}
                    checked={selectedType === type}
                    onChange={() => handleFilterChange(type)}
                  />
                  {type.replace("-", " ")}
                </label>
              ))}
              {/* Show all jobs option */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="jobType"
                  value=""
                  checked={selectedType === ""}
                  onChange={() => handleFilterChange("")}
                />
                All Job Types
              </label>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobFilterPanel;
