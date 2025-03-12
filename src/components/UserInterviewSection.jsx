import React from "react";
import { useSelector } from "react-redux";
import UserDashboardHeader from "./UserDashboardHeader";
import UserDashboardSidebar from "./UserDashboardSidebar";

const MeetingCard = [
  {
    companyName: "CVT",
    date: "10-March-2025",
    time: "10:00 a.m to 12:00 p.m",
    type: "Technical",
    interviewer: "Jane Smith",
    status: "Scheduled",
  },
  {
    companyName: "Infosys",
    date: "22-March-2025",
    time: "10:00 a.m to 12:00 p.m",
    type: "HR",
    interviewer: "Jacob Smith",
    status: "Scheduled",
  },
  {
    companyName: "Google",
    date: "22-April-2025",
    time: "10:00 a.m to 12:00 p.m",
    type: "Technical",
    interviewer: "Smith",
    status: "Schedule",
  },
];

const UserInterviewSection = () => {
  const darkMode = useSelector((state) => state.theme.darkMode); // Get dark mode state

  return (
    <div className={`min-h-screen transition-all ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <UserDashboardHeader />
      <div className="flex">
      <UserDashboardSidebar />
        <div className={`flex-1 p-6 mx-6 rounded-lg shadow-lg transition-all ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
          <table className={`table-auto w-full shadow-lg rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-blue-50 border-gray-300"} text-center`}>
            <thead>
              <tr className={`${darkMode ? "bg-gray-600 text-white" : "bg-blue-200 text-black"}`}>
                <th className="py-2 px-4">Company Name</th>
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Time</th>
                <th className="py-2 px-4">Type</th>
                <th className="py-2 px-4">Interviewer</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                { company: "CVT", date: "10-March-2025", time: "10:00 AM - 12:00 PM", type: "Technical", interviewer: "Jane Smith", status: "Scheduled" },
                { company: "Infosys", date: "22-March-2025", time: "10:00 AM - 12:00 PM", type: "HR", interviewer: "Jacob Smith", status: "Scheduled" },
                { company: "Google", date: "22-April-2025", time: "10:00 AM - 12:00 PM", type: "Technical", interviewer: "Smith", status: "Schedule" },
              ].map((item, index) => (
                <tr key={index} className={`border-t ${darkMode ? "border-gray-600 text-white" : "border-gray-300 text-black"}`}>
                  <td className="py-2 px-4">{item.company}</td>
                  <td className="py-2 px-4">{item.date}</td>
                  <td className="py-2 px-4">{item.time}</td>
                  <td className="py-2 px-4">{item.type}</td>
                  <td className="py-2 px-4">{item.interviewer}</td>
                  <td className="py-2 px-4">{item.status}</td>
                  <td className="py-2 px-4">
                    <button className={`px-4 py-2 rounded-md transition ${darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"}`}>
                      Join Meeting
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserInterviewSection;
