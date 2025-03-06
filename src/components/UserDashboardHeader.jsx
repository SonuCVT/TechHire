import React, { useState } from "react";
import TechHireLogo from "./../assets/images/techhire_logo.svg";
import { Link } from "react-router-dom";

const UserDashboardHeader = () => {
  const [activeTab, setActiveTab] = useState("Home");

  const navItems = [
    { name: "Home", active: activeTab === "Home", link: "/user-dashboard" },
    { name: "Jobs", active: activeTab === "Jobs", link: "/jobs" },
    {
      name: "Companies",
      active: activeTab === "Companies",
      link: "/companies",
    },
    {
      name: "Contact Us",
      active: activeTab === "Contact Us",
      link: "/contact-us",
    },
  ];

  return (
    <header className="bg-[#48596f] text-white p-8 py-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img
            src={TechHireLogo}
            alt="Signup Illustration"
            className="w-full h-[60px]"
          />
        </div>
        <nav>
          <ul className="flex space-x-6 items-center">
            {navItems.map((item) => (
              <li
                key={item.name}
                className={`cursor-pointer py-2 px-1 ${
                  item.active ? "text-white border-b-2 border-blue-400" : ""
                }`}
                onClick={() => setActiveTab(item.name)}
              >
                <Link to={item.link} className="text-white">
                  {item.name}
                </Link>
              </li>
            ))}
            <li className="cursor-pointer flex items-center">
              <Link to="/user-profile" className="text-blue-500">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white font-medium">U</span>
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default UserDashboardHeader;
