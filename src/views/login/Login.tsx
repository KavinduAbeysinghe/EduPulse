import {
  Box,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { FormTextField } from "../../components/inputs/FormTextField";
import { FormButton } from "../../components/buttons/FormButton";
import { FormSwitch } from "../../components/switches/FormSwitch";
import { useEffect, useLayoutEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomBackdrop } from "../../components/backdrops/CustomBackdrop";
import { useLocation, useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { users } from "../../util";
import { useNotification } from "../../contexts/NotificationContext";
import { useAuthContext } from "../../contexts/AuthContext";
import { InnerModal } from "../../components/modals/CustomModal";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

export const Login = () => {
  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [openModal, setOpenModal] = useState<boolean>(false);

  const navigate = useNavigate();

  const notify = useNotification();

  const location = useLocation();

  const from = "/control/dashboard";

  const { setAuthContext } = useAuthContext();

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const commonError = "Field is required";

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(commonError),
    password: Yup.string().required(commonError),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = (data: any) => {
    setShowBackdrop(true);
    setTimeout(() => {
      const user = users?.find(
        (d: any) =>
          d?.username === data?.username && d?.password === data?.password
      );
      if (user) {
        setAuthContext((prevState: any) => ({
          ...prevState,
          isLoggedIn: true,
          roles: user?.role,
          user: user,
        }));
        navigate(from, { replace: true });
      } else {
        notify.error("Invalid Credentials");
      }
      setShowBackdrop(false);
    }, 1000);
  };

  // const textsArr = [
  //   "Sign in to Edu Pulse and embark on a seamless learning adventure.",
  //   // "Unlock a world of knowledge with our intuitive learning management system.",
  //   // "Dive into engaging courses, track your progress, and elevate your education experience.",
  // ];

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const media = useMediaQuery(`(min-width:900px)`);

  const media2 = useMediaQuery(`(min-width:409px)`);

  // useLayoutEffect(() => {
  //   window.history.replaceState(null, "", "/");
  // }, []);

  useEffect(() => {
    const handleBackButton = (event: any) => {
      event.preventDefault();
      // Optionally, you can show a message or perform other actions
    };

    // Disable the back button event listener
    window.addEventListener("popstate", handleBackButton);

    return () => {
      // Cleanup the event listener when the component is unmounted
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  return (
    <>
      <InnerModal
        open={openModal}
        setOpen={setOpenModal}
        maxWidth={"sm"}
        title={"Forgot Password"}
        body={<ForgotPasswordForm setShowModal={setOpenModal} />}
      />
      <ThemeProvider theme={theme}>
        <CustomBackdrop open={showBackdrop} />
        <Box height={"100vh"} className={"login-container"}>
          <Grid container height={"100%"}>
            {media && (
              <Grid
                item
                xs={12}
                sm={12}
                md={7}
                py={3}
                pl={3}
                pr={{ xs: 3, sm: 3, md: 0 }}
                position={"relative"}
                // overflow={"hidden"}
              >
                <img
                  src="https://media.edapp.com/image/upload/v1600109548/registration/login-background.jpg"
                  alt="login-bg"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderTopLeftRadius: "17px",
                    borderBottomLeftRadius: "17px",
                  }}
                />
                <Box p={10} position={"absolute"} top={0} zIndex={2}>
                  <Typography variant="h2" mt={3} color={"#eee"}>
                    Edu Pulse
                  </Typography>
                  <Typography fontSize={"large"} mt={1} color={"#eee"}>
                    Your Learning Partner
                  </Typography>
                  <Typography mt={1} color={"text.secondary"}>
                    - Unlock a world of knowledge with our intuitive learning
                    management system.
                  </Typography>
                </Box>
              </Grid>
            )}
            <Grid
              item
              my={3}
              pr={3}
              xs={12}
              sm={12}
              md={5}
              pl={{ xs: 3, sm: 3, md: 0 }}
            >
              <Box
                height={"100%"}
                className="login-form"
                textAlign={"center"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                position={"relative"}
                sx={{
                  borderTopRightRadius: "17px !important",
                  borderTopLeftRadius: !media
                    ? "17px !important"
                    : "0px !important",
                  borderBottomRightRadius: "17px !important",
                  borderBottomLeftRadius: !media ? "17px" : "0px !important",
                }}
              >
                <Stack
                  // maxWidth={"380px"}
                  direction={"column"}
                  justifyContent={"center"}
                  m={2}
                >
                  <Typography
                    color={"text.primary"}
                    fontWeight={700}
                    variant="h5"
                  >
                    Welcome Back
                  </Typography>
                  <Typography color={"text.secondary"} mb={5}>
                    Login to Continue
                  </Typography>
                  <Stack direction={"column"} gap={3}>
                    <FormTextField
                      register={register("username")}
                      label={"Username"}
                      error={!!errors?.username?.message}
                      helperText={errors?.username?.message?.toString()}
                    />
                    <Box>
                      <FormTextField
                        register={register("password")}
                        error={!!errors?.password?.message}
                        helperText={errors?.password?.message?.toString()}
                        label={"Password"}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position={"end"}>
                              <IconButton
                                size={"small"}
                                onClick={handlePasswordToggle}
                              >
                                {!showPassword ? (
                                  <FontAwesomeIcon icon={faEye} />
                                ) : (
                                  <FontAwesomeIcon icon={faEyeSlash} />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Stack
                        direction={!media2 ? "column-reverse" : "row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        mt={2}
                        flexWrap={"wrap"}
                        gap={2}
                      >
                        <FormSwitch control={undefined} label={"Remember Me"} />
                        <Typography
                          color={"text.secondary"}
                          textAlign={"end"}
                          sx={{
                            ":hover": { color: theme.palette.primary.main },
                            cursor: "pointer",
                          }}
                          onClick={() => setOpenModal(true)}
                        >
                          Forgot Password?
                        </Typography>
                      </Stack>
                    </Box>
                  </Stack>
                  <Stack mt={5} direction={"column"} gap={2}>
                    <PrimaryButton
                      text={"Login"}
                      onClick={handleSubmit(onSubmit)}
                    />
                    {/* <FormButton
                    text={"Login"}
                    variant="contained"
                    fullWidth
                    onClick={handleSubmit(onSubmit)}
                  /> */}
                    <Divider sx={{ color: "text.secondary" }}>Or</Divider>
                    <FormButton
                      text={"Continue with Email"}
                      variant="outlined"
                      fullWidth
                    />
                  </Stack>
                  <Typography mt={5} color={"text.secondary"}>
                    © Edu Pulse 2023
                  </Typography>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </>
  );
};
