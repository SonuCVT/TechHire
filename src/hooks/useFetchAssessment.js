import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addAssessment } from "../utils/addAssessmentSlice";

const useFetchAssessment = () => {
  const dispatch = useDispatch();

  const fetchAssessments = async () => {
    try {
      const response = await fetch("/api/assessments");
      if (!response.ok) {
        throw new Error("Failed to fetch assessments");
      }
      const assessmentsData = await response.json();
      console.log("Fetched Assessments:", assessmentsData);

      dispatch(addAssessment(assessmentsData));
    } catch (error) {
      console.error("Error fetching assessments:", error);
    }
  };

  useEffect(() => {
    fetchAssessments();
  }, [dispatch]);
};

export default useFetchAssessment;
