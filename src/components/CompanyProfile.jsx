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
            {/* Overview Section */}
            <h1 className="text-3xl font-bold mb-8 border-l-4 border-red-500 pl-3">
              Overview
            </h1>

            {/* About Company */}
            <div className="bg-white rounded-xl p-6 mb-8 shadow-lg flex gap-8">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="Company"
                className="w-1/3 rounded-lg"
              />
              <div className="space-y-4">
                <p>
                  Unacademy is India’s largest learning platform that aims to
                  democratize education by making high-quality learning
                  accessible to all. Founded in 2015, Unacademy has grown
                  rapidly with a network of top educators and offers courses for
                  competitive exams, skill development, and more.
                </p>
                <p>
                  We enable clients in more than 56 countries to navigate their
                  digital transformation. With over four decades of experience
                  in managing the systems and workings of global enterprises, we
                  expertly steer clients, as they navigate their digital
                  transformation powered by cloud and AI.
                </p>
                <p>
                  <b>Why Hire from Unacademy? </b> Unacademy learners are equipped with
                  practical knowledge, strong analytical skills, and
                  problem-solving abilities. Many of their students undergo
                  rigorous training from experienced educators, ensuring they
                  are industry-ready. Partnering with Unacademy for hiring can
                  help you access a talent pool enriched with valuable skills
                  and knowledge.
                </p>
              </div>
            </div>

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

            {/* More Information */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">More Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="mb-2">
                    <strong>Type:</strong> Public
                  </p>
                  <p className="mb-2">
                    <strong>Company Size:</strong> 10000+
                  </p>
                  <p>
                    <strong>Website:</strong>
                    <a
                      href="https://www.infosys.com/"
                      className="text-blue-600 hover:underline ml-1"
                    >
                      infosys.com
                    </a>
                  </p>
                </div>
                <div>
                  <p className="mb-2">
                    <strong>Founded:</strong> 1981
                  </p>
                  <p>
                    <strong>Headquarters:</strong> Bengaluru
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyProfile;
