import React from "react";
import { User } from "lucide-react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const CompanyProfile = () => {
  const hrContacts = [
    {
      title: "HR Manager",
      department: "IT Finance",
      email: "nadhr@nortelnetworks.com",
      name: "Kshitij Jindal",
      phone: "+91 976897XXXX",
    },
    {
      title: "HR Business Partner",
      department: "Business Partner",
      email: "nadhr@nortelnetworks.com",
      name: "Ashutosh Singh",
      phone: "+91 976897XXXX",
    },
    {
      title: "HR L&D",
      department: "Talent Acquisition",
      email: "nadhr@nortelnetworks.com",
      name: "Prakhar Roshan",
      phone: "+91 976897XXXX",
    },
  ];

  return (
    <>
      <Header />
      <div className="flex bg-gray-100 min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1">
          <div className="p-8">
            {/* HR Details */}
            <div className="bg-white rounded-xl p-6 mb-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">HR Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {hrContacts.map((contact, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-4 rounded-lg shadow-md border border-gray-200"
                  >
                    <h3 className="font-bold text-lg mb-2">{contact.title}</h3>
                    <p className="text-gray-600 text-sm">
                      {contact.department}
                    </p>
                    <p className="text-gray-600 text-sm">{contact.email}</p>
                    <div className="flex items-center gap-3 mt-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-gray-600 text-sm">{contact.phone}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subscription Plan */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Subscription Details</h2>
              <div className="bg-blue-50 p-4 rounded-lg shadow-md border border-blue-300">
                <p className="text-gray-500 text-sm mb-4">Unlock features by upgrade now.</p>
                <p className="text-gray-700 text-sm">📅 Registration Date: 01 Jan 2025</p>
                <p className="text-gray-700 text-sm">🛒 Purchase Date: 15 Jan 2025</p>
                <p className="text-gray-700 text-sm">⏳ Expiry Date: 15 Jan 2026</p>
                <p className="text-gray-700 text-sm">🧑‍💻 Additional Interviews: 5</p>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 mt-4">
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyProfile;
