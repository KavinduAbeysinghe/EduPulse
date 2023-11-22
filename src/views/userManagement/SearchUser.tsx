import { Box, Chip, Grid, IconButton, Stack, Typography } from "@mui/material";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { FormTextField } from "../../components/inputs/FormTextField";
import { FormAutocomplete } from "../../components/autocomplete/FormAutocomplete";
import { useForm } from "react-hook-form";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export const SearchUser = () => {
  const resetSearch = () => {};

  const { register, watch, handleSubmit, setValue, reset, control } = useForm(
    {}
  );

  const handleSearch = () => {};

  return (
    <Grid container columnSpacing={2} rowSpacing={2}>
      <Grid item md={12}>
        <Box className={"basic-card"} px={3}>
          <Stack
            direction={"row"}
            gap={1}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography
              className="card-heading"
              fontSize={"large"}
              fontWeight={600}
            >
              Search Courses
            </Typography>

            <Chip
              icon={<RefreshRoundedIcon />}
              label="Refresh"
              onClick={resetSearch}
            />
          </Stack>
          <Grid container spacing={2} mt={1}>
            <Grid item md={4}>
              <FormTextField register={undefined} label={"Username"} />
            </Grid>
            <Grid item md={4}>
              <FormAutocomplete
                error={false}
                helperText={undefined}
                setValue={setValue}
                label={"Designation"}
                options={[]}
                id={""}
                required={false}
                disabled={false}
                control={control}
                watch={watch}
              />
            </Grid>
            <Grid item md={4} display={"flex"} gap={1}>
              <FormAutocomplete
                error={false}
                helperText={undefined}
                setValue={setValue}
                label={"Module"}
                options={[]}
                id={""}
                required={false}
                disabled={false}
                control={control}
                watch={watch}
              />
              <IconButton onClick={handleSubmit(handleSearch)}>
                <SearchRoundedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item md={4}>
        <Box className={"basic-card"}></Box>
      </Grid>
    </Grid>
  );
};
