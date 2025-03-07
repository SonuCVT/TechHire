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
  PlusCircle,
  User
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const location = useLocation();

  const sidebarItems = [
    {
      icon: <LayoutDashboard size={18} />,
      label: "Dashboard",
      active: true,
      link: "/",
    },
    {
      icon: <BellRing size={18} />,
      label: "Notification",
      active: false,
      link: "/notification",
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
      link: "/setting",
    },
  ];



  const teamMembers = useSelector((state)=>state.addmember.member)

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen p-4 ml-4 mt-5">
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
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Team Members */}
      <div>
        {/* <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Team Members
          <PlusCircle size={20} className='text-gray-600 hover:text-indigo-800'/>
        </h3> */}
        <Link to="/addteammember">
            <li className="flex items-center justify-between p-2 rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer">
                            <div className="flex items-center gap-4">
                                <User size={20} className="text-gray-500" />
                                Team Members
                            </div>
                            <PlusCircle size={20} className="hover:text-indigo-600" />
            </li>
        </Link>
        <ul className="space-y-3">
          {teamMembers.map((member, index) => (
            <li key={index} className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <UserCircle size={20} className="text-gray-500" />
              </div>
              <div className="hover:text-blue-800">
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
