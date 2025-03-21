import React from "react";
import { useSelector } from "react-redux";

const UpcomingActivities = () => {
  const darkMode = useSelector((state) => state.theme.darkMode); // Get dark mode state

  // Hardcoded Upcoming Interviews
  const upcomingInterviews = [
    {
      id: 1,
      type: "Interview",
      title: "Technical Test Interview",
      description: "Online Mode",
      date: "2 Jan 2025, 12:00 PM to 1:00 PM",
      status: "Scheduled",
    },
  ];

  // Hardcoded Upcoming Assignments
  const upcomingAssignments = [
    {
      id: 2,
      type: "Assessment",
      title: "Frontend Task Submission",
      description: "Complete the React component for user profile.",
      deadline: "5 Jan 2025",
      status: "Pending",
    },
    {
      id: 3,
      type: "Assessment",
      title: "Swiggy Task Submission",
      description: "Complete the Swiggy cart component.",
      deadline: "6 Jan 2025",
      status: "Completed",
    },
  ];

  // Merge all activities into one array for uniform rendering
  const activities = [...upcomingInterviews, ...upcomingAssignments];

  return (
    <div className="py-6">
      <h2 className="text-2xl font-semibold mb-4">Upcoming Activities</h2>
      <div className="flex gap-6 overflow-x-auto">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className={`w-96 p-4 rounded-lg shadow-md border flex flex-col justify-between h-60 transition-all ${
              darkMode
                ? "bg-gray-800 text-white border-gray-700"
                : "bg-white text-gray-900 border-gray-200"
            }`}
          >
            <h3 className="text-lg font-medium border-b pb-2">
              {activity.type}
            </h3>
            <div>
              <p className="font-semibold mt-2">{activity.title}</p>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {activity.description}
              </p>
              {activity.date && (
                <p
                  className={`mt-2 text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Date: {activity.date}
                </p>
              )}
              {activity.deadline && (
                <p
                  className={`mt-2 text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Deadline: {activity.deadline}
                </p>
              )}
              <p className="mt-2 text-sm">
                <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
                  Status:{" "}
                </span>
                <span
                  className={
                    activity.status === "Pending"
                      ? "text-red-500"
                      : "text-green-500"
                  }
                >
                  {activity.status}
                </span>
              </p>
            </div>
            <div className="flex justify-end items-center mt-auto">
              <button
                className={`px-4 py-2 rounded-md shadow-md transition duration-300 ${
                  activity.status === "Completed"
                    ? "bg-gray-500 text-white cursor-not-allowed"
                    : darkMode
                    ? "bg-violet-600 text-white hover:bg-violet-700"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
                disabled={activity.status === "Completed"}
              >
                {activity.type === "Interview"
                  ? "Join Interview"
                  : "Take Assessment"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingActivities;
