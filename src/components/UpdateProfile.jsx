import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  // Get user data from Redux
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  // Form State
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    skills: [], // Ensuring it's always an array to prevent `.join()` error
    education: "",
    experience: "",
    resumeUrl: "", // Stores Cloudinary URL
    coverLetter: null,
    attachments: [],
  });

  const [uploading, setUploading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "skills") {
      setFormData({
        ...formData,
        [name]: value ? value.split(",").map((skill) => skill.trim()) : [],
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Upload File to Cloudinary
  const uploadToCloudinary = async (file) => {
    setUploading(true);
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "techHire"); // Replace with your actual Cloudinary preset
    formData.append("resource_type", "raw"); // Ensure it's treated as a raw file (not an image)
  
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dk6aqshq2/raw/upload`, // Use 'raw' in URL
        formData
      );
  
      setFormData((prevData) => ({
        ...prevData,
        resumeUrl: response.data.secure_url, // Save Cloudinary URL
      }));
  
      setUploading(false);
      alert("Resume uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("File upload failed!");
      setUploading(false);
    }
  };
  

  // Handle Resume Upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadToCloudinary(file);
    }
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Data:", formData);
    alert("Profile Updated Successfully!");
    navigate("/user-dashboard")
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Complete Your Profile
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
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

        {/* Email */}
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
            value={Array.isArray(formData.skills) ? formData.skills.join(", ") : ""}
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
            onChange={handleFileUpload}
            className="w-full p-2 border rounded-md"
            required
          />
          {uploading && <p className="text-blue-500">Uploading...</p>}
          {formData.resumeUrl && (
            <p className="text-green-500">
              Uploaded Resume:{" "}
              <a
                href={formData.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View Resume
              </a>
            </p>
          )}
        </div>

        {/* Cover Letter Upload */}
        <div>
          <label className="block font-medium">Upload Cover Letter (PDF)</label>
          <input
            type="file"
            accept=".pdf"
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
