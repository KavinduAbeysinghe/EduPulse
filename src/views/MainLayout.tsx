import { Route, Routes } from "react-router-dom";
import { Login } from "./login/Login";
import { Dashboard } from "./dashboard/Dashboard";
import { Box, CssBaseline } from "@mui/material";
import { MyResponsiveDrawer } from "../components/drawer/MyResponsiveDrawer";
import { CourseManagement } from "./courseManagement/CourseManagement";
import { ModuleManagement } from "./moduleManagement/ModuleManagement";
import { UserManagement } from "./userManagement/UserManagement";
import { ForumManagement } from "../components/forums/ForumManagement";

export const MainLayout = () => {
  return (
    <Routes>
      <Route element={<Login />} path="/" />
      <Route element={<Layout />} path="/control/*" />
    </Routes>
  );
};

const Layout = () => {
  // const drawerWidth = 210;

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
          <Route element={<Dashboard />} path="/dashboard" />
          <Route element={<CourseManagement />} path="/course-management/*" />
          <Route element={<ModuleManagement />} path="/module-management/*" />
          <Route element={<UserManagement />} path="/user-management/*" />
          <Route
            element={<ForumManagement />}
            path="/discussions-and-forums/*"
          />
        </Routes>
      </Box>
    </Box>
  );
};
