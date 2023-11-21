import { Route, Routes } from "react-router-dom";
import { Login } from "./login/Login";
import { Dashboard } from "./dashboard/Dashboard";
import { Box, CssBaseline } from "@mui/material";
import { MyResponsiveDrawer } from "../components/drawer/MyResponsiveDrawer";
import { CourseManagement } from "./courseManagement/CourseManagement";

export const MainLayout = () => {
  return (
    <Routes>
      <Route element={<Login />} path="/" />
      <Route element={<Layout />} path="/control/*" />
    </Routes>
  );
};

const Layout = () => {
  const drawerWidth = 210;

  return (
    <Box display={"flex"}>
      <CssBaseline />
      <MyResponsiveDrawer />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          pt: 10,
        }}
      >
        <Routes>
          <Route element={<Dashboard />} path="/dashboard" />
          <Route element={<CourseManagement />} path="/course-management" />
        </Routes>
      </Box>
    </Box>
  );
};
