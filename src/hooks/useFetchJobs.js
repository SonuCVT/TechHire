import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {postJob} from "../utils/addPostjobSlice"
const useFetchJobs = () => {
    const dispatch = useDispatch();
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/jobs_posting");
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const jobsData = await response.json();
        //console.log(jobsData)
        dispatch(postJob(jobsData));
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
  
    useEffect(() => {
      fetchJobs()
    }, []);
  };
  
  export default useFetchJobs;