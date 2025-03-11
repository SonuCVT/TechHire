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
import Header from "./Header";

const CompanySetting = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);

  // Modal States
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
      {/* Main Content */}
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          {/* Content */}
          <div
            className={`flex-1 rounded-lg shadow-sm p-8 ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            {/* Title */}
            <div className="flex items-center space-x-4 mb-8">
              <Settings size={28} />
              <h1 className="text-2xl font-semibold">Settings</h1>
            </div>

            {/* Profile Section */}
            <div className="flex items-center space-x-4 mb-8">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Yennefer Doe"
                className="w-16 h-16 rounded-full object-cover"
              />
              <h2 className="text-xl font-semibold">Yennefer Doe</h2>
            </div>

            {/* Settings Sections */}
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
                onChange={() => setDarkMode(!darkMode)}
              />

              {/* More Section */}
              <h3 className="text-gray-500 dark:text-gray-400 pt-4">More</h3>
              <SettingsRow
                text="About Us"
                onClick={() =>
                  openModal(
                    "About Us: Our website provides no warranties or guarantees. Nothing in this website, therefore, shall be considered legal advice and no attorney-client relationship is established. Please note that in some cases, depending on your legislation, further actions may be required to make your business compliant with the law.."
                  )
                }
              />
              <SettingsRow
                text="Privacy Policy"
                onClick={() =>
                  openModal(
                    "Privacy Policy: This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects you. We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy."
                  )
                }
              />
              <SettingsRow
                text="Terms and Conditions"
                onClick={() =>
                  openModal(
                    "Terms and Conditions: By using this app, you agree to follow our policies and guidelines."
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96 text-center">
            <h2 className="text-xl font-bold mb-4">
              {modalContent.split(":")[0]}
            </h2>
            <p className="text-sm">{modalContent.split(":")[1]}</p>
            <button
              className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-lg"
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
        onClick ? "hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md" : ""
      }`}
      onClick={onClick}
    >
      <span className="dark:text-white">{text}</span>
      {toggle ? (
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevents modal opening when toggling
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
