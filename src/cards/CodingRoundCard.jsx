import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {setCodingRoundScore} from "../utils/setCandidateCodingScoreSlice"
import { selectCandidateId } from '../utils/addInterviewSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
const CodingRoundCard = ({ title }) => {
    const [filter, setFilter] = useState("");
    const [selectedCandidateId, setSelectedCandidateId] = useState(null);
    const [selectedAssessment, setSelectedAssessment] = useState("");
    const [hoveredCandidateId, setHoveredCandidateId] = useState(null);
    const [isSending, setIsSending] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);
    const dispatch =useDispatch()
    const navigate =useNavigate()

    const candidates =useSelector((state)=>state.candidateScore.candidates)

    const handleUploadButtonClick = () => {
      fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
  
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        // Upload CSV file
        const uploadResponse = await axios.post('/api/codingRound/uploadCsv', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(uploadResponse.data)
        if (uploadResponse.data?.updatedCount > 0) {
          toast.success(`Successfully updated ${uploadResponse.data.updatedCount} candidates`);
          
          // Fetch updated candidates
          const response = await axios.get('/api/codingRound');
          dispatch(setCodingRoundScore(response.data));
          //setCandidates(response.data);
        } else {
          toast.info("No candidates were updated");
        }
      } catch (error) {
        console.error('Upload error:', error);
        toast.error(error.response?.data?.message || 'Failed to upload file');
      } finally {
        setIsUploading(false);
        e.target.value = ''; // Reset file input
      }
    };

    const handleAddInterview =()=>{
      if (!selectedCandidateId) {
            toast.warn("Please select a candidate and assessment");
            return;
      }
      setIsSending(true);
      dispatch(selectCandidateId(selectedCandidateId));
      navigate("/addinterview")
      setIsSending(false);
    }
  
  
  
    return (
      <div className="bg-white p-4 rounded-xl shadow-md h-[80vh] overflow-y-scroll">
        <div className="flex justify-between">
        <h3 className="text-sm font-semibold mb-4">{title}</h3>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            
              <button
                onClick={handleUploadButtonClick}
                disabled={isUploading}
                className={`px-3 py-1 text-sm rounded-md ${
                  isUploading 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-green-100 text-green-600 hover:bg-green-200'
                }`}
              >
                {isUploading ? 'Uploading...' : 'Upload'}
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".csv"
                className="hidden"
              />
            
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
            <button 
             disabled={isSending || !selectedCandidateId}
             className={`px-4 py-1 rounded-md text-sm ${
               isSending || !selectedCandidateId
                 ? 'bg-blue-300 text-white cursor-not-allowed'
                 : 'bg-blue-500 text-white hover:bg-blue-600'
             }`}
             onClick={handleAddInterview}
            >Add Interview</button>
          </div>
        </div>
        </div>
        <div>
          {candidates
            .filter((c) => (filter ? c.appliedFor === filter : true))
            .map((candidate) => (
              <div
                key={candidate.id}
                className="border rounded-lg p-4 mb-4 shadow-sm relative"
              >
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${candidate.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                  }`}>
                  {candidate.status}
                </span>
                <div className="flex justify-between">
                  <p className="mt-2 font-medium">{candidate.candidateName}</p>
                  <input
                    type="checkbox"
                    onChange={() => setSelectedCandidateId(candidate.candidateId)}
                  />
                </div>
                <p className="text-sm text-gray-600">{candidate.appliedFor}</p>
                <p className="text-sm mt-1">
                    <span className="font-medium">Score:</span> {candidate.score ?? 'N/A'}
                  </p>
                <div className="mt-3 flex flex-col gap-2">
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
                    {/* Show contact details inside the card */}
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
                  {candidate.resumeUrl && (
                  <a
                    href={candidate.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm px-3 py-1 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition text-center"
                  >
                    View Resume
                  </a>
                )}
                </div>
              </div>
            ))}
        </div>
      </div>
    );
}

export default CodingRoundCard