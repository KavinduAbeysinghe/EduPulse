import { Box, Grid } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { FormAutocomplete } from "../../components/autocomplete/FormAutocomplete";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { FormCard } from "../../components/common/FormCard";
import { FormDropdown } from "../../components/dropdowns/FormDropdown";
import { FormTextField } from "../../components/inputs/FormTextField";
import { FormDatePicker } from "../../components/datepickers/FormDatePicker";
import { SearchButton } from "../../components/buttons/SearchButton";
import SearchTable from "../../components/tables/SearchTable";

export const EnrolledCourses = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({});

  const coursesTableHeads = [
    "Course Code",
    "Course Name",
    "Course Description",
    "Course Status",
  ];

  return (
    <FormCard header={"Enrolled Courses"} onResetClick={() => {}}>
      <Box mb={3}>
        <PrimaryButton text={"+ Enroll Now"} />
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <FormAutocomplete
            error={false}
            helperText={""}
            setValue={setValue}
            label={"Course"}
            options={[]}
            id={"course"}
            required={false}
            disabled={false}
            control={control}
            watch={watch}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <FormDatePicker
            label={"Date From"}
            error={false}
            helperText={""}
            name={"dateFrom"}
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} display={"flex"} gap={2}>
          <FormDatePicker
            label={"Date To"}
            error={false}
            helperText={""}
            name={"dateTo"}
            control={control}
          />
          <SearchButton />
        </Grid>
        <Grid item md={12}>
          <SearchTable
            tableData={[]}
            tableHeaders={coursesTableHeads}
            id={""}
            paginate={true}
          />
        </Grid>
      </Grid>
    </FormCard>
  );
};
