import React from "react";

const SocialAccount = () => {
  return (
    <div className="flex justify-between items-center pb-2 mb-6">
      <h2 className="text-xl font-bold">Overview</h2>
      <div className="flex gap-4">
        <a href="#" className=" border-indigo-600"><button className="px-4 py-2 text-gray-500 hover:bg-white border-b-2 font-medium">
          LinkedIn
        </button></a>
        <a href="#"><button className="px-4 py-2 text-gray-500 hover:bg-white border-b-2">GithubID</button></a>
        <a href="#"><button className="px-4 py-2 text-gray-500 hover:bg-white border-b-2">Coding Profile</button></a>
      </div>
    </div>
  );
};

export default SocialAccount;
