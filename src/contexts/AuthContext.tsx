import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useLocation } from "react-router-dom";

interface AuthContextType {
  isLoggedIn: boolean;
  roles: Array<number>;
  user: any;
}

interface AuthContextProps {
  authContext: AuthContextType;
  setAuthContext: (obj: any) => void;
  authorizeRole: any;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthContextProvider: React.FC<any> = ({ children }) => {
  const [authContext, setAuthContext] = useState<AuthContextType>(() => {
    const state = sessionStorage.getItem("authContext");
    return state
      ? JSON.parse(state)
      : { isLoggedIn: false, roles: [], user: "" };
  });

  useEffect(() => {
    console.log(authContext);

    sessionStorage.setItem("authContext", JSON.stringify(authContext));
  }, [authContext]);

  const location = useLocation();

  useLayoutEffect(() => {
    if (location.pathname === "/") {
      sessionStorage.clear();
      localStorage.clear();
    }
  }, [location]);

  const authorizeRole = (roles: Array<number>) => {
    // console.log(
    //   authContext.roles.find((role) => roles.includes(role)) ? true : false
    // );
    return authContext.roles.find((role) => roles.includes(role))
      ? true
      : false;
  };

  return (
    <AuthContext.Provider
      value={{ authContext, setAuthContext, authorizeRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext: any = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context) {
    return context;
  } else {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
};
