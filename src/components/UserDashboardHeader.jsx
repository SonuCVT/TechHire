import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import TechHireLogo from "./../assets/images/techhire_logo.svg";

const UserDashboardHeader = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", link: "/user-dashboard" },
    { name: "Jobs", link: "/jobs" },
    { name: "Companies", link: "/companies" },
    { name: "Contact Us", link: "/contact-us" },
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
              <li key={item.name}>
                <Link
                  to={item.link}
                  className={`cursor-pointer py-2 px-1 transition-all ${
                    location.pathname === item.link
                      ? "border-b-2 border-blue-400 text-blue-300"
                      : "hover:text-blue-200"
                  }`}
                >
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
