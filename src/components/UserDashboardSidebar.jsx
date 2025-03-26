import React, { useState } from "react";
import {
  LayoutDashboard,
  BellRing,
  Briefcase,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useKeycloak } from '@react-keycloak/web';
const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { keycloak } = useKeycloak();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const sidebarItems = [
    {
      icon: <LayoutDashboard size={18} />,
      label: "Dashboard",
      link: "/user-dashboard",
    },
    {
      icon: <BellRing size={18} />,
      label: "Notifications",
      link: "/user-notifications",
    },
    {
      icon: <Briefcase size={18} />,
      label: "Jobs Applied",
      link: "/jobs-applied",
    },
    {
      icon: <MessageSquare size={18} />,
      label: "Schedule",
      link: "/user-interview",
    },
    {
      icon: <Settings size={18} />,
      label: "Settings",
      link: "/user-setting"
    },
  ];
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
  return (
    <div
      className={`w-64 min-h-screen p-4 border-r transition-all ${
        darkMode
          ? "bg-gray-800 border-gray-700 text-white"
          : "bg-white border-gray-200 text-gray-900"
      }`}
    >
      {/* User Info */}
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
              <Link
                to={item.link}
                className={`flex items-center space-x-3 p-2 rounded-lg transition ${
                  location.pathname === item.link
                    ? darkMode
                      ? "bg-gray-700 text-violet-400"
                      : "bg-blue-50 text-blue-600"
                    : darkMode
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* Logout Button */}
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
      {/* Profile Completion */}
      <div className="mt-6 border-t pt-4">
        <Link
          to="/update-profile"
          className="text-md text-violet-600 dark:text-violet-400 hover:underline"
        >
          Complete your profile now
        </Link>
      </div>
    </div>
  );
};
export default Sidebar;




