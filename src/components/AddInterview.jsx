import React, { useState } from 'react'
import Header from './Header'
import { useDispatch } from 'react-redux';
import { addInterview } from '../utils/addInterviewSlice';
import { useNavigate } from 'react-router-dom';

const AddInterview = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()
    const [formData, setFormData] = useState({
        candidateName: "",
        interviewMode: "",
        dateOfInterview: "",
        timeOfInterview: "",
        assignedManager: "",
        panelMembers: "",
        meetingLink: ""
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addInterview(formData))
        navigate("/interviews")
      };
    
      return (
        <>
        <Header/>
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2 text-gray-900">Add Interview Details :</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700">Candidate Name</label>
              <input type="text" name="candidateName" value={formData.candidateName} onChange={handleChange} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter the name of the candidate" />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Interview Mode</label>
              <input type="text" name="interviewMode" value={formData.interviewMode} onChange={handleChange} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Mode of interview" />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Date of Interview</label>
              <input type="date" name="dateOfInterview" value={formData.dateOfInterview} onChange={handleChange} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Time of Interview</label>
              <input type="time" name="timeOfInterview" value={formData.timeOfInterview} onChange={handleChange} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Assigned Manager</label>
              <input type="text" name="assignedManager" value={formData.assignedManager} onChange={handleChange} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter the name of manager assigned" />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Interview Panel Members</label>
              <input type="text" name="panelMembers" value={formData.panelMembers} onChange={handleChange} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter the name of interview panel members" />
            </div>
            <div className="md:col-span-2">
              <label className="block font-medium text-gray-700">Interview Meeting Link</label>
              <input type="text" name="meetingLink" value={formData.meetingLink} onChange={handleChange} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Link" />
            </div>
            <div className="md:col-span-2 flex justify-start">
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">Submit</button>
            </div>
          </form>
        </div>
        </>
      );
}

export default AddInterview