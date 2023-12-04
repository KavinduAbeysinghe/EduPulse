import {
  Box,
  Collapse,
  Grid,
  Grow,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FormTextField } from "../../components/inputs/FormTextField";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { FormAutocomplete } from "../../components/autocomplete/FormAutocomplete";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { FileUploader } from "../../components/common/FileUploader";
import { useNotification } from "../../contexts/NotificationContext";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import { DocPreviewModal } from "../../components/modals/DocPreviewModal";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TransitionGroup } from "react-transition-group";
import { FormDatePicker } from "../../components/datepickers/FormDatePicker";
import dayjs from "dayjs";
import { assignmentData, commonDateFormat } from "../../util";

interface AddAssignmentProps {
  moduleMaterials: Array<any>;
  appendModuleMaterials: any;
  sectionList: Array<any>;
  setShowModal: any;
}

export const AddAssignment = ({
  moduleMaterials,
  appendModuleMaterials,
  sectionList,
  setShowModal,
}: AddAssignmentProps) => {
  const commonError = "Field is required";

  const validationSchema = Yup.object().shape({
    section: Yup.string(),
    selectSection: Yup.string().required(commonError),
    fileTitle: Yup.string().required(commonError),
    dueDate: Yup.string()
      .required(commonError)
      .test("required-err", commonError, (value) => {
        return !(value === undefined || value === null || value === "");
      }),
  });

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);

  const [docDetails, setDocDetails] = useState<any>(null);

  const [files, setFiles] = useState<Array<any>>([]);

  const notify = useNotification();

  const section = watch("section");

  const handleAddSection = () => {
    if (section) {
      const dupExists = moduleMaterials?.find((i) => i?.title === section);
      if (!dupExists) {
        appendModuleMaterials({
          title: section,
          data: [],
        });
        notify.success("Section added successfully");
      } else {
        notify.warn("Section in the entered name already exists");
      }
      setValue("section", "");
    }
  };

  const sectionSelection = watch("selectSection");

  const fileTitle = watch("fileTitle");

  const fileInputRef = useRef<any>(null);

  const handleBoxClick = async () => {
    if (sectionSelection && fileTitle) {
      // Trigger file input click on Box click
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    } else {
      notify.warn("Please select a section and a file title");
    }
  };

  const uploadFile = (file: any) => {
    setFiles((prevFiles: any) => {
      const newFiles = [...prevFiles];
      newFiles.unshift({
        title: fileTitle,
        file: file,
      });
      return newFiles;
    });
    // setValue("selectSection", "");
    setValue("fileTitle", "");
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
    if (sectionSelection && fileTitle) {
      e.preventDefault();
      const files = e.dataTransfer.files[0];
      if (files.type === "application/pdf") {
        uploadFile(files);
      } else {
        notify.warn("Please upload a PDF");
      }
    } else {
      notify.warn("Please select a section and a file title");
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handlePreviewFile = (data: any) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      setDocDetails({
        doc: e.target.result,
        title: data?.title,
        type: data?.file?.type,
      });
    };
    reader.readAsDataURL(data?.file);
    setShowPreviewModal(true);
  };

  const handleRemove = (data: any) => {
    setFiles((prev) => [...prev]?.filter((i) => i !== data));
  };

  const onSubmit = (data: any) => {
    if (sectionSelection) {
      let d = moduleMaterials?.find((i: any) => i?.id === sectionSelection);
      const index = moduleMaterials.indexOf(d);
      files?.forEach((file) =>
        d?.data?.push({
          id: moduleMaterials?.length + 1,
          title: file?.title,
          file: file?.file,
          dueDate: dayjs(new Date(data?.dueDate)).format(commonDateFormat),
          isUploaded: false,
          uploadedFile: "",
        })
      );
      moduleMaterials[index] = d;
      console.log(moduleMaterials);
      setShowModal(false);
    }
  };

  return (
    <>
      <DocPreviewModal
        open={showPreviewModal}
        setOpen={setShowPreviewModal}
        maxWidth={"lg"}
        doc={docDetails?.doc}
        docType={docDetails?.type}
        title={docDetails?.title}
      />
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          display={"flex"}
          gap={1}
          alignItems={"center"}
        >
          <FormTextField
            register={register("section")}
            label={"Add Section"}
            placeholder="Enter Secion Title"
          />
          <IconButton onClick={handleAddSection}>
            <AddCircleOutlineRoundedIcon fontSize="large" />
          </IconButton>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <FormAutocomplete
            error={!!errors?.selectSection?.message}
            helperText={errors?.selectSection?.message?.toString()}
            setValue={setValue}
            label={"Select Section"}
            options={sectionList}
            id={"selectSection"}
            required={true}
            disabled={false}
            control={control}
            watch={watch}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <FormTextField
            required={true}
            register={register("fileTitle")}
            label={"Assignment Title"}
            placeholder="Enter a title for the file"
            error={!!errors?.fileTitle?.message}
            helperText={errors?.fileTitle?.message?.toString()}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <FormDatePicker
            label={"Due Date"}
            error={!!errors?.dueDate?.message}
            helperText={errors?.dueDate?.message?.toString()}
            name={"dueDate"}
            control={control}
            required={true}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <FileUploader
            type={"file"}
            maxFileSize={"10 MB"}
            setFiles={setFiles}
            handleBoxClick={handleBoxClick}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            fileInputRef={fileInputRef}
            handleFileChange={handleFileChange}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <List sx={{ width: "100%" }} aria-label="contacts">
            <TransitionGroup>
              {files?.map((i: any, index) => (
                <Collapse key={index}>
                  <ListItem
                    disablePadding
                    secondaryAction={
                      <Tooltip title={"Remove File"} placement="left-start">
                        <IconButton
                          edge="end"
                          aria-label="download"
                          onClick={() => handleRemove(i)}
                        >
                          <DeleteRoundedIcon />
                        </IconButton>
                      </Tooltip>
                    }
                  >
                    <ListItemButton onClick={() => handlePreviewFile(i)}>
                      <ListItemIcon>
                        <InsertDriveFileRoundedIcon />
                      </ListItemIcon>
                      <ListItemText primary={i?.title} />
                    </ListItemButton>
                  </ListItem>
                </Collapse>
              ))}
            </TransitionGroup>
          </List>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          display={"flex"}
          justifyContent={"flex-end"}
        >
          <PrimaryButton text={"Save"} onClick={handleSubmit(onSubmit)} />
        </Grid>
      </Grid>
    </>
  );
};
