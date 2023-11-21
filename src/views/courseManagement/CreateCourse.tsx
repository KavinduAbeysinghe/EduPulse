import { Box, Chip, Grid, Stack, Typography } from "@mui/material";
import { FormTextField } from "../../components/inputs/FormTextField";
import { FormAutocomplete } from "../../components/autocomplete/FormAutocomplete";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormDropdown } from "../../components/dropdowns/FormDropdown";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const CreateCourse = () => {
  const [pageTitle, setPageTitle] = useState<string>("");

  const [page, setPage] = useState<string>("");

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  useLayoutEffect(() => {
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
    } else {
      setPageTitle("Create Course");
    }
  }, [location]);

  const { register, watch, handleSubmit, setValue, reset, control } = useForm(
    {}
  );

  return (
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
            onClick={() => {}}
          />
        )}
      </Stack>
      <Grid container spacing={2} mt={1}>
        <Grid item md={3}>
          <FormTextField
            register={register("courseName")}
            label={"Course Name"}
          />
        </Grid>
        <Grid item md={6}>
          <FormTextField
            register={register("courseDesc")}
            label={"Course Description"}
            multiline={true}
          />
        </Grid>
        <Grid item md={3}>
          <FormAutocomplete
            error={false}
            helperText={""}
            setValue={setValue}
            label={"Course Category"}
            options={[]}
            id={"courseCategory"}
            required={true}
            disabled={false}
            control={control}
            watch={watch}
          />
        </Grid>
        <Grid item md={2}>
          <FormDropdown
            name={"durationType"}
            options={[]}
            helperText={undefined}
            control={control}
            fullWidth
            label={"Duration Type"}
          />
        </Grid>
        <Grid item md={2}>
          <FormTextField
            register={register("courseDuration")}
            label={"Course Duration"}
            type="number"
          />
        </Grid>
        <Grid item md={4}>
          <FormDropdown
            name={"targetAudience"}
            options={[]}
            helperText={undefined}
            control={control}
            fullWidth
            label={"Target Audience"}
          />
        </Grid>
        <Grid item md={2}>
          <FormDropdown
            name={"enrollment"}
            options={[]}
            helperText={undefined}
            control={control}
            fullWidth
            label={"Enrollment"}
          />
        </Grid>
        <Grid item md={2}>
          <FormDropdown
            name={"courseFormat"}
            options={[]}
            helperText={undefined}
            control={control}
            fullWidth
            label={"Course Format"}
          />
        </Grid>
        {page !== "view" && (
          <Grid
            item
            md={12}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-end"}
          >
            <PrimaryButton text={"> Create Course"} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
