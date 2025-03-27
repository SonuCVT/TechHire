import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "./UserDashboardHeader";
import Sidebar from "./UserDashboardSidebar";
import axios from "axios";

const Notifications = () => {
  const [notificationList, setNotificationList] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const userId = "67e3effc4b48f14e36148a2e";
  const isDarkMode = useSelector((state) => state.theme.darkMode);
  // const userId = useSelector((state) => state.user.userid);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`/api/notifications/all/${userId}`);
        console.log(userId);
        console.log(response.data);
        setNotificationList(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    if (userId) {
      fetchNotifications();
    }
  }, [userId]);

  const openModal = (notification) => {
    setSelectedNotification(notification);
  };

  const closeModal = () => {
    setSelectedNotification(null);
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
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
                    ? `${
                        isDarkMode
                          ? "bg-gray-800 border-l-4 border-red-500"
                          : "bg-white border-l-4 border-red-500"
                      }`
                    : `${
                        isDarkMode
                          ? "bg-gray-700 border-l-4 border-blue-500"
                          : "bg-[#f3f8ff] border-l-4 border-blue-500"
                      }`
                }`}
              >
                <div>
                  <h2 className="text-lg font-semibold">
                    {notification.title}
                  </h2>
                  <p
                    className={`${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    } text-sm`}
                  >
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
          <div
            className={`p-6 rounded-lg shadow-lg max-w-md w-full ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}
          >
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
