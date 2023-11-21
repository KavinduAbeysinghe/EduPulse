import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
}

export const ProtectedRoute: React.FC<any> = ({
  isAuthenticated,
  children,
}) => {
  return isAuthenticated ? children : <Navigate to={"/"} replace />;
};
