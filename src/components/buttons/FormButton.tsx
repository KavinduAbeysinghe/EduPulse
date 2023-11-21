import { Button, ButtonProps, styled } from "@mui/material";

interface FormButtonProps extends ButtonProps {
  text: string;
}

export const FormButton = ({
  text,
  variant,
  fullWidth,
  ...rest
}: FormButtonProps) => {
  const StyledButton = styled(Button)(({}) => ({
    boxShadow: "none",
    [variant === "contained" ? "border" : ""]: "none",
    "&:hover": {
      boxShadow: "inherit",
    },
  }));

  return (
    <StyledButton variant={variant} {...rest} fullWidth={!!fullWidth}>
      {text}
    </StyledButton>
  );
};
