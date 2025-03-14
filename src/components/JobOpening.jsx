import React, { useState } from 'react';
//import Header from './Header';
import { useSelector } from 'react-redux';
import { FaAndroid, FaPython, FaDatabase, FaFigma, FaCode, FaJava, FaBeer } from 'react-icons/fa';
import UserDashboardHeader from './UserDashboardHeader';

const JobOpening = () => {
  const jobs = useSelector((state) => state.addpostjob.jobs);
  const darkMode = useSelector((state) => state.theme.darkMode);

  const [filters, setFilters] = useState({
    category: '',
    location: '',
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleShowAllJobs = () => {
    setFilters({ category: '', location: '' });
  };

  const jobCategories = [
    { name: 'Android Developer', icon: <FaAndroid /> },
    { name: 'Python Developer', icon: <FaPython /> },
    { name: 'Back-end Developer', icon: <FaDatabase /> },
    { name: 'Software Developer', icon: <FaBeer /> },
    { name: 'Fullstack Developer', icon: <FaCode /> },
    { name: 'Java Developer', icon: <FaJava /> }
  ];

  const jobCounts = jobCategories.reduce((acc, category) => {
    acc[category.name] = jobs.filter(
      (job) => job.title && job.title.toLowerCase().includes(category.name.toLowerCase())
    ).length;
    return acc;
  }, {});

  const filteredJobs = jobs.filter((job) => {
    return (
      job.title &&
      (!filters.category || job.title.toLowerCase().includes(filters.category.toLowerCase())) &&
      (!filters.location || job.location?.toLowerCase().includes(filters.location.toLowerCase()))
    );
  });

  return (
    <>
      <UserDashboardHeader />
      <div className={`p-6 transition-all ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
        <div className={`relative p-12 text-center rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-blue-100'}`}>
          <h1 className="text-4xl font-bold">Find Your Dream Job Here</h1>
          <div className="flex justify-center mt-4 space-x-2">
            <input type="text" placeholder="Keywords" className="border p-2 rounded-md bg-transparent" />
            <input type="text" name="location" value={filters.location} onChange={handleFilterChange} placeholder="Location" className="border p-2 rounded-md bg-transparent" />
            <input type="text" name="category" value={filters.category} onChange={handleFilterChange} placeholder="Roles" className="border p-2 rounded-md bg-transparent" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          {jobCategories.map((category) => (
            <button key={category.name} className={`flex flex-col items-center justify-center p-6 border rounded-lg shadow-md transition duration-300 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} ${filters.category === category.name ? 'bg-blue-500' : ''}`} onClick={() => setFilters({ ...filters, category: category.name })}>
              <div className="text-3xl">{category.icon}</div>
              <h3 className="mt-2 text-lg font-semibold">{category.name}</h3>
              <p className="text-sm">({jobCounts[category.name] || 0} jobs)</p>
            </button>
          ))}
        </div>

        <div className="flex mt-6">
          <div className={`w-1/4 p-4 border-r ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
            <h2 className="font-semibold text-lg">By Category:</h2>
            {jobCategories.map((category) => (
              <label key={category.name} className="block">
                <input type="radio" name="category" value={category.name} checked={filters.category === category.name} onChange={handleFilterChange} className="mr-2" />
                {category.name}
              </label>
            ))}

            <h2 className="font-semibold text-lg mt-4">By Location:</h2>
            {['Mumbai', 'Delhi', 'Noida', 'Lucknow', 'Bangalore'].map((location) => (
              <label key={location} className="block">
                <input type="radio" name="location" value={location} checked={filters.location === location} onChange={handleFilterChange} className="mr-2" />
                {location}
              </label>
            ))}

            <button onClick={handleShowAllJobs} className="mt-4 px-4 py-2 bg-red-500 text-white rounded w-full">Show All Jobs</button>
          </div>

          <div className="w-3/4 p-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => (
                <div key={index} className={`p-4 border rounded-lg shadow-md mb-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <p><strong>Company:</strong> {job.company}</p>
                  <p><strong>Location:</strong> {job.location}</p>
                  <p><strong>Description:</strong> {job.jobDescription}</p>
                  <p><strong>Experience:</strong> {job.experienceLevel} years</p>
                  <p><strong>Salary:</strong> {job.salaryRange} CTC</p>
                  <div className="flex justify-end space-x-2 mt-2">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded">Apply</button>
                  </div>
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
