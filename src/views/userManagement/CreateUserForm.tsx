import { Avatar, Box, Grid } from "@mui/material";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { FormAutocomplete } from "../../components/autocomplete/FormAutocomplete";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { FormCard } from "../../components/common/FormCard";
import { FormDropdown } from "../../components/dropdowns/FormDropdown";
import { FormTextField } from "../../components/inputs/FormTextField";

export const CreateUserForm = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({});

  const fileInputRef = useRef<any>(null);

  const handleAvatarClick = () => {
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
      //   setUploadedImg(e!.target!.result);
    };
    if (file && file.size < maxFileSize) {
      if (file.type === "image/png" || file.type === "image/jpeg") {
        reader.readAsDataURL(file);
      } else {
        // notify.warn("Please upload a PNG or a JPEG");
      }
    } else {
      //   notify.warn("File too large");
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={9}>
        <FormCard header={"Create User"} onResetClick={() => {}}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={3}>
              <FormDropdown
                name={"role"}
                options={[]}
                helperText={""}
                control={control}
                label={"Role"}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <FormTextField
                register={register("username")}
                label={"Username"}
                error={false}
                helperText={""}
                disabled={false}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <FormTextField
                register={register("firstName")}
                label={"First Name"}
                error={false}
                helperText={""}
                disabled={false}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <FormTextField
                register={register("lastName")}
                label={"Last Name"}
                error={false}
                helperText={""}
                disabled={false}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <FormDropdown
                name={"gender"}
                options={[]}
                helperText={""}
                control={control}
                label={"Gender"}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <FormTextField
                register={register("address")}
                label={"Address"}
                error={false}
                helperText={""}
                disabled={false}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <FormTextField
                register={register("email")}
                label={"Email"}
                error={false}
                helperText={""}
                disabled={false}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <FormTextField
                register={register("telephone")}
                label={"Telephone"}
                error={false}
                helperText={""}
                disabled={false}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <FormTextField
                register={register("mobile")}
                label={"Mobile"}
                error={false}
                helperText={""}
                disabled={false}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <FormTextField
                register={register("nic")}
                label={"NIC/Passport"}
                error={false}
                helperText={""}
                disabled={false}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <FormAutocomplete
                error={false}
                helperText={""}
                setValue={setValue}
                label={"Nationality"}
                options={[]}
                id={"nationality"}
                required={false}
                disabled={false}
                control={control}
                watch={watch}
              />
            </Grid>
            <Grid item md={12} container justifyContent={"end"}>
              <PrimaryButton text={"> Create User"} />
            </Grid>
          </Grid>
        </FormCard>
      </Grid>
      <Grid item md={3}>
        <FormCard header={"Profile"} onResetClick={() => {}}>
          <Grid container spacing={2.65}>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              container
              justifyContent={"center"}
            >
              <Box sx={{ display: "inline-block" }}>
                <Avatar
                  alt="Uploaded Img"
                  src={""}
                  sx={{
                    width: 100,
                    height: 100,
                    ":hover": { filter: "brightness(50%)" },
                    transition: "0.2s all ease-in-out",
                    cursor: "pointer",
                  }}
                  onClick={() => {}}
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e)}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <FormTextField
                register={register("username")}
                label={"Username"}
                error={false}
                helperText={""}
                disabled={false}
              />
            </Grid>
            <Grid
              item
              md={12}
              container
              justifyContent={"end"}
              alignItems={"center"}
            >
              <PrimaryButton text={"> Save"} />
            </Grid>
          </Grid>
        </FormCard>
      </Grid>
    </Grid>
  );
};
