import { Navigate, useLocation, useOutletContext } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";

const ProtectedRoute = ({ children }) => {
  const user=useAuthStore((state)=>state.user)
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  return children;
};
export default ProtectedRoute;
