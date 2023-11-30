import { Box, Typography } from "@mui/material";
import React from "react";
import Lottie from "lottie-react";
import animation from "../../assets/animations/animation.json";

export const Unauthorized = () => {
  return (
    <Box
      className={"login-container"}
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        width={"500px"}
        p={3}
        textAlign={"center"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Box height={250} width={250}>
          <Lottie animationData={animation} loop={true} autoPlay={true} />
        </Box>
        <Typography variant="h4" color={"#fff"}>
          Unauthorized
        </Typography>
      </Box>
    </Box>
  );
};
