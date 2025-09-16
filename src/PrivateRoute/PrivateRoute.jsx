import { Navigate, useLocation } from "react-router";
import UseAuth from "../hooks/UseAuth";
import Loading from "../pages/shared/Loading/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const location = useLocation();
  // console.log(location);
  if (loading) {
    return <Loading></Loading>
  }

  if (!user) {
    // user na thakle login page redirect hobe
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
