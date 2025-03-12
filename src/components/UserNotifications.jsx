import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "./UserDashboardHeader";
import Sidebar from "./UserDashboardSidebar";

const notifications = [
  {
    id: 1,
    title: "Interview Invitation",
    message: "You have been shortlisted! Your interview for Developer...",
    status: "New",
  },
  {
    id: 2,
    title: "HR Review Update",
    message:
      "Your application for Frontend Developer has moved to the next round.",
    status: "Read",
  },
  {
    id: 3,
    title: "Resume Update Reminder",
    message: "Update your resume to keep your profile fresh and relevant!",
    status: "New",
  },
  {
    id: 4,
    title: "Job Offer Received",
    message:
      "Congratulations! You've received a job offer for Frontend Developer.",
    status: "Read",
  },
  {
    id: 5,
    title: "Interview Feedback",
    message:
      "Your interview for [Job Title] has been reviewed. Check your status!",
    status: "New",
  },
  {
    id: 6,
    title: "New Message Received",
    message: "You have a new message from [Recruiter Name]",
    status: "Read",
  },
];

const Notifications = () => {
  const [notificationList, setNotificationList] = useState(notifications);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const isDarkMode = useSelector((state) => state.theme.darkMode);

  const openModal = (notification) => {
    setSelectedNotification(notification);
  };

  const closeModal = () => {
    setSelectedNotification(null);
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">Notifications</h1>
          <div className="space-y-4">
            {notificationList.map((notification) => (
              <div
                key={notification.id}
                onClick={() => openModal(notification)}
                className={`cursor-pointer p-4 rounded-lg shadow-md flex justify-between items-start ${
                  notification.status === "New"
                    ? `${isDarkMode ? "bg-gray-800 border-l-4 border-red-500" : "bg-white border-l-4 border-red-500"}`
                    : `${isDarkMode ? "bg-gray-700 border-l-4 border-blue-500" : "bg-[#f3f8ff] border-l-4 border-blue-500"}`
                }`}
              >
                <div>
                  <h2 className="text-lg font-semibold">{notification.title}</h2>
                  <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} text-sm`}>
                    {notification.message}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    notification.status === "New"
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {notification.status}
                </span>
              </div>
            ))}
          </div>
        </main>
      </div>

      {selectedNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className={`p-6 rounded-lg shadow-lg max-w-md w-full ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
            <h2 className="text-xl font-bold">{selectedNotification.title}</h2>
            <p className="mt-2">{selectedNotification.message}</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
