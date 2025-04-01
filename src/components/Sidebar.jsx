import React, { useState } from "react";
import {
  LayoutDashboard,
  BellRing,
  Briefcase,
  Users,
  ClipboardCheck,
  MessageSquare,
  Settings,
  UserCircle,
  PlusCircle,
  User,
  LogOut,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useFectTeam from "../hooks/useFetchTeamMember";
import { useKeycloak } from "@react-keycloak/web";

const Sidebar = () => {
  const location = useLocation();
  const darkMode = useSelector((state) => state.hrTheme.darkMode);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const { keycloak } = useKeycloak();
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // Clear all client-side storage
      localStorage.clear();
      sessionStorage.clear();
      // Clear all cookies
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
      });
      // Clear Keycloak tokens
      await keycloak.clearToken();
      // Perform Keycloak logout with redirect
      await keycloak.logout({
        redirectUri: window.location.origin + '/login'
      });
      // Fallback navigation if Keycloak logout doesn't redirect
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      navigate('/login');
    } finally {
      setIsLoggingOut(false);
    }
  };

  useFectTeam();

  const sidebarItems = [
    {
      icon: <LayoutDashboard size={18} />,
      label: "Dashboard",
      active: true,
      link: "/hr-dashboard",
    },
    {
      icon: <BellRing size={18} />,
      label: "Notification",
      active: false,
      link: "/company-notifications",
    },
    {
      icon: <Briefcase size={18} />,
      label: "Job Management",
      active: false,
      link: "/jobs-management",
    },
    {
      icon: <Users size={18} />,
      label: "Candidates",
      active: false,
      link: "/candidates",
    },
    {
      icon: <ClipboardCheck size={18} />,
      label: "Assessments",
      active: false,
      link: "/assessments",
    },
    {
      icon: <MessageSquare size={18} />,
      label: "Interviews",
      active: false,
      link: "/interviews",
    },
    {
      icon: <Settings size={18} />,
      label: "Settings",
      active: false,
      link: "/company-setting",
    },
  ];

  const teamMembers = useSelector((state) => state.addmember.member);

  return (
    <div
      className={`w-64 min-h-screen p-4 border-r transition-all ${
        darkMode
          ? "bg-gray-800 border-gray-700 text-white"
          : "bg-white border-gray-200 text-gray-900"
      }`}
    >
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
              <Link
                to={item.link}
                className={`flex items-center space-x-3 p-2 rounded-md ${
                  location.pathname === item.link
                    ? darkMode
                      ? "bg-gray-700 text-violet-400"
                      : "bg-blue-50 text-blue-600"
                    : darkMode
                    ? "text-gray-300 hover:bg-gray-700"
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
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        className={`flex items-center space-x-2 p-2 w-full rounded-lg ${
          isLoggingOut
            ? "text-gray-500 cursor-not-allowed"
            : "text-red-500 hover:bg-red-50 dark:hover:bg-gray-700"
        } transition`}
      >
        <LogOut size={18} />
        <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
      </button>

      {/* Team Members */}
      <div>
        <Link to="/addteammember">
          <li className="flex items-center justify-between p-2 rounded-md text-gray-700 hover:bg-gray-700 cursor-pointer">
            <div
              className={`flex items-center gap-4 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <User
                size={20}
                className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}
              />
              Team Members
            </div>
            <PlusCircle
              size={20}
              className={`hover:text-indigo-600 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </li>
        </Link>

        <ul className="py-2">
          {teamMembers.map((member, index) => (
            <li key={index} className="flex items-center py-2 gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <UserCircle size={20} className="text-gray-500" />
              </div>
              <div className="hover:text-blue-200">
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
