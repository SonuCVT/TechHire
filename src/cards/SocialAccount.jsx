import React from "react";
import { useSelector } from "react-redux";

const SocialAccount = () => {
  const darkMode = useSelector((state) => state.theme.darkMode); // Get dark mode state

  return (
    <div className="flex justify-between items-center pb-2 mb-6">
      <h2 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
        Overview
      </h2>

      <div className="flex gap-4">
        {/* LinkedIn */}
        <a href="#">
          <button
            className={`px-4 py-2 border-b-2 font-medium transition-all ${
              darkMode
                ? "text-gray-300 border-violet-500 hover:bg-gray-800"
                : "text-gray-500 border-indigo-600 hover:bg-white"
            }`}
          >
            LinkedIn
          </button>
        </a>

        {/* GitHub */}
        <a href="#">
          <button
            className={`px-4 py-2 border-b-2 font-medium transition-all ${
              darkMode
                ? "text-gray-300 border-violet-500 hover:bg-gray-800"
                : "text-gray-500 border-indigo-600 hover:bg-white"
            }`}
          >
            GithubID
          </button>
        </a>

        {/* Coding Profile */}
        <a href="#">
          <button
            className={`px-4 py-2 border-b-2 font-medium transition-all ${
              darkMode
                ? "text-gray-300 border-violet-500 hover:bg-gray-800"
                : "text-gray-500 border-indigo-600 hover:bg-white"
            }`}
          >
            Coding Profile
          </button>
        </a>
      </div>
    </div>
  );
};

export default SocialAccount;
