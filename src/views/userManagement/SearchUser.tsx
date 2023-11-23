import { Box, Chip, Grid, IconButton, Stack, Typography } from "@mui/material";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { FormTextField } from "../../components/inputs/FormTextField";
import { FormAutocomplete } from "../../components/autocomplete/FormAutocomplete";
import { useForm } from "react-hook-form";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SearchTable from "../../components/tables/SearchTable";
import { useLayoutEffect, useState } from "react";
import { UserColumn } from "../../components/common/UserColumn";
import { CustomChip } from "../../components/chips/CustomChip";
import { userData } from "../../util";
import {
  faEye,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { useNavigate } from "react-router-dom";

export const SearchUser = () => {
  const navigate = useNavigate();
  const [adminTableData, setAdminTableData] = useState<Array<any>>([]);

  const resetSearch = () => {};

  const { register, watch, handleSubmit, setValue, reset, control } = useForm(
    {}
  );

  const tableHeadsAdmins = ["User ID", "User", "Username", "Module", "Status"];

  const tableHeadsStudents = [
    "User ID",
    "User",
    "Username",
    "Course",
    "Status",
  ];

  const handleSearch = () => {};

  const formatAdminData = (data: Array<any>) => {
    return data?.map((d: any) => ({
      id: d?.userId,
      user: <UserColumn id={d?.id} />,
      username: d?.username,
      module: d?.module,
      status:
        d?.status === "active" ? (
          <CustomChip label={"Active"} type="success" />
        ) : (
          <CustomChip label="Inactive" />
        ),
    }));
  };

  useLayoutEffect(() => {
    setAdminTableData(formatAdminData(userData));
  }, []);

  const handleEditUser = () => {};
  const handleViewUser = () => {};
  const handleDeleteUser = () => {};

  const handleNavigateAddUser = () => {
    navigate("/control/user-management/create-user");
  };

  const viewMoreOptions = [
    {
      name: "View",
      action: handleViewUser,
      icon: faEye,
    },
    {
      name: "Edit",
      action: handleEditUser,
      icon: faPenToSquare,
    },

    {
      name: "Delete",
      action: handleDeleteUser,
      icon: faTrash,
    },
  ];

  return (
    <Grid container columnSpacing={2} rowSpacing={2}>
      <Grid item md={12}>
        <PrimaryButton text={"+ Add User"} onClick={handleNavigateAddUser} />
        <Box className={"basic-card"} mt={2} px={3}>
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
              Search Users
            </Typography>

            <Chip
              icon={<RefreshRoundedIcon />}
              label="Refresh"
              onClick={resetSearch}
            />
          </Stack>
          <Grid container spacing={2} my={1}>
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
          <SearchTable
            tableData={adminTableData}
            tableHeaders={tableHeadsAdmins}
            id={""}
            paginate={true}
            viewMoreOptions={viewMoreOptions}
          />
        </Box>
      </Grid>
    </Grid>
  );
};
