import { Box, Stack, Avatar, Typography } from "@mui/material";
import React from "react";

interface MessageViewProps {
  profileImg: any;
  name: string;
  description: string;
  date: string;
  designation: string;
}

export const MessageView = ({
  profileImg,
  name,
  description,
  date,
  designation,
}: MessageViewProps) => {
  return (
    <Box
      m={2}
      p={2}
      sx={{
        backgroundColor: "#eee",
        borderRadius: "10px",
        transition: "all .3s ease-in-out",
        ":hover": { backgroundColor: "#dbdbdb" },
      }}
    >
      <Stack
        useFlexGap
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack useFlexGap direction={"row"} alignItems={"center"} gap={2}>
          <Avatar alt="Remy Sharp" src={profileImg} />
          <Box>
            <Typography fontWeight={600}>{name}</Typography>
            <Typography
              color={"text.secondary"}
              fontWeight={600}
              fontSize={"small"}
            >
              {designation}
            </Typography>
          </Box>
        </Stack>
        <Typography
          color={"text.secondary"}
          fontWeight={600}
          fontSize={"small"}
        >
          {date}
        </Typography>
      </Stack>
      <Typography mt={3}>{description}</Typography>
    </Box>
  );
};
