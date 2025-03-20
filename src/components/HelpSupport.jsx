import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import UserDashboardHeader from "./UserDashboardHeader";
import UserDashboardSidebar from "./UserDashboardSidebar";

export const Card = ({ children, className }) => (
  <div className={`bg-white shadow-md rounded-lg ${className}`}>{children}</div>
);

export const CardContent = ({ children, className, onClick }) => (
  <div className={`p-4 ${className}`} onClick={onClick}>{children}</div>
);

export const Button = ({ children, className, ...props }) => (
  <button
    className={`px-4 py-2 rounded-lg text-white font-bold transition duration-300 ease-in-out ${className}`}
    {...props}
  >
    {children}
  </button>
);

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleAnswer = (index) =>
    setExpandedIndex(expandedIndex === index ? null : index);

  const questions = [
    {
      question: "What should I look for in a tech resume?",
      answer:
        "Look for relevant technical skills, project experience, problem-solving abilities, and a track record of continuous learning.",
    },
    {
      question: "How can I assess a candidate’s coding skills?",
      answer:
        "Use coding tests, whiteboard challenges, or platforms like HackerRank and Codility. Additionally, consider asking candidates to explain their code.",
    },
    {
      question: "What should be included in the offer letter?",
      answer:
        "The offer letter should include job title, salary details, benefits, start date, probation period, working hours, and other perks.",
    },
    {
      question: "What are some common mistakes in tech hiring?",
      answer:
        "Common mistakes include failing to clearly define the job role, overlooking soft skills, and relying too heavily on resumes without practical assessments.",
    },
    {
      question: "What should be included in the offer letter?",
      answer:
        "The offer letter should include job title, salary details, benefits, start date, probation period, working hours, and other perks.",
    },
    {
      question: "What are some common mistakes in tech hiring?",
      answer:
        "Common mistakes include failing to clearly define the job role, overlooking soft skills, and relying too heavily on resumes without practical assessments.",
    },
  ];

  return (
    <div className="p-4">
      <div className="flex">
      <div className="flex-row w-280">
      <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
      {questions.map((item, index) => (
        <Card key={index} className="mb-4 cursor-pointer">
          <CardContent onClick={() => toggleAnswer(index)}>
            <div className="flex justify-between items-center">
              <p>{item.question}</p>
              {expandedIndex === index ? <Minus className="text-red-500" /> : <Plus className="text-gray-500" />}
            </div>
            {expandedIndex === index && (
              <p className="mt-2 text-gray-600">{item.answer}</p>
            )}
          </CardContent>
        </Card>
      ))}
      </div>
      <div className="p-6">
      <Card className="mt-6">
        <ContactSection />
      </Card>
      </div>
      </div>
    </div>
  );
};

const ContactSection = () => (
  <div className="p-4 text-center">
    <h3 className="font-bold text-center">Contact Us</h3>
    <p className="text-sm text-gray-500 my-2">We're here to help you with your queries.</p>
    <p className="text-gray-700 font-semibold">📞 +91 98765 43210</p>
    <p className="text-blue-500 underline cursor-pointer">✉️ support@company.com</p>
    <Button className="bg-orange-500 hover:bg-orange-600 w-full mt-4">Shoot a Direct Mail</Button>
  </div>
);

const HelpSupport = () => {
  return (
    <div className="min-h-screen">
      <UserDashboardHeader />
      <div className="flex">
        <UserDashboardSidebar className="w-1/4 min-w-[300px]" />
        <div className="p-6 w-full">
          <FAQ />
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
