import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuthContext } from "../../contexts/AuthContext";
import { useEffect, useLayoutEffect, useState } from "react";

interface ProtectedRouteProps {
  roles?: Array<string>;
  userRoles: Array<string>;
  isLoggedIn: boolean;
}

export const ProtectedRoute = ({
  roles,
  userRoles,
  isLoggedIn,
}: ProtectedRouteProps) => {
  const [isRoleAvailable, setIsRoleAvailable] = useState<boolean>(false);

  const [str, setStr] = useState<string>("");
  // const { authContext } = useAuthContext();

  useEffect(() => {
    console.log(roles);
    console.log(
      userRoles.find((role: string) => roles?.includes(role)) ? true : false
    );

    const i = userRoles.find((role: string) => roles?.includes(role))
      ? true
      : false;
    setIsRoleAvailable(i);
    setStr("Hi");
  }, [userRoles]);

  const location = useLocation();

  useEffect(() => {
    console.log("effect", isRoleAvailable);
    console.log("str", str);
  }, [isRoleAvailable, str]);

  return (
    <>
      {isLoggedIn ? (
        isRoleAvailable ? (
          <>
            <Outlet />
          </>
        ) : (
          <Navigate to="/unauthorized" state={{ from: location }} replace />
        )
      ) : (
        <>
          {console.log("roles:", userRoles.length)}
          <Navigate to="/" state={{ from: location }} replace />
        </>
      )}
    </>
  );
};
