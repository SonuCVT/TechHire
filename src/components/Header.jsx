import React from "react";
import { Link, useLocation } from "react-router-dom";
import TechHireLogo from "../assets/images/techhire_logo.svg";

function Header() {
  const location = useLocation();

  const navItems = [
    { name: "Home", link: "/hr-dashboard" },
    { name: "Jobs Postings", link: "/jobposting" },
    { name: "Applications", link: "/applications" },
    { name: "Assessments", link: "/assessments" },
    { name: "Interviews", link: "/interviews" },
  ];

  return (
    <header className="bg-[#48596f] text-white p-8 py-3">
      <div className=" flex justify-between items-center">
        <div className="flex items-center space-x-2">
          
          <img
            src={TechHireLogo}
            alt="TechHire Logo"
            className="h-[60px] w-auto"
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
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                <Link to="/company-profile"><span className="text-white font-medium">HR</span></Link>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
