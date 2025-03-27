import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import ShimmerLoader from "./ShimmerLoader";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
const AuthLoading = () => {
  const { keycloak } = useKeycloak();
  const dispatch =useDispatch()
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      try {
        if (!keycloak.authenticated) {
          navigate("/login");
          return;
        }
        // 1. Ensure user info is loaded
        const email =await keycloak.tokenParsed?.email;
        console.log("User's email:", email);
        await keycloak.loadUserInfo();
        // 2. Call your API endpoint
        const response = await fetch(`/api/candidates/email/${email}`);
        const data=await response.json();
        console.log(data);
        dispatch(addUser(data));
        if (response.ok) {
          // 3. Redirect based on role
          const userRoles = keycloak.tokenParsed?.realm_access?.roles || [];
          if (userRoles.includes("HR")) {
            navigate("/hr-dashboard");
          } else if (userRoles.includes("CANDIDATE")) {
            navigate("/user-dashboard");
          } else {
            navigate("/unauthorized");
          }
        } else {
          throw new Error("API request failed");
        }
      } catch (error) {
        console.error("Error:", error);
        navigate("/error");
      } finally {
        setIsLoading(false);
      }
    };
    // Add slight delay for better UX
    const timer = setTimeout(() => {
      checkAuthAndFetchData();
    }, 500);
    return () => clearTimeout(timer);
  }, [keycloak, navigate]);
  return isLoading ? <ShimmerLoader/> : null;
};
export default AuthLoading;






