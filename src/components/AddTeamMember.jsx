import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useDispatch } from "react-redux";
import { addTeamMember } from "../utils/addTeammemberSlice";
import { useNavigate } from "react-router-dom";

const AddTeamMember = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTeamMember(formData));
    navigate("/hr-dashboard");
    console.log("Member Added:", formData);
  };

  return (
    <>
      <Header />
      <div className="flex bg-gray-100 h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-grow flex justify-center items-start pt-8">
          <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900">
              Add a member :
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium">
                  Name :
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none"
                  placeholder="Enter a name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Email :
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none"
                  placeholder="Enter Email"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Mobile no. :
                </label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none"
                  placeholder="Enter Mobile no."
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Designation :
                </label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none"
                  placeholder="Enter designation"
                />
              </div>
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition shadow-md"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTeamMember;
