import { Backdrop, CircularProgress } from "@mui/material";

interface CustomBackdropProps {
  open: boolean;
}

export const CustomBackdrop = ({ open }: CustomBackdropProps) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
