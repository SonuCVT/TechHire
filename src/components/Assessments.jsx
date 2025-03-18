import React from 'react';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const Assessments = () => {
  const dispatch = useDispatch();
  const assessments = useSelector((state) => state.addassessment.assessment);

  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Assessments</h1>
            <Link 
              to="/addassessment" 
              className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
              + New Assessment
            </Link>
          </div>

          {assessments.length > 0 ? (
            <div className="space-y-4">
              {assessments.map((assessment, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">{assessment.title}</h2>
                  <p className="text-gray-600"><strong>Created By:</strong> {assessment.createdBy}</p>
                  <p className="text-gray-600"><strong>Created On:</strong> {assessment.creationDate}</p>
                  <p className="text-gray-600"><strong>Due Date:</strong> {assessment.deadline}</p>
                  <p className="text-gray-600"><strong>Assigned To:</strong> {assessment.assignTo}</p>
                  <p className="text-gray-600"><strong>Status:</strong> {assessment.status}</p>
                  {assessment.attachment && (
                    <p className="text-blue-500">
                      <strong>Attachment:</strong> 
                      <a href={assessment.attachment} target="_blank" rel="noopener noreferrer" className="underline ml-1">
                        View File
                      </a>
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-lg">No assessments available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Assessments;
