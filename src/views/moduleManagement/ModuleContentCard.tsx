import { Box, Chip, Stack } from "@mui/material";
import React, { ReactNode } from "react";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { CardHeading } from "../../components/common/CardHeading";

interface ModuleContentCardProps {
  header: string;
  onAddClick: () => void;
}

export const ModuleContentCard: React.FC<any> = ({
  header,
  onAddClick,
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
        <PrimaryButton text={"+ Add"} onClick={() => onAddClick} />
      </Stack>
      <Box mt={3}>{children}</Box>
    </Box>
  );
};
