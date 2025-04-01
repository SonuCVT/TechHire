import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import ShortListedCard from "../cards/ShortListedCard";
import OARoundCard from "../cards/OARoundCard";
import CodingRoundCard from "../cards/CodingRoundCard";

const CandidateStatus = () => {
  const [shortlistedAssessment,setShortlistedAssessment]=useState([])
  const [oaRoundCandidates] = useState([
    {
      id: 2,
      status: "completed",
      round: "OA Round",
      candidateName: "Alice Johnson",
      appliedFor: "React Developer",
      appliedDate: "Mar 3, 2025",
      email: "alice@example.com",
      phone: "123-456-7890",
    },
  ]);
  const [codingRoundCandidates] = useState([
    {
      id: 4,
      status: "completed",
      round: "Coding Round",
      candidateName: "Bob Smith",
      appliedFor: "SDE",
      appliedDate: "Mar 3, 2025",
      email: "bob@example.com",
      phone: "987-654-3210",
    },
  ]);

  return (
    <>
      <Header />
      <div className="flex bg-gray-100">
        <Sidebar />
        <div className="flex-grow p-4">
          <div className="grid grid-cols-3 gap-3">
            <ShortListedCard
              title="Shortlisted"
            />
            <OARoundCard
              title="OA"
              candidates={oaRoundCandidates}
            />
            <CodingRoundCard
              title="Coding"
              candidates={codingRoundCandidates}
            />
          </div>
        </div>
      </div>
    </>
  );
};

// const ShortListedCard = ({ title, candidates }) => {
//   const [filter, setFilter] = useState("");
//   const [selectedCandidateId, setSelectedCandidateId] = useState(null);
//   const [selectedAssessment, setSelectedAssessment] = useState("");
//   const [hoveredCandidateId, setHoveredCandidateId] = useState(null);

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     console.log(file);
//   };

//   const sendAssessment = async () => {
//     console.log(selectedCandidateId)
//     // if (!selectedCandidateId) {
//     //   alert("Please select a candidate first.");
//     //   return;
//     // }
//     // try {
//     //   await axios.post("/api/send-assessment", {
//     //     candidateId: selectedCandidateId,
//     //     assessmentType: selectedAssessment,
//     //   });
//     //   alert(`Assessment sent to Candidate ID: ${selectedCandidateId}`);
//     //   console.log(selectedCandidateId)
//     // } catch (error) {
//     //   console.error("Error sending assessment:", error);
//     //   alert("Failed to send assessment.");
//     // }
//   };

//   return (
//     <div className="bg-white p-4 rounded-xl shadow-md h-[80vh] overflow-y-scroll">
//       <div className="flex justify-between">
//       <h3 className="text-sm font-semibold mb-4">{title}</h3>
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-1">
//           {
//             title==="Shortlisted" ? "":
//             <input
//               type="file"
//               onChange={handleFileUpload}
//               className="block w-20 text-sm file:px-2 file:rounded-md file:border-0 file:text-xs file:font-medium hover:file:bg-blue-100 cursor-pointer border rounded-md"
//             />
//           }
//           <select
//             className="border border-gray-300 rounded-md w-28 mx-1 text-center"
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//           >
//             <option value="">All Positions</option>
//             <option value="Frontend Developer">Frontend</option>
//             <option value="Backend Developer">Backend</option>
//             <option value="FullStack Developer">Full Stack</option>
//             <option value="Data Analytics">Data Analytics</option>
//             <option value="Data Engineer">Data Engineer</option>
//             <option value="SDE">SDE</option>
//           </select>
//           {
//             title==="Coding Round" ? "":
//             <select
//             className="border border-gray-300 rounded-md w-28 mx-1 text-center"
//             value={selectedAssessment}
//             onChange={(e) => {
//               setSelectedAssessment(e.target.value);
//               sendAssessment();
//             }}
//           >
//             <option value="">Send</option>
//             <option value="Assessment1">Assessment 1</option>
//             <option value="Assessment2">Assessment 2</option>
//           </select>
//           }
//         </div>
//       </div>
//       </div>
//       <div>
//         {candidates
//           .filter((c) => (filter ? c.appliedFor === filter : true))
//           .map((candidate) => (
//             <div
//               key={candidate.id}
//               className="border rounded-lg p-4 mb-4 shadow-sm relative"
//             >
//               <span className={`px-3 py-1 text-sm font-medium rounded-full ${candidate.status === "completed"
//                   ? "bg-green-100 text-green-700"
//                   : "bg-yellow-100 text-yellow-700"
//                 }`}>
//                 {candidate.status}
//               </span>
//               <div className="flex justify-between">
//                 <p className="mt-2 font-medium">{candidate.candidateName}</p>
//                 <input
//                   type="checkbox"
//                   onChange={() => setSelectedCandidateId(candidate.candidateId)}
//                 />
//               </div>
//               <p className="text-sm text-gray-600">{candidate.appliedFor}</p>
//               <p className="text-xs text-gray-500">Applied: {candidate.appliedDate}</p>
//               <div className="mt-3 flex flex-col gap-2">
//                 <div
//                   className="relative"
//                   onMouseEnter={() =>
//                     setHoveredCandidateId(candidate.candidateId)
//                   }
//                   onMouseLeave={() => setHoveredCandidateId(null)}
//                 >
//                   <button className="text-sm px-3 py-1 bg-red-100 text-red-600 cursor-pointer rounded-md w-full">
//                     Contact Info
//                   </button>
//                   {/* Show contact details inside the card */}
//                   {hoveredCandidateId === candidate.candidateId && (
//                     <div className="mt-2 bg-gray-100 p-2 rounded-md text-sm">
//                       <p>
//                         <strong>Email:</strong>{" "}
//                         {candidate.candidateEmail || "Not Available"}
//                       </p>
//                       <p>
//                         <strong>Phone:</strong>{" "}
//                         {candidate.phoneNumber || "Not Available"}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//                 <button className="text-sm px-3 py-1 bg-blue-100 text-blue-600 cursor-pointer rounded-md">
//                   <a href={candidate.resumeUrl} target="_blank" rel="noopener noreferrer">
//                     View Resume
//                   </a>
//                 </button>
//               </div>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

export default CandidateStatus;