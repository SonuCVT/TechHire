import React, { useState } from "react";

const AssignToDropdown = ({ formData, setFormData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = ["OA Test", "Coding Test"];

  const handleSelect = (option) => {
    setFormData({ ...formData, assignTo: option });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <label className="block font-medium text-gray-700">Assigned To:</label>
      
      {/* Select Box (Fake) */}
      <div
        className="w-full p-2 border border-gray-300 rounded-lg bg-white cursor-pointer focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        {formData.assignTo || "Select Assignment Type"}
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <ul className="absolute left-0 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          {options.map((option, index) => (
            <li
              key={index}
              className="p-2 hover:bg-blue-100 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AssignToDropdown;
