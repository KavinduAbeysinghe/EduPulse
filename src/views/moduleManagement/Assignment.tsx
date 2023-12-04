import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { FileUploader } from "../../components/common/FileUploader";
import { useNotification } from "../../contexts/NotificationContext";
import { DocPreviewModal } from "../../components/modals/DocPreviewModal";
import DeleteRounded from "@mui/icons-material/DeleteRounded";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { CustomBackdrop } from "../../components/backdrops/CustomBackdrop";

interface AssignmentProps {
  data: any;
  setOpen: any;
  assignments: any;
}

export const Assignment = ({ data, setOpen, assignments }: AssignmentProps) => {
  // const {register, setValue} = useForm({});

  const [isUploaded, setIsUploaded] = useState<boolean>(data?.isUploaded);

  const [docDetails, setDocDetails] = useState<any>(null);

  const [showModal, setShowModal] = useState<boolean>(false);

  const [file, setFile] = useState<any>(null);

  const fileInputRef = useRef<any>(null);

  const notify = useNotification();

  const handleBoxClick = async () => {
    // Trigger file input click on Box click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDownloadFile = (file: any) => {
    const link = document.createElement("a");
    link.href = file;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const uploadFile = (file: any) => {
    setFile(file);
    notify.success("File upload success");
  };

  const maxFileSize = 10 * 1024 * 1024;

  const handleFileChange = (e: any) => {
    // Handle the selected files here
    const selectedFiles = e.target.files[0];
    if (selectedFiles && selectedFiles.size < maxFileSize) {
      if (selectedFiles.type === "application/pdf") {
        uploadFile(selectedFiles);
      } else {
        notify.warn("Please upload a PDF");
      }
    } else {
      notify.warn("File too large");
    }
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const files = e.dataTransfer.files[0];
    if (files.type === "application/pdf") {
      uploadFile(files);
    } else {
      notify.warn("Please upload a PDF");
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handlePreviewFile = (file: any) => {
    console.log(typeof file);
    if (typeof file === "string") {
      const i = file.split("/");
      setDocDetails({
        doc: file,
        docType: "application/pdf",
        docTitle: i[i.length - 1],
      });
    } else {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setDocDetails({
          doc: e.target.result,
          docType: file.type,
          docTitle: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
    setShowModal(true);
  };

  const handleRemoveUpload = () => {
    setFile(null);
  };

  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);

  const handleSaveUpload = () => {
    setShowBackdrop(true);
    const timeout = setTimeout(() => {
      setShowBackdrop(false);
      setOpen(false);
      setIsUploaded(true);
      notify.success("Assignment has been successfully uploaded");
    }, 1000);
    return () => clearTimeout(timeout);
  };

  useEffect(() => {
    if (isUploaded) {
      console.log(data?.uploadedFile);
      setFile(data?.uploadedFile);
    }
  }, []);

  const getFileName = () => {
    if (typeof file === "string") {
      const i = file?.split("/");
      return i[i.length - 1];
    } else {
      return file.name;
    }
  };

  return (
    <>
      <CustomBackdrop open={showBackdrop} />
      <DocPreviewModal
        open={showModal}
        setOpen={setShowModal}
        maxWidth={"lg"}
        doc={docDetails?.doc}
        docType={docDetails?.docType}
        title={docDetails?.docTitle}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography fontWeight={600} mb={1} color={"text.secondary"}>
              Assignment
            </Typography>
            <Typography>Due: {data?.dueDate}</Typography>
          </Stack>
          <List sx={{ width: "100%" }} aria-label="contacts">
            <ListItem
              disablePadding
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="download"
                  onClick={() => handleDownloadFile(data?.file)}
                >
                  <DownloadRoundedIcon />
                </IconButton>
              }
            >
              <ListItemButton onClick={() => handlePreviewFile(data?.file)}>
                <ListItemIcon>
                  <InsertDriveFileRoundedIcon />
                </ListItemIcon>
                <ListItemText primary={data?.fileName} />
              </ListItemButton>
            </ListItem>
          </List>
        </Grid>
        {!file && (
          <Grid item xs={12} sm={12} md={12}>
            <Typography fontWeight={600} mb={1} color={"text.secondary"}>
              Assignment Upload
            </Typography>
            <FileUploader
              type={"file"}
              maxFileSize={"Unlimited"}
              setFiles={setFile}
              handleBoxClick={handleBoxClick}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
              fileInputRef={fileInputRef}
              handleFileChange={handleFileChange}
            />
          </Grid>
        )}
        <Grid item xs={12} sm={12} md={12}>
          <Typography fontWeight={600} mb={1} color={"text.secondary"}>
            Uploaded Assignment
          </Typography>
          {file ? (
            <List sx={{ width: "100%" }} aria-label="contacts">
              <ListItem
                disablePadding
                secondaryAction={
                  !isUploaded && (
                    <IconButton
                      edge="end"
                      aria-label="download"
                      onClick={handleRemoveUpload}
                    >
                      <DeleteRounded />
                    </IconButton>
                  )
                }
              >
                <ListItemButton onClick={() => {}}>
                  <ListItemIcon>
                    <InsertDriveFileRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary={getFileName()} />
                </ListItemButton>
              </ListItem>
            </List>
          ) : (
            <Typography>No Upload Available</Typography>
          )}
        </Grid>
        {!isUploaded && (
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            display={"flex"}
            justifyContent={"flex-end"}
            alignItems={"center"}
          >
            <PrimaryButton text={"Save"} onClick={handleSaveUpload} />
          </Grid>
        )}
      </Grid>
    </>
  );
};
