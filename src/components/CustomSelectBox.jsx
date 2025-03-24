import React, { useState } from "react";

const CustomSelectBoxForTestType = ({ formData, setFormData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    { label: "OA Test", value: "OA Test" },
    { label: "Coding Test", value: "Coding Test" },
  ];

  const handleSelect = (option) => {
    setFormData({ ...formData, type_of_test: option.value });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <label className="block font-medium text-gray-700">Test Type :</label>

      {/* Custom Select Box */}
      <div
        className="w-full p-2 border border-gray-300 rounded-lg bg-white cursor-pointer focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        {options.find((opt) => opt.value === formData.type_of_test)?.label ||
          "Select Test Type"}
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
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelectBoxForTestType;
