import React from "react";
import {
  LayoutDashboard,
  BellRing,
  Briefcase,
  Users,
  ClipboardCheck,
  MessageSquare,
  Settings,
  UserCircle,
} from "lucide-react";

const Sidebar = () => {
  const sidebarItems = [
    { icon: <LayoutDashboard size={18} />, label: "Dashboard", active: true },
    { icon: <BellRing size={18} />, label: "Notification", active: false },
    { icon: <Briefcase size={18} />, label: "Jobs", active: false },
    { icon: <Users size={18} />, label: "Jobs Applied", active: false },
    { icon: <ClipboardCheck size={18} />, label: "Schedule", active: false },
    { icon: <Settings size={18} />, label: "Settings", active: false },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
      {/* Company Logo and Name */}
      <div className="flex items-center space-x-3 mb-8 p-2">
        <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
          <span className="text-white font-bold">U</span>
        </div>
        <span className="font-medium">User</span>
      </div>

      {/* Sidebar Menu */}
      <nav className="mb-8">
        <ul className="space-y-2">
          {sidebarItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className={`flex items-center space-x-3 p-2 rounded-md ${
                  item.active
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <div
                  className={`${
                    item.active ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex flex-col">
        <button className="flex items-center py-2 px-3 font-bold text-gray-800">
          LOGOUT
        </button>

        <div className="mt-6 border-t pt-4">
          <div className="text-sm font-medium">Complete Profile</div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
            <div
              className="bg-purple-600 h-1.5 rounded-full"
              style={{ width: "80%" }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Your Profile is 80% Completed
          </div>
          <a href="#" className="text-xs text-purple-600">
            Complete your profile now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
