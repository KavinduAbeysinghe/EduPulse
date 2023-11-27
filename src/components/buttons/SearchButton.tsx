import {
  Button,
  ButtonProps,
  IconButton,
  IconButtonProps,
} from "@mui/material";
import React from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { extend } from "dayjs";

interface SearchButtonProps {
  action: any;
}

export const SearchButton = ({ action, ...rest }: SearchButtonProps | any) => {
  return (
    <Button onClick={action} variant="outlined" {...rest}>
      <SearchRoundedIcon />
    </Button>
  );
};
