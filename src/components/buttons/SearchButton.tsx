import { IconButton, IconButtonProps } from "@mui/material";
import React from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export const SearchButton = ({ onClick }: IconButtonProps) => {
  return (
    <IconButton onClick={onClick}>
      <SearchRoundedIcon />
    </IconButton>
  );
};
