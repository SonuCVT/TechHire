import React from "react";

const UpcomingActivities = () => {
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
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Upcoming Activities</h2>
      <div className="flex gap-6 overflow-x-auto">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="w-96 p-4 bg-white rounded-lg shadow-md border flex flex-col justify-between h-60"
          >
            <h3 className="text-lg font-medium border-b pb-2">
              {activity.type}
            </h3>
            <div>
              <p className="font-semibold mt-2">{activity.title}</p>
              <p className="text-sm text-gray-500">{activity.description}</p>
              {activity.date && (
                <p className="mt-2 text-sm text-gray-600">Date: {activity.date}</p>
              )}
              {activity.deadline && (
                <p className="mt-2 text-sm text-gray-600">Deadline: {activity.deadline}</p>
              )}
              <p className="mt-2 text-sm">
                <span className="text-gray-600">Status: </span>
                <span
                  className={
                    activity.status === "Pending"
                      ? "text-red-500 "
                      : "text-green-500 disabled:"
                  }
                >
                  {activity.status}
                </span>
              </p>
            </div>
            <div className="flex justify-end items-center mt-auto">
              <button className={`px-4 py-2 rounded-md shadow-md transition duration-300 ${activity.status === "Completed"? "bg-gray-400 text-white cursor-not-allowed"
      : "bg-blue-600 text-white hover:bg-blue-700"}`} disabled={activity.status==="Completed"}>
                {activity.type === "Interview" ? "Join Interview" : "Take Assessment"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingActivities;
