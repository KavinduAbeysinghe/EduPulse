import { Avatar, Box, Stack, Typography } from "@mui/material";
import { userData } from "../../util";

interface UserColumnProps {
  id: number;
}

export const UserColumn = ({ id }: UserColumnProps) => {
  const user = userData?.find((d: any) => d?.id === id);

  return (
    <Stack direction={"row"} gap={1}>
      <Avatar alt="Remy Sharp" src={user?.profileImg} />
      <Box>
        <Typography fontSize={"small"}>{user?.name}</Typography>
        <Typography fontSize={"small"}>{user?.designation}</Typography>
      </Box>
    </Stack>
  );
};
