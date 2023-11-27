import { Box, Chip, Grid, IconButton, Stack, Typography } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import { FormAutocomplete } from "../../components/autocomplete/FormAutocomplete";
import { useForm } from "react-hook-form";
import { FormDropdown } from "../../components/dropdowns/FormDropdown";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useLocation, useNavigate } from "react-router-dom";
import SearchTable from "../../components/tables/SearchTable";
import { CustomChip } from "../../components/chips/CustomChip";
import { CustomAvatarGroup } from "../../components/avatar/CustomAvatarGroup";
import { UserColumn } from "../../components/common/UserColumn";
import {
  faEye,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import AlertDialogSlide from "../../components/modals/AlertDialog";
import { moduleData, userData } from "../../util";

export const SearchModules = () => {
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const tableHeads = [
    "Module Code",
    "Module Name",
    "Module Lead",
    "Created Date",
    "Status",
    "Colloborators",
  ];

  const [moduleTableData, setModuleTableData] = useState<Array<any>>([]);

  const navigate = useNavigate();

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const { register, watch, handleSubmit, setValue, reset, control } = useForm(
    {}
  );

  const resetSearch = () => {};

  const handleCreate = () => {
    navigate("/control/module-management/create-module");
  };

  const handleSearch = (data: any) => {
    console.log(data);
  };

  const handleViewModule = () => {
    navigate("/control/module-management/view-module");
  };

  const formatData = (data: Array<any>) => {
    return data?.map((d: any) => ({
      id: d?.id,
      code: d?.code,
      title: d?.title,
      lead: <UserColumn id={d?.lead} />,
      createdDate: d?.createdDate,
      status:
        d?.status === "active" ? (
          <CustomChip label={"Active"} type="success" />
        ) : (
          <CustomChip label={"Inactive"} />
        ),
      colloborators: (
        <CustomAvatarGroup
          images={d?.collaborators?.map(
            (dta: any) => userData?.find((u: any) => u?.id === dta)?.profileImg
          )}
        />
      ),
    }));
  };

  useLayoutEffect(() => {
    setModuleTableData(formatData(moduleData));
  }, []);

  const handleNavigateView = (id: any) => {
    const module = { id: id, page: "view" };
    searchParams.set("module", JSON.stringify(module));
    navigate(`/control/module-management/view-module?${searchParams}`);
  };
  const handleNavigateEdit = (id: any) => {
    const module = { id: id, page: "edit" };
    searchParams.set("module", JSON.stringify(module));
    navigate(`/control/module-management/view-module?${searchParams}`);
  };
  const handleDelete = (id: any) => {
    setOpenAlert(true);
  };

  const actionButtons = [
    { tooltip: "View", icon: faEye, handleClick: handleNavigateView },
    { tooltip: "Edit", icon: faPenToSquare, handleClick: handleNavigateEdit },
    { tooltip: "Delete", icon: faTrash, handleClick: handleDelete },
  ];

  return (
    <>
      <AlertDialogSlide
        message={"Do you want to remove this module?"}
        handleYesClick={() => {}}
        handleNoClick={() => setOpenAlert(false)}
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
      />
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
              <Grid item xs={12} sm={12} md={12}>
                <SearchTable
                  tableData={moduleTableData}
                  tableHeaders={tableHeads}
                  id={"id"}
                  paginate={true}
                  actionButtons={actionButtons}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        {/* {moduleData?.map((d: any) => (
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
              action={handleViewModule}
            />
          </Grid>
        ))} */}
      </Grid>
    </>
  );
};
