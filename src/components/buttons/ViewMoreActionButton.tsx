import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip, IconButton, Popover, Button, Stack } from "@mui/material";
import React, { useState } from "react";

interface ViewMoreActionButtonProps {
  options: Array<any>;
  row: any;
  id: any;
}

export const ViewMoreActionButton = ({
  options,
  row,
  id,
}: ViewMoreActionButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const ID = open ? "simple-popover" : undefined;

  return (
    <>
      <Tooltip title={"More"}>
        <IconButton onClick={handleClick}>
          <FontAwesomeIcon
            fontSize={"large"}
            icon={faEllipsis}
            style={{
              cursor: "pointer",
              color: "gray",
              verticalAlign: "center",
            }}
          />
        </IconButton>
      </Tooltip>
      <Popover
        id={ID}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Stack>
          {options?.map((opt: any, index) => (
            <Button
              onClick={() => {
                return opt?.handleClick(row[id ? id : ""]);
              }}
              key={index}
              sx={{ textTransform: "none", color: "text.secondary" }}
            >
              {opt?.tooltip}
            </Button>
          ))}
        </Stack>
      </Popover>
    </>
  );
};
