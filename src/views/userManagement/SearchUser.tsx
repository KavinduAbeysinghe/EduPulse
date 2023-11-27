import { Box, Chip, Grid, IconButton, Stack, Typography } from "@mui/material";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { FormTextField } from "../../components/inputs/FormTextField";
import { FormAutocomplete } from "../../components/autocomplete/FormAutocomplete";
import { useForm } from "react-hook-form";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SearchTable from "../../components/tables/SearchTable";
import { useEffect, useLayoutEffect, useState } from "react";
import { UserColumn } from "../../components/common/UserColumn";
import { CustomChip } from "../../components/chips/CustomChip";
import {
  courseData,
  moduleData,
  staffTypes,
  studentData,
  userData,
} from "../../util";
import {
  faEye,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { useNavigate } from "react-router-dom";
import AlertDialogSlide from "../../components/modals/AlertDialog";
import { SearchButton } from "../../components/buttons/SearchButton";
import { FormDropdown } from "../../components/dropdowns/FormDropdown";
import { CustomBackdrop } from "../../components/backdrops/CustomBackdrop";

export const SearchUser = () => {
  const navigate = useNavigate();
  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);
  const [adminTableData, setAdminTableData] = useState<Array<any>>([]);
  const [studentTableData, setStudentsTableData] = useState<Array<any>>([]);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const defaultValues = {
    staffType: "",
    user: "",
    presentYear: "",
    undergoingCourse: "",
    designation: "",
    teachingModule: "",
  };

  const { register, watch, handleSubmit, setValue, reset, control } = useForm(
    {}
  );

  const tableHeadsAdmins = [
    "User Code",
    "User",
    "Username",
    "Module",
    "Status",
  ];

  const tableHeadsStudents = [
    "User Code",
    "User",
    "Username",
    "Course",
    "Status",
  ];

  const handleSearch = (data: any) => {
    setShowBackdrop(true);
    const timeout = setTimeout(() => {
      if (staffType === 1) {
        const staffPayload = {
          staffType: data?.staffType,
          user: data?.user,
          designation: data?.designation,
          teachingModule: data?.teachingModule,
        };
        const filteredArr = userData?.filter((d: any) => {
          const userMatches = staffPayload?.user
            ? staffPayload?.user === d?.id
            : true;
          const designationMatches = staffPayload?.designation
            ? staffPayload?.designation === d?.designation
            : true;
          const teachingModuleMatches = staffPayload?.teachingModule
            ? staffPayload?.teachingModule === d?.module
            : true;
          return userMatches && designationMatches && teachingModuleMatches;
        });
        setAdminTableData(formatAdminData(filteredArr));
      } else if (staffType === 2) {
        const studentPayload = {
          user: data?.user,
          presentYear: data?.presentYear,
          undergoingCourse: data?.undergoingCourse,
        };
        const filteredArr = studentData?.filter((d: any) => {
          const userMatches = studentPayload?.user
            ? studentPayload?.user === d?.id
            : true;
          const presentYearMatches = studentPayload?.presentYear
            ? studentPayload?.presentYear === d?.presentYear
            : true;
          const courseMatches = studentPayload?.undergoingCourse
            ? studentPayload?.undergoingCourse === d?.courseId
            : true;
          return userMatches && presentYearMatches && courseMatches;
        });
        setStudentsTableData(formatStudentData(filteredArr));
      }
      setShowBackdrop(false);
    }, 1000);
    return () => clearTimeout(timeout);
  };

  const formatAdminData = (data: Array<any>) => {
    return data?.map((d: any) => ({
      id: d?.id,
      code: d?.userId,
      user: <UserColumn id={d?.id} />,
      username: d?.username,
      module: moduleData?.find((dta: any) => dta?.id === d?.moduleId)?.title,
      status:
        d?.status === "active" ? (
          <CustomChip label={"Active"} type="success" />
        ) : (
          <CustomChip label="Inactive" />
        ),
    }));
  };

  const formatStudentData = (data: Array<any>) => {
    return data?.map((d: any) => ({
      id: d?.id,
      code: d?.code,
      user: <UserColumn id={d?.id} />,
      username: d?.username,
      course: courseData?.find((d: any) => d?.courseId === d?.courseId)?.name,
      status:
        d?.status === "active" ? (
          <CustomChip label={"Active"} type="success" />
        ) : (
          <CustomChip label={"Inactive"} />
        ),
    }));
  };

  useLayoutEffect(() => {
    setAdminTableData(formatAdminData(userData));
    setStudentsTableData(formatStudentData(studentData));
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

  const handleNavigateView = () => {
    navigate("/control/user-management/view-user");
  };

  const handleNavigateEdit = () => {
    navigate("/control/user-management/edit-user");
  };

  const handleDelete = () => {
    setShowAlert(true);
  };

  const actionButtons = [
    { tooltip: "View", icon: faEye, handleClick: handleNavigateView },
    { tooltip: "Edit", icon: faPenToSquare, handleClick: handleNavigateEdit },
    { tooltip: "Delete", icon: faTrash, handleClick: handleDelete },
  ];

  const staffType = watch("staffType");

  useEffect(() => {
    setValue("user", "");
    setValue("presentYear", "");
    setValue("undergoingCourse", "");
    setValue("undergoingCourse", "");
    setValue("designation", "");
    setValue("teachingModule", "");
  }, [staffType]);

  useEffect(() => {
    setValue("staffType", 1);
  }, []);

  const userList = studentData?.map((d: any) => ({
    label: `${d?.code} - ${d?.username}`,
    value: d?.id,
  }));

  const presentYearList = () => {
    let arr = [];
    for (let i = 2023 - 5; i <= 2023; i++) {
      arr.push({
        label: i,
        value: i,
      });
    }
    return arr;
  };

  const moduleList = moduleData?.map((d: any) => ({
    label: `${d?.code} - ${d?.title}`,
    value: d?.id,
  }));

  const staffUserList = userData?.map((d: any) => ({
    label: `${d?.userId} - ${d?.name}`,
    value: d?.id,
  }));

  const desginationList = userData?.map((d: any) => ({
    label: d?.designation,
    value: d?.designation,
  }));

  const courseList = courseData?.map((d: any) => ({
    label: `${d?.code} - ${d?.name}`,
    value: d?.id,
  }));

  const resetSearch = () => {
    setShowBackdrop(true);
    const timeout = setTimeout(() => {
      if (staffType === 1) {
        setValue("user", "");
        setValue("designation", "");
        setValue("teachingModule", "");
        setAdminTableData(formatAdminData(userData));
      } else if (staffType === 2) {
        setValue("user", "");
        setValue("presentYear", "");
        setValue("undergoingCourse", "");
        setStudentsTableData(formatStudentData(studentData));
      }
      setShowBackdrop(false);
    }, 1000);
    return () => clearTimeout(timeout);
  };

  return (
    <>
      <CustomBackdrop open={showBackdrop} />
      <AlertDialogSlide
        message={"Do you want to remove this user?"}
        handleYesClick={() => {}}
        handleNoClick={() => setShowAlert(false)}
        openAlert={showAlert}
        setOpenAlert={setShowAlert}
      />
      <Grid container columnSpacing={2} rowSpacing={2}>
        <Grid item xs={12} sm={12} md={12}>
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
              <Grid item xs={12} sm={12} md={6}>
                <FormDropdown
                  name={"staffType"}
                  options={staffTypes}
                  label={"Staff Type"}
                  helperText={undefined}
                  control={control}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <FormAutocomplete
                  error={false}
                  helperText={undefined}
                  setValue={setValue}
                  label={"User"}
                  options={staffType === 1 ? staffUserList : userList}
                  id={"user"}
                  required={false}
                  disabled={false}
                  control={control}
                  watch={watch}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                {staffType === 1 ? (
                  <FormAutocomplete
                    error={false}
                    helperText={undefined}
                    setValue={setValue}
                    label={"Designation"}
                    options={desginationList}
                    id={"designation"}
                    required={false}
                    disabled={false}
                    control={control}
                    watch={watch}
                  />
                ) : (
                  <FormDropdown
                    name={"presentYear"}
                    options={presentYearList()}
                    helperText={undefined}
                    control={control}
                    fullWidth
                    label={"Present Year"}
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={6} display={"flex"} gap={2}>
                {staffType === 1 ? (
                  <FormAutocomplete
                    error={false}
                    helperText={undefined}
                    setValue={setValue}
                    label={"Teaching Module"}
                    options={moduleList}
                    id={"teachingModule"}
                    required={false}
                    disabled={false}
                    control={control}
                    watch={watch}
                  />
                ) : (
                  <FormAutocomplete
                    error={false}
                    helperText={undefined}
                    setValue={setValue}
                    label={"Undergoing Course"}
                    options={courseList}
                    id={"undergoingCourse"}
                    required={false}
                    disabled={false}
                    control={control}
                    watch={watch}
                  />
                )}

                <SearchButton
                  action={handleSubmit(handleSearch)}
                  sx={{ mb: 0.5 }}
                />
              </Grid>
            </Grid>
            <SearchTable
              tableData={staffType === 1 ? adminTableData : studentTableData}
              tableHeaders={
                staffType === 1 ? tableHeadsAdmins : tableHeadsStudents
              }
              id={"id"}
              paginate={true}
              actionButtons={actionButtons}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
