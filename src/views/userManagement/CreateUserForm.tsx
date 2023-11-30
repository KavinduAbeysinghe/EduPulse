import { Avatar, Box, Grid } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FormAutocomplete } from "../../components/autocomplete/FormAutocomplete";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { FormCard } from "../../components/common/FormCard";
import { FormDropdown } from "../../components/dropdowns/FormDropdown";
import { FormTextField } from "../../components/inputs/FormTextField";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormDatePicker } from "../../components/datepickers/FormDatePicker";
import {
  genders,
  nationalities,
  roleOptions,
  roles,
  staffTypes,
} from "../../util";
import { CustomBackdrop } from "../../components/backdrops/CustomBackdrop";
import { useNotification } from "../../contexts/NotificationContext";

interface CreateUserFormProps {
  setIsUserCreated: any;
  setRole: any;
}

export const CreateUserForm = ({
  setIsUserCreated,
  setRole,
}: CreateUserFormProps) => {
  const [nationalityList, setNationalityList] = useState<Array<any>>([]);
  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);
  const [uploadedImg, setUploadedImg] = useState<any>("");
  const [userCreated, setUserCreated] = useState<boolean>(false);

  const notify = useNotification();

  const defaultValues = {
    role: roles.STUDENT,
    dob: "",
    firstName: "",
    lastName: "",
    gender: "",
    address: "",
    email: "",
    telephone: "",
    mobile: "",
    nic: "",
    nationality: "",
  };

  const commonError = "Field is required";

  const validationSchema1 = Yup.object().shape({
    role: Yup.number().required(commonError).typeError(commonError),
    dob: Yup.string()
      .required(commonError)
      .test("required-err", commonError, (value) => {
        return !(value === undefined || value === null || value === "");
      }),
    firstName: Yup.string().required(commonError),
    lastName: Yup.string().required(commonError),
    gender: Yup.string().required(commonError),
    address: Yup.string().required(commonError),
    email: Yup.string().email().required(commonError),
    telephone: Yup.string().required(commonError),
    mobile: Yup.string().required(commonError),
    nic: Yup.string().required(commonError),
    nationality: Yup.string().required(commonError),
  });

  const {
    register: register1,
    setValue: setValue1,
    watch: watch1,
    formState: { errors: errors1 },
    handleSubmit: handleSubmit1,
    control: control1,
    reset: reset1,
  } = useForm({ resolver: yupResolver(validationSchema1) });

  useEffect(() => {
    setIsUserCreated(userCreated);
  }, [userCreated]);

  const validationSchema2 = Yup.object().shape({
    username: Yup.string().required(commonError),
  });

  const {
    register: register2,
    setValue: setValue2,
    watch: watch2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
    control: control2,
    reset: reset2,
  } = useForm({ resolver: yupResolver(validationSchema2) });

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

  useEffect(() => {
    setNationalityList(
      nationalities?.map((d: any) => ({
        label: d?.nationality,
        value: d?.nationalityId,
      }))
    );
    setValue1("role", roles.STUDENT);
  }, []);

  const handleCreateUser = (data: any) => {
    setShowBackdrop(true);
    const timeout = setTimeout(() => {
      console.log(data);
      notify.success("User Creation Success");
      setUserCreated(true);
      setShowBackdrop(false);
    }, 1000);
    return () => clearTimeout(timeout);
  };

  const handleProfileUpdate = (data: any) => {
    if (userCreated) {
      setShowBackdrop(true);
      const timeout = setTimeout(() => {
        console.log(data);
        notify.success("Profile Update Success");
        setShowBackdrop(false);
      }, 1000);
      return () => clearTimeout(timeout);
    } else {
      notify.warn("Please Create a User First");
    }
  };

  const role = watch1("role");

  useEffect(() => {
    if (role) {
      setRole(role);
    }
  }, [role]);

  const handleResetForm1 = () => {
    reset1({});
    reset1(defaultValues);
  };

  const handleResetForm2 = () => {
    reset2({});
    setValue2("username", "");
    setUploadedImg("");
  };

  return (
    <>
      <CustomBackdrop open={showBackdrop} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={9}>
          <FormCard header={"Create User"} onResetClick={handleResetForm1}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={3}>
                <FormDropdown
                  name={"role"}
                  options={roleOptions}
                  error={!!errors1?.role?.message}
                  helperText={errors1?.role?.message?.toString()}
                  required={true}
                  control={control1}
                  label={"Role"}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <FormDatePicker
                  label={"Date of Birth"}
                  error={!!errors1?.dob?.message}
                  helperText={errors1?.dob?.message?.toString()}
                  required={true}
                  name={"dob"}
                  control={control1}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <FormTextField
                  register={register1("firstName")}
                  label={"First Name"}
                  error={!!errors1?.firstName?.message}
                  helperText={errors1?.firstName?.message?.toString()}
                  required={true}
                  disabled={false}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <FormTextField
                  register={register1("lastName")}
                  label={"Last Name"}
                  error={!!errors1?.lastName?.message}
                  helperText={errors1?.lastName?.message?.toString()}
                  required={true}
                  disabled={false}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <FormDropdown
                  name={"gender"}
                  options={genders}
                  error={!!errors1?.gender?.message}
                  helperText={errors1?.gender?.message?.toString()}
                  required={true}
                  control={control1}
                  label={"Gender"}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <FormTextField
                  register={register1("address")}
                  label={"Address"}
                  error={!!errors1?.address?.message}
                  helperText={errors1?.address?.message?.toString()}
                  required={true}
                  disabled={false}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <FormTextField
                  register={register1("email")}
                  label={"Email"}
                  error={!!errors1?.email?.message}
                  helperText={errors1?.email?.message?.toString()}
                  required={true}
                  disabled={false}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <FormTextField
                  register={register1("telephone")}
                  label={"Telephone"}
                  error={!!errors1?.telephone?.message}
                  helperText={errors1?.telephone?.message?.toString()}
                  required={true}
                  disabled={false}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <FormTextField
                  register={register1("mobile")}
                  label={"Mobile"}
                  error={!!errors1?.mobile?.message}
                  helperText={errors1?.mobile?.message?.toString()}
                  required={true}
                  disabled={false}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <FormTextField
                  register={register1("nic")}
                  label={"NIC/Passport"}
                  error={!!errors1?.nic?.message}
                  helperText={errors1?.nic?.message?.toString()}
                  required={true}
                  disabled={false}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <FormAutocomplete
                  error={!!errors1?.nationality?.message}
                  helperText={errors1?.nationality?.message?.toString()}
                  required={true}
                  setValue={setValue1}
                  label={"Nationality"}
                  options={nationalityList}
                  id={"nationality"}
                  disabled={false}
                  control={control1}
                  watch={watch1}
                />
              </Grid>
              <Grid item md={12} container justifyContent={"end"}>
                <PrimaryButton
                  text={"Create User"}
                  onClick={handleSubmit1(handleCreateUser)}
                />
              </Grid>
            </Grid>
          </FormCard>
        </Grid>
        <Grid item md={3}>
          <FormCard header={"Profile"} onResetClick={handleResetForm2}>
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
                    src={uploadedImg}
                    sx={{
                      width: 100,
                      height: 100,
                      ":hover": { filter: "brightness(50%)" },
                      transition: "0.2s all ease-in-out",
                      cursor: "pointer",
                    }}
                    onClick={handleAvatarClick}
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
                  register={register2("username")}
                  label={"Username"}
                  error={!!errors2?.username?.message}
                  helperText={errors2?.username?.message?.toString()}
                  required={true}
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
                <PrimaryButton
                  text={"Save"}
                  onClick={handleSubmit2(handleProfileUpdate)}
                />
              </Grid>
            </Grid>
          </FormCard>
        </Grid>
      </Grid>
    </>
  );
};
