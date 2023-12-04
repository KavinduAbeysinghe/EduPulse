import { IconButton, Box, Typography } from "@mui/material";
import React, { useRef } from "react";
import InsertPhotoRoundedIcon from "@mui/icons-material/InsertPhotoRounded";
import { useNotification } from "../../contexts/NotificationContext";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";

interface FileUploaderProps {
  type: "file" | "image";
  maxFileSize: string;
  setFiles: any;
  handleBoxClick: any;
  handleDragOver: any;
  handleDrop: any;
  fileInputRef: any;
  handleFileChange: any;
  uploadedImg?: any;
}

export const FileUploader = ({
  type,
  maxFileSize,
  handleBoxClick,
  handleDragOver,
  handleDrop,
  handleFileChange,
  fileInputRef,
  uploadedImg,
}: FileUploaderProps) => {
  return (
    <IconButton
      sx={{
        width: "100%",
        backgroundColor: "#eee",
        borderRadius: "10px",
        p: 3,
        position: "relative",
        overflow: "hidden",
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
        {uploadedImg && (
          <img
            src={uploadedImg}
            alt="uploaded image"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              zIndex: 1,
              objectFit: "cover",
              objectPosition: "center",
              filter: "brightness(50%)",
            }}
          />
        )}
        <Box
          zIndex={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          {type === "file" ? (
            <UploadFileRoundedIcon fontSize={"large"} sx={{ color: "gray" }} />
          ) : (
            <InsertPhotoRoundedIcon fontSize={"large"} sx={{ color: "gray" }} />
          )}
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
      </Box>
    </IconButton>
  );
};
