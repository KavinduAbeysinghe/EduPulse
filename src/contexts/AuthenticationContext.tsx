import { createContext, useEffect, useState } from "react";

interface AuthenticationContextType {
  permittedRoutes: Array<any>;
  isLoggedIn: boolean;
  currentUserId: any;
}

interface AuthenticationContextProps {
  authenticationContext: AuthenticationContextType;
  setAuthenticationContext: (obj: any) => void;
}

const AuthenticationContext = createContext<
  AuthenticationContextProps | undefined
>(undefined);

export const AuthenticationContextProvider: React.FC<any> = ({ children }) => {
  const [authenticationContext, setAuthenticationContext] =
    useState<AuthenticationContextType>({
      permittedRoutes: [],
      isLoggedIn: false,
      currentUserId: "",
    });

  const persistState = () => {
    sessionStorage.setItem(
      "authContext",
      JSON.stringify(authenticationContext)
    );
  };

  useEffect(() => {
    persistState();
  }, [authenticationContext]);

  const restoreState = () => {
    const obj = sessionStorage.getItem("authContext");
    if (obj) {
      const parsedObj = JSON.parse(obj);
      setAuthenticationContext(parsedObj);
    }
  };

  useEffect(() => {
    restoreState();
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{ authenticationContext, setAuthenticationContext }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
