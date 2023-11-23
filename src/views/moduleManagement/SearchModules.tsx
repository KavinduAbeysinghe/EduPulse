import { Box, Chip, Grid, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { FormTextField } from "../../components/inputs/FormTextField";
import { FormAutocomplete } from "../../components/autocomplete/FormAutocomplete";
import { useForm } from "react-hook-form";
import { FormDropdown } from "../../components/dropdowns/FormDropdown";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { ModuleCard } from "./ModuleCard";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useNavigate } from "react-router-dom";

export const SearchModules = () => {
  const navigate = useNavigate();

  const { register, watch, handleSubmit, setValue, reset, control } = useForm(
    {}
  );

  const resetSearch = () => {};

  const moduleData = [
    {
      id: 1,
      title: "MD10001 - Database Management Systems",
      img: "https://zeenea.com/wp-content/uploads/2023/01/databases-zeenea.jpg.webp",
      code: "MD10001",
      lead: "Mr. John Williams",
      createdDate: "1 Nov 2023",
      status: "active",
    },
    {
      id: 2,
      title: "MD10001 - Database Management Systems",
      img: "https://zeenea.com/wp-content/uploads/2023/01/databases-zeenea.jpg.webp",
      code: "MD10002",
      lead: "Mr. Wayne Hopkins",
      createdDate: "1 Nov 2023",
      status: "inactive",
    },
    {
      id: 3,
      title: "MD10001 - Database Management Systems",
      img: "https://zeenea.com/wp-content/uploads/2023/01/databases-zeenea.jpg.webp",
      code: "MD10003",
      lead: "Ms. Syntheia Son",
      createdDate: "1 Nov 2023",
      status: "active",
    },
    {
      id: 4,
      title: "MD10001 - Database Management Systems",
      img: "https://zeenea.com/wp-content/uploads/2023/01/databases-zeenea.jpg.webp",
      code: "MD10003",
      lead: "Mrs. Natalie May",
      createdDate: "1 Nov 2023",
      status: "active",
    },
    {
      id: 5,
      title: "MD10001 - Database Management Systems",
      img: "https://zeenea.com/wp-content/uploads/2023/01/databases-zeenea.jpg.webp",
      code: "MD10005",
      lead: "Mr. Chris Tyson",
      createdDate: "1 Nov 2023",
      status: "active",
    },
    {
      id: 6,
      title: "MD10001 - Database Management Systems",
      img: "https://zeenea.com/wp-content/uploads/2023/01/databases-zeenea.jpg.webp",
      code: "MD10006",
      lead: "Mr. Jimmy Migill",
      createdDate: "1 Nov 2023",
      status: "inactive",
    },
  ];

  const handleCreate = () => {
    navigate("/control/module-management/create-module");
  };

  const handleSearch = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <Box mb={2}>
        <PrimaryButton text={"+ Add Module"} onClick={handleCreate} />
      </Box>
      <Grid container rowSpacing={7} columnSpacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <Box className={"basic-card"} px={3}>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              flexWrap={"wrap"}
            >
              <Typography className={"card-heading"}>Search Modules</Typography>
              <Chip
                icon={<RefreshRoundedIcon />}
                label="Refresh"
                onClick={resetSearch}
              />
            </Stack>
            <Grid container mt={1} spacing={2}>
              <Grid item xs={12} sm={12} md={12}>
                <Typography fontSize={"small"} color={"text.secondary"} mb={1}>
                  Select the course first *
                </Typography>
                <FormAutocomplete
                  error={false}
                  helperText={""}
                  setValue={setValue}
                  label={"Course"}
                  options={[]}
                  id={""}
                  required={false}
                  disabled={false}
                  control={control}
                  watch={watch}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <FormAutocomplete
                  error={false}
                  helperText={""}
                  setValue={setValue}
                  label={"Module Name"}
                  options={[]}
                  id={""}
                  required={false}
                  disabled={false}
                  control={control}
                  watch={watch}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <FormAutocomplete
                  error={false}
                  helperText={""}
                  setValue={setValue}
                  label={"Module Lead"}
                  options={[]}
                  id={""}
                  required={false}
                  disabled={false}
                  control={control}
                  watch={watch}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} display={"flex"} gap={1}>
                <Box flexGrow={1}>
                  <FormDropdown
                    label={"Year"}
                    name={"year"}
                    options={[]}
                    helperText={""}
                    control={control}
                    fullWidth
                  />
                </Box>
                <IconButton onClick={handleSubmit(handleSearch)}>
                  <SearchRoundedIcon />
                </IconButton>
              </Grid>
              {/* <Grid item xs={1} sm={1} md={1}>
                <IconButton onClick={handleSubmit(handleSearch)}>
                  <SearchRoundedIcon />
                </IconButton>
              </Grid> */}
            </Grid>
          </Box>
        </Grid>
        {moduleData?.map((d: any) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            display={"flex"}
            justifyContent={"center"}
          >
            <ModuleCard
              img={d?.img}
              title={d?.title}
              code={d?.code}
              lead={d?.lead}
              status={d?.status}
              date={d?.status}
              action={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
