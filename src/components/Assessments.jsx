import React from 'react'
import Header from './Header'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Assessments = () => {
  const dispatch = useDispatch();
  const assessments = useSelector((state) => state.addassessment.assessment);
  return (
    <>
       <Header/>
       <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-semibold">Assessments</h1>
        <Link to="/addassessment" className="px-4 py-2 bg-blue-500 text-white rounded">
          + New Assessment
        </Link>
      </div>


      {assessments.length >0 ? 
     (
        <div className="space-y-4">
          {assessments.map((assessment, index) => (
            <div key={index} className="border p-4 rounded bg-gray-100">
              <h2 className="text-xl font-semibold">{assessment.title}</h2>
              <p><strong>Created By:</strong> {assessment.createdBy}</p>
              <p><strong>Created On:</strong> {assessment.creationDate}</p>
              <p><strong>Due Date:</strong> {assessment.dueDate}</p>
              <p><strong>Assigned To:</strong> {assessment.assignedTo}</p>
              <p><strong>Status:</strong> {assessment.status}</p>
              <p><strong>Attachment:</strong> <a href={assessment.attachment} target="_blank" rel="noopener noreferrer" className="text-blue-500">{assessment.attachment}</a></p>
            </div>
          ))}
        </div>
      ):(
        <p>No assessments available.</p>
      )}
    </div>
    </>
  )
}

export default Assessments