import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("auth-token"); 
  console.log(isLoggedIn + "logged in")
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
