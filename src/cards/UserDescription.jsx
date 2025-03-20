import React from "react";
import { useSelector } from "react-redux";

const UserDescription = () => {
  const darkMode = useSelector((state) => state.theme.darkMode); // Get dark mode state

  return (
    <div
      className={`lg:col-span-2 rounded-lg shadow-sm p-6 transition-all ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h3 className="text-xl font-bold mb-4">Description</h3>

      <p className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
        User dashboard is a personalized space where job seekers and recruiters
        can efficiently manage the hiring process. It acts as a control center,
        allowing users to track applications, schedule interviews, and
        communicate with potential employers. Designed for ease of use, the
        dashboard provides an intuitive interface to navigate through job
        listings, monitor application statuses, and receive real-time updates.
      </p>

      <ul
        className={`list-disc pl-6 space-y-4 ${
          darkMode ? "text-gray-300" : "text-gray-600"
        }`}
      >
        <li>
          For job seekers, the dashboard offers tools to upload resumes, create
          detailed profiles, and receive AI-powered job recommendations based on
          their skills and experience. They can easily filter job postings by
          location, salary, and industry, ensuring they find opportunities that
          match their preferences. Additionally, real-time notifications alert
          users about interview invites, job offers, or changes in application
          status, keeping them informed throughout the process.
        </li>
        <li>
          Recruiters and hiring managers benefit from the dashboard by gaining
          access to a streamlined workflow for posting jobs, shortlisting
          candidates, and scheduling interviews. Built-in analytics provide
          insights into applicant trends, helping organizations make data-driven
          hiring decisions. Communication features, such as in-platform
          messaging or email integration, facilitate seamless interactions
          between recruiters and candidates.
        </li>
      </ul>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {[
          { label: "Application Sent", count: 56 },
          { label: "Interview Schedule", count: 10 },
          { label: "Profile Visited", count: 150 },
        ].map((item, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg border transition-all ${
              darkMode
                ? "bg-gray-700 border-gray-600 hover:bg-violet-600 hover:text-white"
                : "bg-white border-gray-200 hover:bg-indigo-500 hover:text-white"
            }`}
          >
            <h2 className="text-4xl font-bold">{item.count}</h2>
            <p className="text-sm">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDescription;
