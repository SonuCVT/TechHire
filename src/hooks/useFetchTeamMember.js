import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTeamMember } from "../utils/addTeammemberSlice";
const useFectTeam = () => {
    const dispatch = useDispatch();
    const fetchMember = async () => {
      try {
        const response = await fetch("/api/addMembers");
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const memberData= await response.json();
        //console.log(memberData)
        dispatch(addTeamMember(memberData));
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
  
    useEffect(() => {
      fetchMember()
    }, []);
  };
  
  export default useFectTeam;