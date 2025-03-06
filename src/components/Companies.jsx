import React from "react";

import { Link } from "react-router-dom";
import Header from "./UserDashboardHeader.jsx";
import Sidebar from "./UserDashboardSidebar.jsx";
import companyLogo from "./../assets/images/company_logo.png";
import companyImg1 from "./../assets/images/companies/infosys.jpg";
import companyImg2 from "./../assets/images/companies/tcs.jpg";
import companyImg3 from "./../assets/images/companies/google.png";
import companyImg4 from "./../assets/images/companies/microsoft.webp";
import companyImg5 from "./../assets/images/companies/facebbok.webp";
import companyImg6 from "./../assets/images/companies/deloitte.jpeg";

const CompaniesPage = () => {
  const companies = [
    {
      id: 1,
      img: companyImg1,
      name: "Infosys",
      link: "/company-card-profile",
      position: "Java Full Stack Developer",
      location: "Mumbai/Bangalore",
      experience: "3-6 Years",
    },
    {
      id: 2,
      img: companyImg2,
      name: "TCS",
      link: "/company-card-profile",
      position: "SDE-II",
      location: "Pune",
      experience: "2-3 Years",
    },
    {
      id: 3,
      img: companyImg3,
      name: "Google",
      link: "/company-card-profile",
      position: "Product Manager",
      location: "Chennai",
      experience: "5-6 Years",
    },
    {
      id: 4,
      img: companyImg4,
      name: "Microsoft",
      link: "/company-card-profile",
      position: "SDE-III",
      location: "Mumbai",
      experience: "7-8 Years",
    },
    {
      id: 5,
      img: companyImg5,
      name: "Facebook",
      link: "/company-card-profile",
      position: "Product Engineer",
      location: "Bangalore",
      experience: "3-4 Years",
    },
    {
      id: 6,
      img: companyImg6,
      name: "Deloitte",
      link: "/company-card-profile",
      position: "SDE-I",
      location: "Gurugram",
      experience: "1-2 Years",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 bg-gray-50 p-6">
          <div className="container mx-auto">
            <h1 className="text-2xl mb-1">Companies Registered With Us</h1>
            <div className="h-0.5 w-32 bg-red-500 mb-8"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {companies.map((company) => (
                <Link to={company.link} className="text-blue-500">
                  <div
                    key={company.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={company.img}
                        alt="Company Team"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex -mt-12 mb-3">
                        <img
                          src={companyLogo}
                          alt={company.name}
                          className="h-16 bg-white p-2 rounded-md shadow-md"
                        />
                      </div>
                      <h3 className="text-lg font-medium text-blue-600 mb-2">
                        {company.name} - {company.position}
                      </h3>
                      <div className="flex justify-between text-gray-600 text-sm mt-4">
                        <span>{company.location}</span>
                        <span>{company.experience}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CompaniesPage;
