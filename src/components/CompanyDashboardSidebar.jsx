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
    { icon: <Briefcase size={18} />, label: "Job Management", active: false },
    { icon: <Users size={18} />, label: "Candidates", active: false },
    { icon: <ClipboardCheck size={18} />, label: "Assessments", active: false },
    { icon: <MessageSquare size={18} />, label: "Interviews", active: false },
    { icon: <Settings size={18} />, label: "Settings", active: false },
  ];

  const teamMembers = [
    { name: "Sarah Jensen", role: "Admin" },
    { name: "Mike Thompson", role: "HR" },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
      {/* Company Logo and Name */}
      <div className="flex items-center space-x-3 mb-8 p-2">
        <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
          <span className="text-white font-bold">CN</span>
        </div>
        <span className="font-medium">Company Name</span>
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

      {/* Team Members */}
      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Team Members
        </h3>
        <ul className="space-y-3">
          {teamMembers.map((member, index) => (
            <li key={index} className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <UserCircle size={20} className="text-gray-500" />
              </div>
              <div>
                <p className="text-sm font-medium">{member.name}</p>
                <p className="text-xs text-gray-500">{member.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
