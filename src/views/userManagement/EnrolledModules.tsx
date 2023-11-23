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

export const EnrolledModules = () => {
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
    <FormCard header={"Enrolled Modules"} onResetClick={() => {}}>
      <Box mb={3}>
        <PrimaryButton text={"+ Enroll Now"} />
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <FormAutocomplete
            error={false}
            helperText={""}
            setValue={setValue}
            label={"Module Name"}
            options={[]}
            id={"course"}
            required={false}
            disabled={false}
            control={control}
            watch={watch}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={3}>
          <FormAutocomplete
            error={false}
            helperText={""}
            setValue={setValue}
            label={"Module Lead"}
            options={[]}
            id={"course"}
            required={false}
            disabled={false}
            control={control}
            watch={watch}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} display={"flex"} gap={2}>
          <FormDropdown
            name={"Year"}
            options={[]}
            helperText={""}
            control={control}
            fullWidth
            label={"Year"}
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
