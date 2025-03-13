import React from "react";
import { useSelector } from "react-redux";
import Header from "./UserDashboardHeader";
import Sidebar from "./UserDashboardSidebar";

const CompanyCardProfile = () => {
  const darkTheme = useSelector((state) => state.theme.darkMode);

  const mostHirings = [
    { position: "Software Engineer-I", count: 100, label: "Hiring" },
    { position: "Software Engineer-II", count: 57, label: "Hiring" },
    { position: "QA Engineer", count: 27, label: "Hiring" },
    { position: "Product Engineer", count: 36, label: "Hiring" },
    { position: "HR", count: 6, label: "Hiring" },
  ];

  const companyInfo = {
    type: "Public",
    size: "10000+",
    founded: "1981",
    headquarters: "Bengaluru",
    website: "https://www.google.com/",
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkTheme ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
      }`}
    >
      {/* Header */}
      <Header />
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main
          className={`flex-1 p-6 ${
            darkTheme ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
          }`}
        >
          <div className="container mx-auto">
            <h1 className="text-2xl mb-1">Overview</h1>
            <div className="h-0.5 w-24 bg-red-500 mb-8"></div>

            {/* About Company */}
            <div
              className={`rounded-lg shadow-sm p-6 mb-8 ${
                darkTheme ? "bg-gray-600 text-white" : "bg-white text-black"
              }`}
            >
              <div className="flex gap-6">
                <div className="w-1/3">
                  <img
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="Company Team"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="w-2/3">
                  <h2 className="text-2xl font-bold mb-4">About Company</h2>
                  <p
                    className={`text-gray-600 mb-4 ${
                      darkTheme ? "text-slate-300" : "text-gray-600"
                    }`}
                  >
                    Infosys is a global leader in next-generation digital
                    services and consulting. Over 300,000 of our people work to
                    amplify human potential and create the next opportunity for
                    people, businesses, and communities.
                    <br />
                    <br />
                    We enable clients in more than 56 countries to navigate
                    their digital transformation. With over four decades of
                    experience in managing the systems and workings of global
                    enterprises, we expertly steer clients, as they navigate
                    their digital transformation powered by cloud and AI.
                    <br />
                    <br />
                    We enable clients in more than 56 countries to navigate
                    their digital transformation. With over four decades of
                    experience in managing the systems and workings of global
                    enterprises, we expertly steer clients, as they navigate
                    their digital transformation powered by cloud and AI.
                  </p>
                </div>
              </div>
            </div>

            {/* Most Hirings */}
            <div
              className={`rounded-lg shadow-sm p-6 mb-8 ${
                darkTheme ? "bg-gray-600 text-white" : "bg-white text-black"
              }`}
            >
              <h2 className="text-xl font-bold mb-6">Most Hirings</h2>
              <div className="grid grid-cols-5 gap-6">
                {mostHirings.map((position, index) => (
                  <div
                    key={index}
                    className={`rounded-lg p-4 ${
                      darkTheme
                        ? "bg-gray-800 text-white"
                        : "bg-gray-50 text-black"
                    }`}
                  >
                    <h3 className="font-medium mb-2">{position.position}</h3>
                    <div className="flex items-end gap-2">
                      <span
                        className={`text-2xl font-bold ${
                          darkTheme ? "text-slate-300" : "text-blue-600"
                        }`}
                      >
                        {position.count}
                      </span>
                      <span
                        className={`mb-1 ${
                          darkTheme ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {position.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* More Information */}
            <div
              className={`rounded-lg shadow-sm p-6 ${
                darkTheme ? "bg-gray-600 text-white" : "bg-white text-black"
              }`}
            >
              <h2 className="text-xl font-bold mb-6">More Information</h2>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="font-medium">Type : </span>
                  <span
                    className={`${
                      darkTheme ? "text-gray-200" : "text-gray-600"
                    }`}
                  >
                    {companyInfo.type}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Founded : </span>
                  <span
                    className={`${
                      darkTheme ? "text-gray-200" : "text-gray-600"
                    }`}
                  >
                    {companyInfo.founded}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Company Size : </span>
                  <span
                    className={`${
                      darkTheme ? "text-gray-200" : "text-gray-600"
                    }`}
                  >
                    {companyInfo.size}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Headquarters : </span>
                  <span
                    className={`${
                      darkTheme ? "text-gray-200" : "text-gray-600"
                    }`}
                  >
                    {companyInfo.headquarters}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CompanyCardProfile;
