import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import QuizRoundedIcon from "@mui/icons-material/QuizRounded";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import {
  Alert,
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Slide,
  Stack,
  Toolbar,
  Typography,
  alpha,
  styled,
  useTheme,
} from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumb } from "../breadcrumbs/BreadCrumb";
import { useAuthContext } from "../../contexts/AuthContext";
import { userData, users } from "../../util";
import { CustomBackdrop } from "../backdrops/CustomBackdrop";
import logo from "../../assets/images/logos.png";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";

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
  const { authContext } = useAuthContext();

  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [userDetails, setUserDetails] = useState<any>(null);

  useLayoutEffect(() => {
    setUserDetails(authContext?.user);
  }, [authContext]);

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
    setShowBackdrop(true);
    const timeout = setTimeout(() => {
      sessionStorage.clear();
      localStorage.clear();
      window.history.replaceState(null, "", "/");
      navigate("/", { replace: true });
      setShowBackdrop(false);
    }, 1000);
    return () => clearTimeout(timeout);
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
        <img src={logo} alt="" height={40} />
        <Typography fontWeight={700} color={"#fff"} ml={2}>
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
          <Avatar alt="Remy Sharp" src={userDetails?.profileImg} />
          <Box textAlign={"center"}>
            <Typography fontSize={"small"} fontWeight={500} color={"#fff"}>
              {userDetails?.name}
            </Typography>
            <Typography
              fontSize={"small"}
              color={theme.palette.getContrastText(
                theme.palette.secondary.dark
              )}
            >
              {userDetails?.email}
            </Typography>
          </Box>
          <LogoutRoundedIcon
            // fontSize="small"
            sx={{
              color: "text.secondary",
              cursor: "pointer",
              ":hover": { color: "black" },
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

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [alertData, setAlertData] = useState<Array<any>>([]);

  const alerts = [
    {
      id: 1,
      message: "DBMS Coursework submission due 15 Nov 2023",
    },
    {
      id: 2,
      message: "Java module new materials added",
    },
    {
      id: 3,
      message: "Java coursework submission due today at 1 PM",
    },
  ];

  useLayoutEffect(() => {
    setAlertData(alerts);
  }, []);

  const handleClearNot = () => {
    setAlertData([]);
  };

  return (
    <>
      <CustomBackdrop open={showBackdrop} />
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
            <IconButton onClick={handleClick}>
              <NotificationsRoundedIcon />
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              {alertData.length > 0 ? (
                <>
                  <Stack p={2} gap={1}>
                    {alertData?.map((alert) => (
                      <Slide
                        direction="right"
                        in={true}
                        mountOnEnter
                        unmountOnExit
                      >
                        <Alert key={alert.id} severity="info">
                          {alert.message}
                        </Alert>
                      </Slide>
                    ))}
                    <Box sx={{ justifyContent: "flex-end", display: "flex" }}>
                      <Button
                        sx={{ color: "text.secondary", textTransform: "none" }}
                        onClick={handleClearNot}
                      >
                        Clear
                      </Button>
                    </Box>
                  </Stack>
                </>
              ) : (
                <Typography p={2} color={"text.secondary"} fontSize={"small"}>
                  No Notifications
                </Typography>
              )}
            </Popover>
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
