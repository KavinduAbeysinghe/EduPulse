import { Box, Chip, Stack } from "@mui/material";
import React, { ReactNode } from "react";
import { CardHeading } from "./CardHeading";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { PrimaryButton } from "../buttons/PrimaryButton";

interface FormCardProps {
  header: string;
  onResetClick: () => void;
}

export const FormCard: React.FC<any> = ({
  header,
  onResetClick,
  children,
  height,
}: any) => {
  return (
    <Box className={"basic-card"} px={3} height={"100%"}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <CardHeading text={header} />
        <Chip
          icon={<RefreshRoundedIcon />}
          label="Reset"
          onClick={onResetClick}
        />
      </Stack>
      <Box mt={3}>{children}</Box>
    </Box>
  );
};
