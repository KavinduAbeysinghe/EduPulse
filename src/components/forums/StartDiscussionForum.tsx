import { FormTextField } from "../inputs/FormTextField";
import { Avatar, Box, Grid, Stack, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FormAutocomplete } from "../../components/autocomplete/FormAutocomplete";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { FormCard } from "../../components/common/FormCard";
import { FormDropdown } from "../../components/dropdowns/FormDropdown";
import InsertPhotoRoundedIcon from "@mui/icons-material/InsertPhotoRounded";
import { FileUploader } from "../common/FileUploader";
import { useNotification } from "../../contexts/NotificationContext";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface StartDiscussionForumProps {
  setMyForums: any;
  setOpen: any;
}

export const StartDiscussionForum = ({
  setMyForums,
  setOpen,
}: StartDiscussionForumProps) => {
  const notify = useNotification();

  const [files, setFiles] = useState<Array<any>>([]);

  const commonError = "Field is requied";

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(commonError),
    description: Yup.string().required(commonError),
    code: Yup.string().required(commonError),
  });

  const {
    register,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({ resolver: yupResolver(validationSchema) });

  const fileInputRef = useRef<any>(null);

  const [uploadedImg, setUploadedImg] = useState<any>("");

  const handleBoxClick = () => {
    // Trigger file input click on Box click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const maxFileSize = 2 * 1024 * 1024;

  const handleFileChange = (e: any) => {
    // Handle the selected files here
    console.log("File handler");

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImg(e!.target!.result);
    };
    if (file && file.size < maxFileSize) {
      if (file.type === "image/png" || file.type === "image/jpeg") {
        reader.readAsDataURL(file);
      } else {
        notify.warn("Please upload a PNG or a JPEG");
      }
    } else {
      notify.warn("File too large");
    }
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
    notify.success("File upload success");
  };

  const onSubmit = (data: any) => {
    console.log(data);
    setMyForums((prev: any) => {
      const newArr = [...prev];
      newArr.push({
        id: 5,
        title: data?.title,
        description: data?.description,
        date: "2023-11-27",
        people: [],
        code: data?.code,
        img: uploadedImg,
      });
      return newArr;
    });
    setOpen(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12}>
        <FileUploader
          uploadedImg={uploadedImg}
          type={"image"}
          maxFileSize={"2 MB"}
          setFiles={setFiles}
          handleBoxClick={handleBoxClick}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          fileInputRef={fileInputRef}
          handleFileChange={handleFileChange}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <FormTextField
          register={register("code")}
          label={"Code"}
          error={!!errors?.code?.message}
          helperText={errors?.code?.message?.toString()}
          disabled={false}
          required={true}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <FormTextField
          register={register("title")}
          label={"Title"}
          error={!!errors?.code?.message}
          helperText={errors?.code?.message?.toString()}
          disabled={false}
          required={true}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <FormTextField
          register={register("description")}
          label={"Description"}
          error={!!errors?.code?.message}
          helperText={errors?.code?.message?.toString()}
          disabled={false}
          required={true}
          multiline
        />
      </Grid>
      <Grid item container md={12} justifyContent={"end"} alignItems={"center"}>
        <PrimaryButton text={"> Create"} onClick={handleSubmit(onSubmit)} />
      </Grid>
    </Grid>
  );
};
