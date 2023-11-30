import { Navigate, Outlet, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  isRouteAccessible: boolean;
  redirectRoute?: string;
}

export const ProtectedRoute = ({
  isRouteAccessible,
  redirectRoute,
}: ProtectedRouteProps) => {
  const location = useLocation();

  return (
    <>
      {isRouteAccessible ? (
        <Outlet />
      ) : (
        <Navigate
          to={redirectRoute ? redirectRoute : "/"}
          state={{ from: location }}
          replace
        />
      )}
    </>
  );
};
