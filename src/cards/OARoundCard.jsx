import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setCandidates } from '../utils/setCandidateSlice';

const OARoundCard = ({ title }) => {
  const [filter, setFilter] = useState("");
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [hoveredCandidateId, setHoveredCandidateId] = useState(null);
  //const [candidates, setCandidates] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef(null);
  const seletedId = useSelector(state => state.addassessment.selectCodingAssessment);
  const [assessment, setShortlistedAssessment] = useState(null);
  const candidates = useSelector(state => state.candidate.candidates);
 const dispatch  =useDispatch()
  // Fetch assessments when selectedId changes
  useEffect(() => {  
    const fetchAssessments = async () => {
      try {
        if (seletedId) {
          const res = await axios.get(`/api/assessments/${seletedId}`);
          setShortlistedAssessment(res.data);
        }
      } catch (error) {
        console.error("Error fetching assessments:", error);
        toast.error("Failed to load assessment details");
      }
    };
    
    fetchAssessments();
  }, [seletedId]);

  // useEffect(() => {
  //   if (candidates.length === 0) {
  //     axios.get('/api/assessment')
  //       .then(response => dispatch(setCandidates(response.data)))
  //       .catch(error => console.error("Error fetching candidates:", error));
  //   }
  // }, [dispatch, candidates.length]);

  // Fetch initial candidates data
  // useEffect(() => {
  //   const fetchInitialCandidates = async () => {
  //     try {
  //       const response = await axios.get('/api/assessment');
  //       setCandidates(response.data);
  //     } catch (error) {
  //       console.error("Error fetching candidates:", error);
  //     }
  //   };
    
  //   fetchInitialCandidates();
  // }, []);

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
      const uploadResponse = await axios.post('/api/assessment/upload-scores', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(uploadResponse.data)
      if (uploadResponse.data?.updatedCount > 0) {
        toast.success(`Successfully updated ${uploadResponse.data.updatedCount} candidates`);
        
        // Fetch updated candidates
        const response = await axios.get('/api/assessment');
        dispatch(setCandidates(response.data));
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

  const sendAssessment = async () => {
    if (!selectedCandidateId || !assessment) {
      toast.warn("Please select a candidate and assessment");
      return;
    }
  
    setIsSending(true);
    
    try {
      console.log("Raw Test Date:", assessment.creationDate);
      console.log("Raw Test Deadline:", assessment.deadline);
  
      const testDate = new Date(assessment.creationDate);
      const testDeadline = new Date(assessment.deadline);
  
      if (isNaN(testDate.getTime()) || isNaN(testDeadline.getTime())) {
        toast.warn("Invalid test date or deadline format!");
        setIsSending(false);
        return;
      }
  
      const codingTestDate = testDate.toISOString().split('T')[0]; // "YYYY-MM-DD"
      const codingTestStartTime = testDate.toTimeString().split(' ')[0]; // "HH:MM:SS"
      const codingTestEndTime = testDeadline.toTimeString().split(' ')[0]; // "HH:MM:SS"
      const codingTestDeadline = codingTestEndTime; 
  
      const payload = {
        codingTestDate,
        codingTestStartTime,
        codingTestEndTime,
        codingTestDeadline,
        codingPlatformUrl: assessment.attachments,
        instructions: assessment.about,
      };
  
      console.log("Payload:", payload);
  
      const response = await axios.post(
        `/api/codingRound/${selectedCandidateId}`, 
        payload
      );
  
      if (response.status === 200) {
        toast.success(`Assessment sent to candidate ${selectedCandidateId}`);
        const updatedResponse = await axios.get('/api/assessment');
        dispatch(setCandidates(updatedResponse.data));
      }
    } catch (error) {
      console.error("Error sending assessment:", error);
      toast.error(error.response?.data?.message || 'Failed to send assessment');
    } finally {
      setIsSending(false);
    }
  };
  

  const filteredCandidates = candidates.filter(candidate => 
    candidate.status !== "Coding_Round" && (filter ? candidate.appliedFor === filter : true)
  );
  

  return (
    <div className="bg-white p-4 rounded-xl shadow-md h-[80vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        
        <div className="flex items-center space-x-2">
          {title !== "Shortlisted" && (
            <>
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
            </>
          )}
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm"
          >
            <option value="">All Positions</option>
            <option value="Frontend Developer">Frontend</option>
            <option value="Backend Developer">Backend</option>
            <option value="FullStack Developer">Full Stack</option>
            <option value="Data Analytics">Data Analytics</option>
            <option value="Data Engineer">Data Engineer</option>
            <option value="SDE">SDE</option>
          </select>
          
          {!assessment ? (
            <Link
              to="/assessments"
              className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition"
            >
              Select Assessment
            </Link>
          ) : (
            <button
              onClick={sendAssessment}
              disabled={isSending || !selectedCandidateId}
              className={`px-4 py-1 rounded-md text-sm ${
                isSending || !selectedCandidateId
                  ? 'bg-blue-300 text-white cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {isSending ? 'Sending...' : assessment.title || 'Send Assessment'}
            </button>
          )}
        </div>
      </div>
      
      {isUploading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredCandidates.length > 0 ? (
        <div className="space-y-3">
          {filteredCandidates.map((candidate) => (
            <div 
              key={`${candidate.candidateId}-${candidate.id}`}
              className={`border rounded-lg p-4 shadow-sm relative transition-all ${
                selectedCandidateId === candidate.id ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  candidate.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {candidate.status || 'Pending'}
              </span>
              
              <div className="flex justify-between items-start mt-2">
                <div>
                  <p className="font-medium">{candidate.candidateName}</p>
                  <p className="text-sm text-gray-600">{candidate.appliedFor}</p>
                  <p className="text-xs text-gray-500">
                    Applied: {new Date(candidate.appliedDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm mt-1">
                    <span className="font-medium">Score:</span> {candidate.score ?? 'N/A'}
                  </p>
                </div>
                
                <input
                  type="checkbox"
                  checked={selectedCandidateId === candidate.id}
                  onChange={() => setSelectedCandidateId(candidate.id)}
                  className="h-4 w-4 mt-1"
                />
              </div>
              
              <div className="mt-3 space-y-2">
                <div
                  className="relative"
                  onMouseEnter={() => setHoveredCandidateId(candidate.candidateId)}
                  onMouseLeave={() => setHoveredCandidateId(null)}
                >
                  <button className="w-full text-sm px-3 py-1 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition">
                    Contact Info
                  </button>
                  {hoveredCandidateId === candidate.candidateId && (
                    <div className="absolute z-10 mt-1 w-full bg-white p-2 rounded-md shadow-lg border border-gray-200">
                      <p className="text-sm">
                        <span className="font-medium">Email:</span> {candidate.candidateEmail || "N/A"}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Phone:</span> {candidate.phoneNumber || "N/A"}
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
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          {candidates.length === 0 && (
            <p className="text-sm">Upload file to view candidate score details</p>
          )}
        </div>
      )}
    </div>
  );
};

export default OARoundCard;