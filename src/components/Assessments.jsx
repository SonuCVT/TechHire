import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import DateFormatter from "./DateFormatter";
import useFetchAssessment from "../hooks/useFetchAssessment";
import { selectedAssessment, selectedCodingAssessment } from "../utils/addAssessmentSlice";
import axios from "axios";

const Assessments = () => {

  const [assessments,setAssessment]=useState([])
  
  const dispatch=useDispatch()

  const fetchAssessments = async () => {
    try {
          const response = await fetch("/api/assessments");
          if (!response.ok) {
            throw new Error("Failed to fetch assessments");
          }
          const assessmentsData = await response.json();
          console.log("Fetched Assessments:", assessmentsData);
          setAssessment(assessmentsData)
        } catch (error) {
          console.error("Error fetching assessments:", error);
        }
  };

  useEffect(() => {
    fetchAssessments();
  }, []);

   const selectAssessment=(id,title,type_of_test)=>{
       if(type_of_test==="OA Test"){
        dispatch(selectedAssessment(id))
       }else{
        dispatch(selectedCodingAssessment(id))
       }
       alert(`${title} selected successfully!`)
   }

   const deleteAssessment=async(id)=>{
    try {
      await axios.delete(`/api/assessments/${id}`);
      alert("Assesments Deleted successfully!");
      fetchAssessments()
    } catch (error) {
     // console.error("Error rejecting candidate:", error);
      alert("Failed to delete assessment.");
    }
    dispatch(selectedAssessment(""))
    useFetchAssessment()
   }
  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              Assessments
            </h1>
            <Link
              to="/addassessment"
              className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
            >
              + New Assessment
            </Link>
          </div>

          {assessments.length > 0 ? (
            <div className="space-y-4">
              {assessments.map((assessment, index) => (
                <div
                  key={index}
                  className="bg-white p-5 rounded-lg shadow-md border border-gray-200 flex justify-between"
                >
                 <div>
                 <h2 className="text-xl pb-2 font-semibold text-gray-900">
                    {assessment.title}
                  </h2>
                  <p className="text-gray-600">
                    <strong>Created By : </strong> {assessment.createdBy}
                  </p>
                  <p className="text-gray-600">
                    <strong>Created On : </strong>{" "}
                    <DateFormatter timestamp={assessment.creationDate} />
                  </p>
                  <p className="text-gray-600">
                    <strong>Deadline : </strong>{" "}
                    <DateFormatter timestamp={assessment.deadline} />
                  </p>
                  <p className="text-gray-600">
                    <strong>Type of Test:</strong> {assessment.type_of_test}
                  </p>
                  <p className="text-gray-600">
                    <strong>Status:</strong> {assessment.status}
                  </p>
                  <p className="text-gray-600">
                    <strong>Test Link : </strong>
                    <a
                      href={assessment.attachments}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600"
                    >
                      {assessment.attachments}
                    </a>
                  </p>
                 </div>
                 <div className="flex flex-col gap-2">
                  <button 
                     className="text-white px-6 py-1 cursor-pointer rounded-full mt-2 bg-green-600 hover:bg-[#2b3c52] transition"
                     onClick={()=>selectAssessment(assessment.id,assessment.title,assessment.type_of_test)}
                  >Select</button>
                  <button 
                    className="text-white px-6 py-1 cursor-pointer rounded-full mt-2 bg-red-600 hover:bg-[#2b3c52] transition"
                    onClick={()=>deleteAssessment(assessment.id)}
                  >delete</button>
                 </div>
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
