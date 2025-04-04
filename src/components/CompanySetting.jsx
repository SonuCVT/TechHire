import React, { useState } from "react";
import Sidebar from "./Sidebar";
import {
  Bell,
  Grid,
  Users,
  ClipboardList,
  Video,
  Settings,
  ChevronRight,
} from "lucide-react";
import userImage from "../assets/images/user.svg";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../utils/hrThemeSlice";

const CompanySetting = () => {
  const dispatch = useDispatch();
  //const user = useSelector((state) => state.user);
  const darkMode = useSelector((state) => state.hrTheme.darkMode); // Get state from Redux

  const [pushNotifications, setPushNotifications] = useState(true);
  const [modalContent, setModalContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal Handler
  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
      }`}
    >
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <div
            className={`flex-1 rounded-lg shadow-sm p-8 ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-center space-x-4 mb-8">
              <Settings size={28} />
              <h1 className="text-2xl font-semibold">Settings</h1>
            </div>

            <div className="flex items-center space-x-4 mb-8">
              <img
                src={userImage}
                alt="HR"
                className="w-16 h-16 rounded-full object-cover"
              />
              <h2 className="text-xl font-semibold">"HR"</h2>
            </div>

            <div className="space-y-6">
              <h3 className="text-gray-500 dark:text-gray-400">
                Account Settings
              </h3>
              <SettingsRow text="Edit Profile" />
              <SettingsRow text="Change Password" />
              <SettingsRow
                text="Push Notifications"
                toggle
                value={pushNotifications}
                onChange={() => setPushNotifications(!pushNotifications)}
              />
              <SettingsRow
                text="Dark Mode"
                toggle
                value={darkMode}
                onChange={() => dispatch(toggleDarkMode())} // Dispatch Redux action
              />

              <h3 className="text-gray-500 dark:text-gray-400 pt-4">More</h3>
              <SettingsRow
                text="About Us"
                onClick={() =>
                  openModal(
                    "About Us: Our website provides no warranties or guarantees..."
                  )
                }
              />
              <SettingsRow
                text="Privacy Policy"
                onClick={() =>
                  openModal(
                    "Privacy Policy: This Privacy Policy describes Our policies..."
                  )
                }
              />
              <SettingsRow
                text="Terms and Conditions"
                onClick={() =>
                  openModal("Terms and Conditions: By using this app...")
                }
              />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96 text-center">
            <h2
              className={`text-xl font-bold mb-4 ${
                darkMode ? "text-blue-900" : "text-black"
              }`}
            >
              {modalContent.split(":")[0]}
            </h2>
            <p
              className={`text-sm ${darkMode ? "text-blue-900" : "text-black"}`}
            >
              {modalContent.split(":")[1]}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-lg cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

function SettingsRow({ text, toggle = false, value, onChange, onClick }) {
  return (
    <div
      className={`flex items-center justify-between py-2 cursor-pointer ${
        onClick ? "rounded-md" : ""
      }`}
      onClick={onClick}
    >
      <span className="">{text}</span>
      {toggle ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChange();
          }}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all ${
            value ? "bg-violet-600" : "bg-gray-200 dark:bg-gray-600"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
              value ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      ) : (
        <ChevronRight className="text-gray-400 dark:text-gray-300" size={20} />
      )}
    </div>
  );
}

export default CompanySetting;
