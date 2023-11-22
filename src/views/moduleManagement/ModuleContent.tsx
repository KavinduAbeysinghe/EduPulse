import { Box, Chip, Grid, Stack, Typography } from "@mui/material";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { useRef, useState } from "react";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";

export const ModuleContent = () => {
  const [files, setFiles] = useState<Array<any>>([]);

  const fileInputRef = useRef<any>(null);

  const handleBoxClick = () => {
    // Trigger file input click on Box click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: any) => {
    // Handle the selected files here
    const selectedFiles = e.target.files[0];
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.push(selectedFiles);
      return newFiles;
    });
    // notify.success("File upload success");
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const files = e.dataTransfer.files[0];
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.push(files);
      return newFiles;
    });
    // notify.success("File upload success");
  };

  return (
    <Box className={"basic-card"} px={3}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography className="card-heading">Module Materials</Typography>
        <Chip icon={<RefreshRoundedIcon />} label="Reset" onClick={() => {}} />
      </Stack>
      <Box
        p={3}
        className={"dotted-container"}
        mt={1}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={1}
        sx={{
          border: "1px dashed gray",
          borderRadius: "10px",
          transition: "all .5s ease-in-out",
          cursor: "pointer",
          ":hover": { backgroundColor: "rgba(255, 255, 255, 0.08)" },
        }}
        onClick={handleBoxClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <DriveFolderUploadIcon
          fontSize={"large"}
          sx={{ fontSize: "70px", color: "gray" }}
        />
        <Typography color={"gray"}>
          Click or Drag & Drop Files to Upload
        </Typography>
        <Typography color={"gray"}>Max Size 2 MB</Typography>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </Box>
    </Box>
  );
};
