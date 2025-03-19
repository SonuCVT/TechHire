import React, { useState } from "react";
import { useSelector } from "react-redux";

const UpdateProfile = () => {
  // Get user email from Redux (Assuming user email is stored after signup)
  const user = useSelector((state) => state.user);

  // Form State
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "", // Pre-filled from signup
    skills: [],
    education: "",
    experience: "",
    resume: null,
    coverLetter: null,
    attachments: [],
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const { name, value } = e.target;

    // Convert comma-separated values into an array for skills
    if (name === "skills") {
      setFormData({
        ...formData,
        [name]: value.split(",").map((skill) => skill.trim()),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle File Upload
  const handleFileUpload = (e, field) => {
    if (field === "attachments") {
      setFormData({ ...formData, attachments: [...e.target.files] });
    } else {
      setFormData({ ...formData, [field]: e.target.files[0] });
    }
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Data:", formData);
    alert("Profile Updated Successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Complete Your Profile
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name (Pre-filled) */}
        <div>
          <label className="block font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-gray-200 focus:outline-blue-500"
            required
          />
        </div>

        {/* Email (Pre-filled) */}
        <div>
          <label className="font-medium">Email ID</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="w-full p-2 border rounded-md bg-gray-200 focus:outline-blue-500"
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block font-medium">Skills</label>
          <input
            type="text"
            name="skills"
            value={formData.skills.join(", ")} // Display as a comma-separated string
            onChange={handleChange}
            placeholder="e.g., React, Node.js, Python"
            className="w-full p-2 border rounded-md focus:outline-blue-500"
            required
          />
        </div>

        {/* Education */}
        <div>
          <label className="block font-medium">Education</label>
          <input
            type="text"
            name="education"
            value={formData.education}
            onChange={handleChange}
            placeholder="e.g., B.Tech in Computer Science"
            className="w-full p-2 border rounded-md focus:outline-blue-500"
            required
          />
        </div>

        {/* Experience */}
        <div>
          <label className="block font-medium">Experience (in years)</label>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="e.g., 2"
            className="w-full p-2 border rounded-md focus:outline-blue-500"
            required
          />
        </div>

        {/* Resume Upload */}
        <div>
          <label className="block font-medium">Upload Resume (PDF)</label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileUpload(e, "resume")}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        {/* Cover Letter Upload */}
        <div>
          <label className="block font-medium">Upload Cover Letter (PDF)</label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileUpload(e, "coverLetter")}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Multiple Attachments */}
        <div>
          <label className="block font-medium">
            Upload Additional Attachments
          </label>
          <input
            type="file"
            accept=".pdf,.docx,.jpg,.png"
            multiple
            onChange={(e) => handleFileUpload(e, "attachments")}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
