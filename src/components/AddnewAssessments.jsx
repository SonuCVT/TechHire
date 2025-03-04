import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAssessment } from '../utils/addAssessmentSlice';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const AddnewAssessments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: "",
    about: "",
    createdBy: "",
    creationDate: "",
    dueDate: "",
    assignedTo: "",
    status: "In Progress",
    attachment: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addAssessment(formData));
    navigate("/assessments");
  };

  return (
    <>
    <Header/>
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar Space (Vacant) */}
      <div className="w-1/4"></div>

      {/* Form Section */}
      <div className="flex flex-col justify-center items-center w-3/4">
        <div className="bg-white shadow-md rounded-lg p-8 w-3/5">
          <h2 className="text-2xl font-semibold text-center mb-6">New Assessment/Assignment</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block font-medium">Title:</label>
              <input 
                type="text" 
                name="title" 
                placeholder="Enter Assessment/Assignment Title" 
                className="w-full p-2 border rounded"
                onChange={handleChange} 
                required 
              />
            </div>

            {/* About */}
            <div>
              <label className="block font-medium">About:</label>
              <textarea 
                name="about" 
                placeholder="Enter About Details" 
                className="w-full p-2 border rounded" 
                rows="3"
                onChange={handleChange}
              />
            </div>

            {/* Created By */}
            <div>
              <label className="block font-medium">Created By:</label>
              <input 
                type="text" 
                name="createdBy" 
                placeholder="Enter Created By" 
                className="w-full p-2 border rounded"
                onChange={handleChange} 
                required 
              />
            </div>

            {/* Creation Date */}
            <div>
              <label className="block font-medium">Creation Date:</label>
              <input 
                type="date" 
                name="creationDate" 
                className="w-full p-2 border rounded"
                onChange={handleChange} 
                required 
              />
            </div>

            {/* Due Date */}
            <div>
              <label className="block font-medium">Deadline:</label>
              <input 
                type="date" 
                name="dueDate" 
                className="w-full p-2 border rounded"
                onChange={handleChange} 
                required 
              />
            </div>

            {/* Assigned To */}
            <div>
              <label className="block font-medium">Assigned To:</label>
              <input 
                type="text" 
                name="assignedTo" 
                placeholder="Enter Assigned Name" 
                className="w-full p-2 border rounded"
                onChange={handleChange} 
                required 
              />
            </div>

            {/* Status */}
            <div>
              <label className="block font-medium">Status:</label>
              <div className="flex space-x-4">
                {["In Progress", "Completed", "Pending"].map((status) => (
                  <label key={status} className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      name="status" 
                      value={status} 
                      checked={formData.status === status}
                      onChange={handleChange} 
                    />
                    <span>{status}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Attachment */}
            <div>
              <label className="block font-medium">Attachments:</label>
              <input 
                type="text" 
                name="attachment" 
                placeholder="Enter Assignment Link" 
                className="w-full p-2 border rounded"
                onChange={handleChange} 
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button 
                type="submit" 
                className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
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
