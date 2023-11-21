import { Button, ButtonProps, styled } from "@mui/material";

interface PrimaryButtonProps extends ButtonProps {
  text: string;
}

export const PrimaryButton = ({
  text,
  variant,
  fullWidth,
  ...rest
}: PrimaryButtonProps) => {
  const StyledButton = styled(Button)(({}) => ({
    boxShadow: "none",
    [variant === "contained" ? "border" : ""]: "none",
    "&:hover": {
      boxShadow: "inherit",
    },
  }));

  return (
    <StyledButton
      className="primary-button"
      variant={variant}
      {...rest}
      fullWidth={!!fullWidth}
    >
      {text}
    </StyledButton>
  );
};
