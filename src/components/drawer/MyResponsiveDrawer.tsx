import {
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  AppBar,
  IconButton,
  Typography,
  Drawer,
  Stack,
  Avatar,
  styled,
  alpha,
  InputBase,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuIcon from "@mui/icons-material/Menu";
import ProfilePic from "../../assets/images/person3.jpg";
import { Breadcrumb } from "../breadcrumbs/BreadCrumb";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import QuizRoundedIcon from "@mui/icons-material/QuizRounded";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import WorkspacesRoundedIcon from "@mui/icons-material/WorkspacesRounded";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import { useNavigate } from "react-router-dom";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const drawerWidth = 220;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha("#EEE", 0.15),
  "&:hover": {
    backgroundColor: alpha("#EEE", 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export const MyResponsiveDrawer = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const sideBarOptions: Array<any> = [
    {
      name: "Dashboard",
      icon: <DashboardRoundedIcon fontSize="small" />,
      path: "/control/dashboard",
    },
    // {
    //   name: "Workspace",
    //   icon: <WorkspacesRoundedIcon fontSize="small" />,
    //   path: "/control/dashboard",
    // },
    {
      name: "Courses",
      icon: <AssignmentRoundedIcon fontSize="small" />,
      path: "/control/course-management",
    },
    {
      name: "Modules",
      icon: <ViewModuleIcon fontSize="small" />,
      path: "/control/module-management",
    },
    {
      name: "Forums",
      icon: <QuizRoundedIcon fontSize="small" />,
      path: "/control/discussions-and-forums",
    },
    {
      name: "Users",
      icon: <PeopleRoundedIcon fontSize="small" />,
      path: "/control/user-management",
    },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  const theme = useTheme();

  const drawer = (
    <div
      style={{
        height: "100%",
        position: "relative",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography fontWeight={700} color={"#fff"}>
          Edu Pulse
        </Typography>
        {/* <IconButton>
          <WbSunnyRoundedIcon fontSize="small" />
        </IconButton> */}
      </Toolbar>
      <Divider className="custom-divider" />
      <List>
        {sideBarOptions.map((opt: any) => (
          <ListItem key={opt?.name} disablePadding>
            <ListItemButton onClick={() => handleNavigate(opt?.path)}>
              <ListItemIcon sx={{ color: "#fff" }}>{opt?.icon}</ListItemIcon>
              <ListItemText
                color="text.secondary"
                primary={opt?.name}
                sx={{
                  ".MuiTypography-root": {
                    fontSize: "0.9rem",
                    // fontWeight: 500,
                    color: "#fff",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box position={"absolute"} bottom={0} width={"100%"}>
        <Stack
          justifyContent={"center"}
          direction={"column"}
          gap={1}
          alignItems={"center"}
          m={2}
          p={2}
          className="bottom-logout-view"
          //   sx={{ borderBottomRightRadius: "50px" }}
          //   sx={{ backgroundColor: "primary.dark", borderRadius: "10px" }}
        >
          <Avatar alt="Remy Sharp" src="" />
          <Box textAlign={"center"}>
            <Typography fontSize={"small"} fontWeight={500} color={"#fff"}>
              Steph Williams
            </Typography>
            <Typography
              fontSize={"small"}
              color={theme.palette.getContrastText(
                theme.palette.secondary.dark
              )}
            >
              steph.w@gmail.com
            </Typography>
          </Box>
          <LogoutRoundedIcon
            fontSize="small"
            sx={{
              color: "text.secondary",
              cursor: "pointer",
              ":hover": { color: "primary.main" },
            }}
            onClick={handleLogout}
          />
        </Stack>
      </Box>
    </div>
  );

  //   const [appBarClass, setAppbarClass]= = useState<string>("");

  //   useEffect(() => {
  //     if (window.scroll > 0) {

  //     }
  //   }, []);

  return (
    <>
      <AppBar
        className=""
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "transparent",
          color: "text.primary",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            width={"100%"}
          >
            <Breadcrumb />

            {/* <Search>
              <SearchIconWrapper>
                <SearchRoundedIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search> */}
          </Stack>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              //   margin: "1rem",
              //   borderBottomRightRadius: "50px",
              //   height: "calc(100vh - 2rem)",
              boxSizing: "border-box",
              width: drawerWidth,
              // backgroundColor: "#FBFCFE !important",
              background:
                "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25)) !important",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};
