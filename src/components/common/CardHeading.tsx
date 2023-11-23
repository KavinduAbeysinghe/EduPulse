import { Typography } from "@mui/material";

export const CardHeading = ({ text }: any) => {
  return (
    <Typography className="card-heading" fontSize={"large"} fontWeight={600}>
      {text}
    </Typography>
  );
};
