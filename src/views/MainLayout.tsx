import { Route, Routes } from "react-router-dom";
import { Login } from "./login/Login";
import { Dashboard } from "./dashboard/Dashboard";
import { Box, CssBaseline } from "@mui/material";
import { MyResponsiveDrawer } from "../components/drawer/MyResponsiveDrawer";
import { CourseManagement } from "./courseManagement/CourseManagement";
import { ModuleManagement } from "./moduleManagement/ModuleManagement";
import { UserManagement } from "./userManagement/UserManagement";
import { ForumManagement } from "../components/forums/ForumManagement";
import { AuthContextProvider, useAuthContext } from "../contexts/AuthContext";
import { ProtectedRoute } from "./common/ProtectedRoute";
import { Unauthorized } from "./common/Unauthorized";

export const MainLayout = () => {
  return (
    <Routes>
      <Route element={<Login />} path="/" />
      <Route element={<Layout />} path="/control/*" />
      <Route element={<Unauthorized />} path="/unauthorized" />
    </Routes>
  );
};

const Layout = () => {
  // const drawerWidth = 210;

  const { authContext } = useAuthContext();

  return (
    <Box display={"flex"} sx={{ backgroundColor: "rgb(240, 242, 245)" }}>
      <CssBaseline />
      <MyResponsiveDrawer />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          overflow: "auto",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          pt: 10,
        }}
      >
        <Routes>
          <Route
            element={
              <ProtectedRoute
                roles={["STAFF", "ADMIN", "STUDENT"]}
                userRoles={authContext?.roles}
                isLoggedIn={authContext?.isLoggedIn}
              />
            }
          >
            <Route element={<Dashboard />} path="/dashboard" />
          </Route>
          <Route
            element={
              <ProtectedRoute
                roles={["STAFF", "ADMIN", "STUDENT"]}
                userRoles={authContext?.roles}
                isLoggedIn={authContext?.isLoggedIn}
              />
            }
          >
            <Route element={<CourseManagement />} path="/course-management/*" />
          </Route>
          <Route
            element={
              <ProtectedRoute
                roles={["STAFF"]}
                userRoles={authContext?.roles}
                isLoggedIn={authContext?.isLoggedIn}
              />
            }
          >
            <Route element={<ModuleManagement />} path="/module-management/*" />
          </Route>
          <Route
            element={
              <ProtectedRoute
                roles={["STAFF", "ADMIN", "STUDENT"]}
                userRoles={authContext?.roles}
                isLoggedIn={authContext?.isLoggedIn}
              />
            }
          >
            <Route element={<UserManagement />} path="/user-management/*" />
          </Route>
          <Route
            element={
              <ProtectedRoute
                roles={["STAFF", "ADMIN", "STUDENT"]}
                userRoles={authContext?.roles}
                isLoggedIn={authContext?.isLoggedIn}
              />
            }
          >
            <Route
              element={<ForumManagement />}
              path="/discussions-and-forums/*"
            />
          </Route>
        </Routes>
      </Box>
    </Box>
  );
};
