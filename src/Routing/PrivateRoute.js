import { Navigate } from "react-router";

const PrivateRoute = ({children }) => {
	if (!localStorage.getItem("user")) {
	  return <Navigate to="/" replace />;
	}
  
	return children;
  };

export default PrivateRoute;