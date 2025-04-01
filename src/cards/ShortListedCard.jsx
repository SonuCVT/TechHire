import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ShortListedCard = ({ title}) => {
  const [filter, setFilter] = useState("");
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [hoveredCandidateId, setHoveredCandidateId] = useState(null);
  const [candidates,setCandidates]=useState([])
  const [assessment,setShortlistedAssessment]=useState([])
  const seletedId=useSelector(state=>state.addassessment.selectOaAssessment)
  const fetchShortlistedCandidates = async () => {
    try {
      const response = await axios.get("/api/shortlist");
      if(seletedId){
        const res =await axios.get(`/api/assessments/${seletedId}`)
        //console.log(res.data)
        setShortlistedAssessment(res.data)

      }
      //console.log(response.data)
      setCandidates(response.data);
      //
    } catch (error) {
      console.error("Error fetching shortlisted candidates:", error);
    }
  };
  useEffect(() => {  
    fetchShortlistedCandidates();
  }, []);

  const sendAssessment = async (id) => {
    if (!selectedCandidateId || !assessment || !assessment.creationDate || !assessment.deadline) {
      alert("Please select a candidate and ensure all assessment details are available.");
      return;
    }

    // const formatDate = (dateString) => {
    //   const date = new Date(dateString);
    //   return date.toLocaleDateString("en-CA"); // Format: YYYY-MM-DD
    // };
    
    // const formatTime = (dateString) => {
    //   const date = new Date(dateString);
    //   return date.toLocaleTimeString("en-GB", { hour12: false }); // Format: HH:mm:ss
    // };
    
    try {
      const payload = {
        testDate: assessment.creationDate,
        testDeadline:assessment.deadline,
        attachments: assessment.attachments, // Ensure it's an array
        type_of_test: assessment.type_of_test,
      };
      //console.log(selectedCandidateId)
      const response = await axios.post(`/api/assessment/${selectedCandidateId}`, payload);
  
      if (response.status === 200) {
        alert(`Assessment "${assessment.title}" sent successfully to Candidate ID: ${selectedCandidateId}`);
        fetchShortlistedCandidates();
      }
    } catch (error) {
      console.error("Error sending assessment:", error);
      alert("Failed to send assessment.");
    }
  };
  

  return (
    <div className="bg-white p-4 rounded-xl shadow-md h-[80vh] overflow-y-scroll">
      <div className="flex justify-between">
        <h3 className="text-sm font-semibold mb-4">{title}</h3>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            {/* Position Filter Dropdown */}
            <select
              className="border border-gray-300 rounded-md w-28 mx-1 text-center"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">All Positions</option>
              <option value="Frontend Developer">Frontend</option>
              <option value="Backend Developer">Backend</option>
              <option value="FullStack Developer">Full Stack</option>
              <option value="Data Analytics">Data Analytics</option>
              <option value="Data Engineer">Data Engineer</option>
              <option value="SDE">SDE</option>
            </select>

            {/* Assessment Selection */}
            {!assessment || Object.keys(assessment).length === 0 ? (
              // If no assessment is selected, show a link to the assessments page
              <Link
                to="/assessments"
                className="w-28 px-2 py-1 bg-red-500 text-white rounded-md text-[10px] hover:bg-red-600 transition"
              >
                Select Assessment
              </Link>
            ) : (
              // If assessment exists, show a button to send the assessment
              <button
                className="w-40 h-7 px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition flex justify-center items-center text-center"
                onClick={sendAssessment}
                >
                {assessment.title}
              </button>
            )}
          </div>
        </div>
      </div>

      <div>
        {candidates
          .filter((c) => (filter ? c.appliedFor === filter : true))
          .filter((c) => c.status !== "Pending")
          .map((candidate) => (
            <div
              key={candidate.id}
              className="border rounded-lg p-4 mb-4 shadow-sm relative"
            >
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  candidate.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {candidate.status}
              </span>
              <div className="flex justify-between">
                <p className="mt-2 font-medium">{candidate.candidateName}</p>
                <input
                  type="checkbox"
                  onChange={() => setSelectedCandidateId(candidate.id)}
                  checked={selectedCandidateId === candidate.id}
                />
              </div>
              <p className="text-sm text-gray-600">{candidate.appliedFor}</p>
              <p className="text-xs text-gray-500">
                Applied: {candidate.appliedDate}
              </p>
              <div className="mt-3 flex flex-col gap-2">
                {/* Contact Info Button */}
                <div
                  className="relative"
                  onMouseEnter={() =>
                    setHoveredCandidateId(candidate.candidateId)
                  }
                  onMouseLeave={() => setHoveredCandidateId(null)}
                >
                  <button className="text-sm px-3 py-1 bg-red-100 text-red-600 cursor-pointer rounded-md w-full">
                    Contact Info
                  </button>
                  {hoveredCandidateId === candidate.candidateId && (
                    <div className="mt-2 bg-gray-100 p-2 rounded-md text-sm">
                      <p>
                        <strong>Email:</strong>{" "}
                        {candidate.candidateEmail || "Not Available"}
                      </p>
                      <p>
                        <strong>Phone:</strong>{" "}
                        {candidate.phoneNumber || "Not Available"}
                      </p>
                    </div>
                  )}
                </div>
                {/* View Resume Button */}
                <button className="text-sm px-3 py-1 bg-blue-100 text-blue-600 cursor-pointer rounded-md">
                  <a
                    href={candidate.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Resume
                  </a>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ShortListedCard;
