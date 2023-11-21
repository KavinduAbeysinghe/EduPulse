import {
  Box,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import { FormTextField } from "../../components/inputs/FormTextField";
import { FormButton } from "../../components/buttons/FormButton";
import { FormSwitch } from "../../components/switches/FormSwitch";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomBackdrop } from "../../components/backdrops/CustomBackdrop";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();

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
      console.log(data);
      navigate("/control/course-management");
      setShowBackdrop(false);
    }, 1000);
  };

  return (
    <>
      <CustomBackdrop open={showBackdrop} />
      <Box height={"100vh"}>
        <Grid container height={"100%"}>
          <Grid
            item
            xs={12}
            sm={6}
            md={7}
            p={3}
            position={"relative"}
            // overflow={"hidden"}
            border={"1px solid white"}
          >
            <img
              src="https://media.edapp.com/image/upload/v1600109548/registration/login-background.jpg"
              alt="login-bg"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "17px",
              }}
            />
            <Box p={10} position={"absolute"} top={0} zIndex={2}>
              {/* <img src={logo} alt="app logo" height={120} /> */}

              <Typography variant="h2" mt={3} color={"#eee"}>
                Edu Pulse
              </Typography>
              <Typography mt={1} color={"#eee"}>
                Your Learning Partner
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            p={3}
            xs={12}
            sm={6}
            md={5}
            textAlign={"center"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            position={"relative"}
          >
            <Stack
              width={"380px"}
              direction={"column"}
              justifyContent={"center"}
            >
              <Typography fontWeight={700} variant="h5">
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
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    mt={2}
                    flexWrap={"wrap"}
                  >
                    <FormSwitch control={undefined} label={"Remember Me"} />
                    <Typography color={"text.secondary"} textAlign={"end"}>
                      Forgot Password?
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
              <Stack mt={5} direction={"column"} gap={2}>
                <FormButton
                  text={"Login"}
                  variant="contained"
                  fullWidth
                  onClick={handleSubmit(onSubmit)}
                />
                <Divider>Or</Divider>
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
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
