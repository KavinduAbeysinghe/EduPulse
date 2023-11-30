import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./login/Login";
import { Box, CssBaseline } from "@mui/material";
import { MyResponsiveDrawer } from "../components/drawer/MyResponsiveDrawer";
import { CourseManagement } from "./courseManagement/CourseManagement";
import { ModuleManagement } from "./moduleManagement/ModuleManagement";
import { UserManagement } from "./userManagement/UserManagement";
import { ForumManagement } from "../components/forums/ForumManagement";
import { useAuthContext } from "../contexts/AuthContext";
import { ProtectedRoute } from "./common/ProtectedRoute";
import { Unauthorized } from "./common/Unauthorized";
import { roles } from "../util";
import React, { Suspense } from "react";

const Dashboard = React.lazy(() => import("../views/dashboard/Dashboard"));

export const MainLayout = () => {
  const { authContext } = useAuthContext();

  return (
    <Routes>
      <Route element={<Login />} path="/" />
      <Route
        element={<ProtectedRoute isRouteAccessible={authContext.isLoggedIn} />}
      >
        <Route element={<Layout />} path="/control/*" />
      </Route>
      <Route element={<Unauthorized />} path="/unauthorized" />
      <Route
        path={"/*"}
        element={<Navigate to={"/"} replace relative="route" />}
      />
    </Routes>
  );
};

const Layout = () => {
  // const drawerWidth = 210;

  const { authorizeRole } = useAuthContext();

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
                isRouteAccessible={authorizeRole([
                  roles.ADMIN,
                  roles.STAFF,
                  roles.STUDENT,
                ])}
                redirectRoute="/unauthorized"
              />
            }
          >
            <Route
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Dashboard />
                </Suspense>
              }
              path="/dashboard"
            />
          </Route>
          <Route
            element={
              <ProtectedRoute
                isRouteAccessible={authorizeRole([
                  roles.STAFF,
                  roles.ADMIN,
                  roles.STUDENT,
                ])}
                redirectRoute="/unauthorized"
              />
            }
          >
            <Route element={<CourseManagement />} path="/course-management/*" />
          </Route>
          <Route
            element={
              <ProtectedRoute
                isRouteAccessible={authorizeRole([
                  roles.STAFF,
                  roles.ADMIN,
                  roles.STUDENT,
                ])}
                redirectRoute="/unauthorized"
              />
            }
          >
            <Route element={<ModuleManagement />} path="/module-management/*" />
          </Route>
          <Route
            element={
              <ProtectedRoute
                isRouteAccessible={authorizeRole([roles.ADMIN])}
                redirectRoute="/unauthorized"
              />
            }
          >
            <Route element={<UserManagement />} path="/user-management/*" />
          </Route>
          <Route
            element={
              <ProtectedRoute
                isRouteAccessible={authorizeRole([
                  roles.STAFF,
                  roles.ADMIN,
                  roles.STUDENT,
                ])}
                redirectRoute="/unauthorized"
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
