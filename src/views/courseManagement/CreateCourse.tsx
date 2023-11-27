import { Box, Chip, Grid, Stack, Typography } from "@mui/material";
import { FormTextField } from "../../components/inputs/FormTextField";
import { FormAutocomplete } from "../../components/autocomplete/FormAutocomplete";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormDropdown } from "../../components/dropdowns/FormDropdown";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomBackdrop } from "../../components/backdrops/CustomBackdrop";
import { useNotification } from "../../contexts/NotificationContext";
import { courseData } from "../../util";

export const CreateCourse = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const [pageTitle, setPageTitle] = useState<string>("");

  const [page, setPage] = useState<string>("");

  const location = useLocation();

  const notify = useNotification();

  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);

  const commonError = "Field is requied";

  const defaultValues = {
    courseName: "",
    courseDesc: "",
    courseCategory: "",
    durationType: "",
    courseDuration: "",
    targetAudience: "",
    enrollment: "",
    courseFormat: "",
  };

  const validationSchema = Yup.object().shape({
    courseName: Yup.string().required(commonError),
    courseDesc: Yup.string().required(commonError),
    courseCategory: Yup.string().required(commonError),
    durationType: Yup.string().required(commonError),
    courseDuration: Yup.string().required(commonError),
    targetAudience: Yup.string().required(commonError),
    enrollment: Yup.string().required(commonError),
    courseFormat: Yup.string().required(commonError),
  });

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    const obj = searchParams.get("course");
    if (obj) {
      const parsedObj = JSON.parse(obj);
      setPage(parsedObj?.page);
      setPageTitle(
        parsedObj?.page === "view"
          ? "View Course Details"
          : parsedObj?.page === "edit"
          ? "Edit Course Details"
          : "Create Course"
      );
      const course = courseData?.find((d: any) => d?.id === parsedObj?.id);
      const defVals = {
        courseName: course?.name ?? "",
        courseDesc: course?.description ?? "",
        courseCategory: course?.category ?? "",
        durationType: course?.durationType ?? "",
        courseDuration: course?.courseDuration ?? "",
        targetAudience: course?.targetAudience ?? "",
        enrollment: course?.enrollment ?? "",
        courseFormat: course?.courseFormat ?? "",
      };
      reset(defVals);
    } else {
      setPageTitle("Create Course");
    }
  }, [location]);

  const onSubmit = (data: any) => {
    setShowModal(true);
    const timeout = setTimeout(() => {
      console.log(data);
      notify.success("Course Created Successfully");
      navigate(-1);
      setShowModal(false);
    }, 1000);

    return () => clearTimeout(timeout);
  };

  const resetForm = () => {
    reset({});
    reset(defaultValues);
  };

  const durationTypeList = [
    { label: "Years", value: "years" },
    { label: "Months", value: "months" },
    { label: "Days", value: "days" },
  ];

  const courseFormatList = [
    { label: "Online", value: "online" },
    { label: "Physical", value: "physical" },
    { label: "Hybrid", value: "hybrid" },
  ];

  const enrollmentList = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
  ];

  const targetAudienceList = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
  ];

  const courseCategoryList = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
  ];

  return (
    <>
      <CustomBackdrop open={showModal} />
      <Box className={"basic-card"} px={2}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            className="card-heading"
            fontSize={"large"}
            fontWeight={600}
          >
            {pageTitle}
          </Typography>
          {page !== "view" && (
            <Chip
              icon={<RefreshRoundedIcon />}
              label="Reset"
              onClick={resetForm}
            />
          )}
        </Stack>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={12} md={3}>
            <FormTextField
              register={register("courseName")}
              label={"Course Name"}
              required={true}
              disabled={page === "view"}
              error={!!errors?.courseName?.message}
              helperText={errors?.courseName?.message?.toString()}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <FormTextField
              register={register("courseDesc")}
              label={"Course Description"}
              multiline={true}
              required={true}
              disabled={page === "view"}
              error={!!errors?.courseDesc?.message}
              helperText={errors?.courseDesc?.message?.toString()}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <FormAutocomplete
              error={!!errors?.courseCategory?.message}
              helperText={errors?.courseCategory?.message?.toString()}
              setValue={setValue}
              label={"Course Category"}
              options={courseCategoryList}
              id={"courseCategory"}
              required={true}
              disabled={page === "view"}
              control={control}
              watch={watch}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2}>
            <FormDropdown
              name={"durationType"}
              options={durationTypeList}
              control={control}
              fullWidth
              label={"Duration Type"}
              required={true}
              disabled={page === "view"}
              error={!!errors?.durationType?.message}
              helperText={errors?.durationType?.message?.toString()}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2}>
            <FormTextField
              register={register("courseDuration")}
              label={"Course Duration"}
              type="number"
              required={true}
              disabled={page === "view"}
              error={!!errors?.durationType?.message}
              helperText={errors?.durationType?.message?.toString()}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <FormDropdown
              name={"targetAudience"}
              options={targetAudienceList}
              error={!!errors?.targetAudience?.message}
              helperText={errors?.targetAudience?.message?.toString()}
              control={control}
              fullWidth
              label={"Target Audience"}
              required={true}
              disabled={page === "view"}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2}>
            <FormDropdown
              name={"enrollment"}
              options={enrollmentList}
              error={!!errors?.enrollment?.message}
              helperText={errors?.enrollment?.message?.toString()}
              control={control}
              fullWidth
              label={"Enrollment"}
              required={true}
              disabled={page === "view"}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2}>
            <FormDropdown
              name={"courseFormat"}
              options={courseFormatList}
              error={!!errors?.courseFormat?.message}
              helperText={errors?.courseFormat?.message?.toString()}
              control={control}
              fullWidth
              label={"Course Format"}
              required={true}
              disabled={page === "view"}
            />
          </Grid>
          {page !== "view" && (
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"flex-end"}
            >
              <PrimaryButton
                text={"> Create Course"}
                onClick={handleSubmit(onSubmit)}
              />
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
};
