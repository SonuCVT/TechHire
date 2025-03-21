import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../utils/updateUserSlice";

const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;

const UpdateProfile = () => {
  // Get user data from Redux
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Form State
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    phoneNumber: "",
    address: "",
    skills: [], // Ensuring it's always an array to prevent `.join()` error
    education: "",
    experience: "",
    linkedin: "",
    github: "",
    codingProfile: "",
    resumeUrl: "", // Stores Cloudinary URL
    coverLetter: null,
    attachments: [],
  });

  const [uploading, setUploading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      const onlyNumbers = value.replace(/\D/g, "");

      if (onlyNumbers.length <= 10) {
        setFormData({ ...formData, [name]: onlyNumbers });
      }
    } else if (name === "skills") {
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
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("resource_type", "raw");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`,
        formData
      );

      setFormData((prevData) => ({
        ...prevData,
        resumeUrl: response.data.secure_url,
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
    // console.log("Profile Data:", formData);

    dispatch(updateUser(formData));
    alert("Profile Updated Successfully!");
    navigate("/user-dashboard");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Complete Your Profile
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-3">
          {/* Full Name */}
          <div className="w-1/2">
            <label className="block font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., John Doe"
              className="w-full p-2 border rounded-md bg-gray-200 focus:outline-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div className="w-1/2">
            <label className="font-medium">Email ID</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g., xyz@gmail.com"
              className="w-full p-2 border rounded-md bg-gray-200 focus:outline-blue-500"
              required
            />
          </div>
        </div>

        <div className="flex gap-3">
          {/* Phone */}
          <div className="w-1/2">
            <label className="font-medium">Mobile Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="e.g. 9876543210"
              maxLength={10}
              className="w-full p-2 border rounded-md focus:outline-blue-500"
              required
            />
          </div>

          {/* Location */}
          <div className="w-1/2">
            <label className="font-medium">Location</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="e.g. Delhi"
              className="w-full p-2 border rounded-md focus:outline-blue-500"
              required
            />
          </div>
        </div>

        <div className="flex gap-3">
          {/* Education */}
          <div className="w-1/2">
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
          <div className="w-1/2">
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
        </div>

        {/* Skills */}
        <div>
          <label className="block font-medium">Skills</label>
          <input
            type="text"
            name="skills"
            value={
              Array.isArray(formData.skills) ? formData.skills.join(", ") : ""
            }
            onChange={handleChange}
            placeholder="e.g., React, Node.js, Python"
            className="w-full p-2 border rounded-md focus:outline-blue-500"
            required
          />
        </div>

        {/* Linkedin Profile Link */}
        <div>
          <label className="block font-medium">Linkedin Profile Link</label>
          <input
            type="text"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="e.g., https://linkedin.com/in/johndoe"
            className="w-full p-2 border rounded-md focus:outline-blue-500"
            required
          />
        </div>

        {/* Github Profile Link */}
        <div>
          <label className="block font-medium">Github Profile Link</label>
          <input
            type="text"
            name="github"
            value={formData.github}
            onChange={handleChange}
            placeholder="e.g., https://github.com/johndoe"
            className="w-full p-2 border rounded-md focus:outline-blue-500"
            required
          />
        </div>

        {/* Coding Profile Link */}
        <div>
          <label className="block font-medium">Coding Profile Link</label>
          <input
            type="text"
            name="codingProfile"
            value={formData.codingProfile}
            onChange={handleChange}
            placeholder="e.g., https://hackerrank.com/johndoe"
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
