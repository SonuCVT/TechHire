import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

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

const UserInterviewSchedule = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6 mx-6">
          <table className="table-auto w-full bg-blue-50 shadow-lg rounded-lg border border-gray-300 h-96">
            <thead>
              <tr className="bg-blue-200">
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
              {MeetingCard.map((item, idx) => (
                <tr key={idx} className="border-t text-center">
                  <td className="py-2 px-4">{item.companyName}</td>
                  <td className="py-2 px-4">{item.date}</td>
                  <td className="py-2 px-4">{item.time}</td>
                  <td className="py-2 px-4">{item.type}</td>
                  <td className="py-2 px-4">{item.interviewer}</td>
                  <td className="py-2 px-4">{item.status}</td>
                  <td className="py-2 px-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
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
}
export default UserInterviewSchedule;
