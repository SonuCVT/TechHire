import React from "react";

const CandidatePipeline = () => {
  const stages = [
    { name: "Applied", count: 245, color: "text-purple-600" },
    { name: "Screened", count: 180, color: "text-blue-500" },
    { name: "Interview", count: 85, color: "text-green-600" },
    { name: "Offer", count: 32, color: "text-amber-500" },
    { name: "Hired", count: 28, color: "text-red-500" },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Candidate Pipeline</h2>
      <div className="grid grid-cols-5 gap-6 text-center">
        {stages.map((stage, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-sm">
            <div className={`text-2xl font-bold ${stage.color} mb-2`}>
              {stage.count}
            </div>
            <div className="text-sm text-gray-700 font-medium">{stage.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidatePipeline;
