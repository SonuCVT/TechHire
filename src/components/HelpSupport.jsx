import React from "react";
import { Plus } from "lucide-react";
import UserDashboardHeader from "./UserDashboardHeader";
import UserDashboardSidebar from "./UserDashboardSidebar";

export const Card = ({ children, className }) => (
  <div className={`bg-white shadow-md rounded-lg ${className}`}>{children}</div>
);

export const CardContent = ({ children, className }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

export const Button = ({ children, className, ...props }) => (
  <button
    className={`px-4 py-2 rounded-lg text-white font-bold ${className}`}
    {...props}
  >
    {children}
  </button>
);

const FAQ = () => {
  const questions = [
    {
      question: "What should I look for in a tech resume?",
      answer:
        "Look for relevant technical skills, project experience, problem-solving abilities, and a track record of continuous learning. Strong communication skills, teamwork experience, and adaptability to new technologies are also key qualities to highlight.",
    },
    {
      question: "How can I assess a candidate’s coding skills?",
      answer:
        "Use coding tests, whiteboard challenges, or platforms like HackerRank and Codility. Additionally, consider asking candidates to explain their code, discuss trade-offs, and solve real-world problems to gauge their analytical thinking and technical depth.",
    },
    {
      question: "What should be included in the offer letter?",
      answer:
        "The offer letter should include job title, salary details (fixed and variable components), bonus structure, benefits (health insurance, retirement plans), start date, probation period details, working hours, and other perks like remote work options. Clearly mention the expectations for the role and any legal agreements like NDAs or IP rights.",
    },
    {
      question: "What are some common mistakes in tech hiring?",
      answer:
        "Common mistakes include failing to clearly define the job role, overlooking soft skills, and relying too heavily on resumes without practical assessments. Avoid rushing the interview process, and ensure you assess both technical and cultural fit. Additionally, lack of transparency regarding salary, growth opportunities, or company culture can lead to mismatched expectations.",
    },
    {
      question: "What should be included in the offer letter?",
      answer:
        "The offer letter should include job title, salary details (fixed and variable components), bonus structure, benefits (health insurance, retirement plans), start date, probation period details, working hours, and other perks like remote work options. Clearly mention the expectations for the role and any legal agreements like NDAs or IP rights.",
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Frequently asked questions</h2>
      {questions.map((item) => (
        <Card key={item.question} className="mb-4">
          <CardContent className="p-4 cursor-pointer">
            <div className="flex justify-between items-center">
              <p>{item.question}</p>
              {/* <Plus className={`text-gray-500 `} /> */}
            </div>
            {<p className="mt-2 text-gray-600">{item.answer}</p>}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const ContactSection = () => (
    <div className="p-4 border rounded-lg w-[250px] mx-auto text-center">
      <h3 className="font-bold text-center">Do you have more questions?</h3>
      <p className="text-sm text-gray-500 my-2 text-center">
        End-to-end payments and financial management in a single solution. Meet the right platform to help realize.
      </p>
      <Button className="bg-orange-500 text-white w-full mt-4">Shoot a Direct Mail</Button>
    </div>
  );
const HelpSupport = () => {
  return (
    <div className="min-h-screen  ">
      <UserDashboardHeader />
      <div className="flex">
        <UserDashboardSidebar className="w-1/4 min-w-[300px]"/>
        <div className="p-6 flex  w-full">
          <div >
            <FAQ />
          </div>
          <ContactSection className="w-1/4 max-w-[250px]" />
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
