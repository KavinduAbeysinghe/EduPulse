import { IconButton, Box, Typography } from "@mui/material";
import React, { useRef } from "react";
import InsertPhotoRoundedIcon from "@mui/icons-material/InsertPhotoRounded";
import { useNotification } from "../../contexts/NotificationContext";

interface FileUploaderProps {
  type: "file" | "image";
  maxFileSize: string;
  setFiles: any;
  handleBoxClick: any;
  handleDragOver: any;
  handleDrop: any;
  fileInputRef: any;
  handleFileChange: any;
}

export const FileUploader = ({
  type,
  maxFileSize,
  handleBoxClick,
  handleDragOver,
  handleDrop,
  handleFileChange,
  fileInputRef,
}: FileUploaderProps) => {
  return (
    <IconButton
      sx={{
        width: "100%",
        backgroundColor: "#eee",
        borderRadius: "10px",
        p: 3,
      }}
      onClick={handleBoxClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <InsertPhotoRoundedIcon fontSize={"large"} sx={{ color: "gray" }} />
        <Typography sx={{ color: "gray" }}>
          {type === "file" ? "File Upload" : "Insert Image"}
        </Typography>
        <Typography fontSize={"small"} sx={{ color: "gray" }}>
          Click or Drag & Drop to Upload
        </Typography>
        <Typography fontSize={"small"} sx={{ color: "gray" }}>
          Max Size {maxFileSize}
        </Typography>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </Box>
    </IconButton>
  );
};
