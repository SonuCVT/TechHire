import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const user = useSelector(state => state.user); // Fetch user from Redux store
  const navigate =useNavigate()
  if (!user) {
    return navigate("/"); // Redirect to login if not authenticated
  }

  if (user.role === "hr" || user.role === "candidate") {
    return children; // Render the protected route
  }


};

export default AuthGuard;
