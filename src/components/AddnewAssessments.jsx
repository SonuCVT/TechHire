import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAssessment } from '../utils/addAssessmentSlice';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const AddnewAssessments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: "",
    about: "",
    createdBy: "",
    creationDate: "",
    deadline: "",
    assignTo: "",
    status: "In Progress",
    attachments: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("/api/assessments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to save assessment");
      }
  
      const data = await response.json();

  
      // Navigate to assessments page
      navigate("/assessments");
    } catch (error) {
      console.error("Error submitting assessment:", error);
    }
  };
  

  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Form Section */}
        <div className="flex-1 flex items-center justify-center ">
          <div className="bg-white shadow-lg rounded-xl p-8 w-2/5 ">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">New Assessment/Assignment</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block font-medium text-gray-700">Title:</label>
                <input 
                  type="text" 
                  name="title" 
                  placeholder="Enter Assessment/Assignment Title" 
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange} 
                  required 
                />
              </div>

              {/* About */}
              <div>
                <label className="block font-medium text-gray-700">About:</label>
                <textarea 
                  name="about" 
                  placeholder="Enter About Details" 
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  rows="3"
                  onChange={handleChange}
                />
              </div>

              {/* Created By */}
              <div>
                <label className="block font-medium text-gray-700">Created By:</label>
                <input 
                  type="text" 
                  name="createdBy" 
                  placeholder="Enter Created By" 
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange} 
                  required 
                />
              </div>

              {/* Creation Date */}
              <div>
                <label className="block font-medium text-gray-700">Creation Date:</label>
                <input 
                  type="date" 
                  name="creationDate" 
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange} 
                  required 
                />
              </div>

              {/* Due Date */}
              <div>
                <label className="block font-medium text-gray-700">Deadline:</label>
                <input 
                  type="date" 
                  name="dueDate" 
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange} 
                  required 
                />
              </div>

              {/* Assigned To */}
              <div>
                <label className="block font-medium text-gray-700">Assigned To:</label>
                <input 
                  type="text" 
                  name="assignedTo" 
                  placeholder="Enter Assigned Name" 
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange} 
                  required 
                />
              </div>

              {/* Status */}
              <div>
                <label className="block font-medium text-gray-700">Status:</label>
                <div className="flex space-x-4">
                  {["In Progress", "Completed", "Pending"].map((status) => (
                    <label key={status} className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        name="status" 
                        value={status} 
                        checked={formData.status === status}
                        onChange={handleChange} 
                        className="accent-blue-500"
                      />
                      <span>{status}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Attachment */}
              <div>
                <label className="block font-medium text-gray-700">Attachments:</label>
                <input 
                  type="text" 
                  name="attachment" 
                  placeholder="Enter Assignment Link" 
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange} 
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button 
                  type="submit" 
                  className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddnewAssessments;
