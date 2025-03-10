import React from "react";

const UserDescription = () => {
  return (
    <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-bold mb-4">Description</h3>

      <p className="text-gray-600 mb-6">
        User dashboard is a personalized space where job seekers and recruiters
        can efficiently manage the hiring process. It acts as a control center,
        allowing users to track applications, schedule interviews, and
        communicate with potential employers. Designed for ease of use, the
        dashboard provides an intuitive interface to navigate through job
        listings, monitor application statuses, and receive real-time updates.
        
      </p>

      <ul className="list-disc pl-6 space-y-4 text-gray-600">
        <li>
        For job seekers, the dashboard offers tools to upload resumes, create
        detailed profiles, and receive AI-powered job recommendations based on
        their skills and experience. They can easily filter job postings by
        location, salary, and industry, ensuring they find opportunities that
        match their preferences. Additionally, real-time notifications alert
        users about interview invites, job offers, or changes in application
        status, keeping them informed throughout the process.
        </li>
        <li>
        Recruiters and
        hiring managers benefit from the dashboard by gaining access to a
        streamlined workflow for posting jobs, shortlisting candidates, and
        scheduling interviews. Built-in analytics provide insights into
        applicant trends, helping organizations make data-driven hiring
        decisions. Communication features, such as in-platform messaging or
        email integration, facilitate seamless interactions between recruiters
        and candidates.
        </li>
      </ul>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="hover:bg-indigo-500 hover:text-white bg-white border p-6 rounded-lg">
          <h2 className="text-4xl font-bold">56</h2>
          <p className="text-sm">Application sent</p>
        </div>
        <div className="hover:bg-indigo-500 hover:text-white bg-white border  p-6 rounded-lg">
          <h2 className="text-4xl font-bold">10</h2>
          <p className="text-sm">Interview Schedule</p>
        </div>
        <div className="hover:bg-indigo-500 hover:text-white bg-white border p-6 rounded-lg">
          <h2 className="text-4xl font-bold ">150</h2>
          <p className="text-sm ">Profile Visited</p>
        </div>
      </div>
    </div>
  );
};

export default UserDescription;
