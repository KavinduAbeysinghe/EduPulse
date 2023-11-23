import { Button } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export const MoreButton: React.FC<any> = ({ children, ...rest }) => {
  return (
    <Button
      {...rest}
      sx={{ color: "text.secondary" }}
      endIcon={<NavigateNextIcon />}
    >
      {children}
    </Button>
  );
};
