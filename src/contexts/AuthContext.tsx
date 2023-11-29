import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  roles: Array<string>;
  userId: any;
}

interface AuthContextProps {
  authContext: AuthContextType;
  setAuthContext: (obj: any) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthContextProvider: React.FC<any> = ({ children }) => {
  const [authContext, setAuthContext] = useState<AuthContextType>({
    isLoggedIn: false,
    roles: [],
    userId: "",
  });

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log(JSON.stringify(authContext));
    sessionStorage.setItem("authContext", JSON.stringify(authContext));
  }, [authContext]);

  useLayoutEffect(() => {
    const state = sessionStorage.getItem("authContext");

    if (state) {
      console.log(JSON.stringify(JSON.parse(state)));
      setAuthContext(JSON.parse(state));
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authContext, setAuthContext }}>
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
