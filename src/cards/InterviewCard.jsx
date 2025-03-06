import React from "react";
import { Plus } from "lucide-react";

const interviews = [
  {
    title: "Technical test Interview",
    mode: "Online Mode",
    date: "2 Jan 2025",
    time: "12:00 PM to 1:00 PM",
    meetLink: "https://www.zoom.com/meetingchdjjso",
    scheduledBy: "Darshal Sharma (2 Jan 2025)",
    assignedManager: ["/avatars/avatar-1.jpg", "/avatars/avatar-2.jpg"],
    interviewPanel: ["/avatars/avatar-3.jpg", "/avatars/avatar-4.jpg"],
  },
  {
    title: "Technical test Interview",
    mode: "Online Mode",
    date: "2 Jan 2025",
    time: "12:00 PM to 1:00 PM",
    meetLink: "https://www.zoom.com/meetingchdjjso",
    scheduledBy: "Darshal Sharma (2 Jan 2025)",
    assignedManager: ["/avatars/avatar-1.jpg", "/avatars/avatar-2.jpg"],
    interviewPanel: ["/avatars/avatar-3.jpg", "/avatars/avatar-4.jpg"],
  },
  {
    title: "Technical test Interview",
    mode: "Online Mode",
    date: "2 Jan 2025",
    time: "12:00 PM to 1:00 PM",
    meetLink: "https://www.zoom.com/meetingchdjjso",
    scheduledBy: "Darshal Sharma (2 Jan 2025)",
    assignedManager: ["/avatars/avatar-1.jpg", "/avatars/avatar-2.jpg"],
    interviewPanel: ["/avatars/avatar-3.jpg", "/avatars/avatar-4.jpg"],
  },
  {
    title: "Technical test Interview",
    mode: "Online Mode",
    date: "2 Jan 2025",
    time: "12:00 PM to 1:00 PM",
    meetLink: "https://www.zoom.com/meetingchdjjso",
    scheduledBy: "Darshal Sharma (2 Jan 2025)",
    assignedManager: ["/avatars/avatar-1.jpg", "/avatars/avatar-2.jpg"],
    interviewPanel: ["/avatars/avatar-3.jpg", "/avatars/avatar-4.jpg"],
  },
];

const InterviewCard = () => {
  return (
    <div className="space-y-6 w-3/5">
      {interviews.map((interview, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium">Interviews</h2>
            <span className="text-gray-600">{interview.scheduledBy}</span>
          </div>
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-medium">{interview.title}</h3>
                <div className="flex items-center mt-2">
                  <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">
                    {interview.mode}
                  </span>
                  <span className="ml-4 text-gray-600 text-sm">
                    {interview.date}, {interview.time}
                  </span>
                </div>
                <div className="mt-2">
                  <span className="text-sm text-gray-500">Meet Link - </span>
                  <a
                    href={interview.meetLink}
                    className="text-sm text-blue-500"
                  >
                    {interview.meetLink}
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-600 mb-2">Assigned Manger</p>
                  <div className="flex -space-x-2">
                    {interview.assignedManager.map((avatar, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                      >
                        <img
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=50&q=80"
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 mb-2">Interiew Panel</p>
                  <div className="flex -space-x-2">
                    {interview.interviewPanel.map((avatar, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                      >
                        <img
                          src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=50&q=80"
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InterviewCard;
