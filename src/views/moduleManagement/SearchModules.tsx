import {
  faEye,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { Box, Chip, Grid, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { FormAutocomplete } from "../../components/autocomplete/FormAutocomplete";
import { CustomAvatarGroup } from "../../components/avatar/CustomAvatarGroup";
import { CustomBackdrop } from "../../components/backdrops/CustomBackdrop";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { SearchButton } from "../../components/buttons/SearchButton";
import { CustomChip } from "../../components/chips/CustomChip";
import { UserColumn } from "../../components/common/UserColumn";
import { FormDropdown } from "../../components/dropdowns/FormDropdown";
import AlertDialogSlide from "../../components/modals/AlertDialog";
import SearchTable from "../../components/tables/SearchTable";
import { useAuthContext } from "../../contexts/AuthContext";
import {
  commonDateFormat,
  courseData,
  moduleData,
  roles,
  userData,
} from "../../util";

export const SearchModules = () => {
  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);

  const { authContext } = useAuthContext();

  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const [courseList, setCourseList] = useState<Array<any>>([]);

  const [moduleList, setModuleList] = useState<Array<any>>([]);

  const [leadList, setLeadList] = useState<Array<any>>([]);

  useLayoutEffect(() => {
    setCourseList(
      courseData?.map((d: any) => ({
        label: `${d?.code} - ${d?.name}`,
        value: d?.id,
      }))
    );
  }, []);

  const { register, watch, handleSubmit, setValue, reset, control } = useForm(
    {}
  );

  const courseId = watch("courseId");

  useEffect(() => {
    if (courseId) {
      setModuleList(
        moduleData
          ?.filter((data: any) => data?.courseId === courseId)
          ?.map((d: any) => ({
            label: `${d?.code} - ${d?.title}`,
            value: d?.id,
          }))
      );
    }
  }, [courseId]);

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

  const resetSearch = () => {
    setShowBackdrop(true);
    const timeout = setTimeout(() => {
      setValue("courseId", "");
      setValue("moduleName", "");
      setValue("moduleLead", "");
      setValue("year", "");
      setModuleTableData(formatData(moduleData));
      setShowBackdrop(false);
    }, 1000);
    return () => clearTimeout(timeout);
  };

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
      createdDate: dayjs(new Date(d?.createdDate)).format(commonDateFormat),
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
    setLeadList(userData?.map((d: any) => ({ label: d?.name, value: d?.id })));
  }, []);

  const handleNavigateView = (id: any) => {
    const module = { id: id, page: "view" };
    searchParams.set("module", JSON.stringify(module));
    navigate(`/control/module-management/view-module?${searchParams}`);
  };
  const handleNavigateEdit = (id: any) => {
    const module = { id: id, page: "edit" };
    searchParams.set("module", JSON.stringify(module));
    navigate(`/control/module-management/edit-module?${searchParams}`);
  };
  const handleDelete = (id: any) => {
    setOpenAlert(true);
  };

  const [actionButtons, setActionButtons] = useState<Array<any>>([]);

  const aB = [
    { tooltip: "View", icon: faEye, handleClick: handleNavigateView },
    { tooltip: "Edit", icon: faPenToSquare, handleClick: handleNavigateEdit },
    { tooltip: "Delete", icon: faTrash, handleClick: handleDelete },
  ];

  const [isAccessible, setIsAccessible] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (authContext.roles.includes(roles.STUDENT)) {
      setIsAccessible(false);
      setActionButtons(aB?.filter((item: any) => item?.tooltip === "View"));
    } else {
      setIsAccessible(true);
      setActionButtons(aB);
    }
  }, [authContext]);

  const getYearsList = () =>
    useMemo(() => {
      let arr = [];
      for (let i = 2023 - 5; i <= 2023; i++) {
        arr.push({ label: i, value: i });
      }
      return arr;
    }, []);

  useEffect(() => {
    if (!courseId) {
      setValue("moduleName", "");
      setValue("moduleLead", "");
      setValue("year", "");
    }
  }, [courseId]);

  const onSearch = (data: any) => {
    setShowBackdrop(true);
    const timeout = setTimeout(() => {
      const filteredArr = moduleData?.filter((item) => {
        const courseMatch = data?.courseId
          ? data?.courseId === item?.courseId
          : true;
        const moduleMatch = data?.moduleName
          ? data?.moduleName === item?.id
          : true;
        const leadMatch = data?.moduleLead
          ? data?.moduleLead === item?.lead
          : true;
        return courseMatch && moduleMatch && leadMatch;
      });
      setModuleTableData(formatData(filteredArr));
      setShowBackdrop(false);
    }, 1000);
    return () => clearTimeout(timeout);
  };

  return (
    <>
      <CustomBackdrop open={showBackdrop} />
      <AlertDialogSlide
        message={"Do you want to remove this module?"}
        handleYesClick={() => {}}
        handleNoClick={() => setOpenAlert(false)}
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
      />
      <Box mb={2}>
        {isAccessible && (
          <PrimaryButton text={"+ Add Module"} onClick={handleCreate} />
        )}
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
                <FormAutocomplete
                  error={false}
                  helperText={""}
                  setValue={setValue}
                  label={"Course"}
                  options={courseList}
                  id={"courseId"}
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
                  options={moduleList}
                  id={"moduleName"}
                  required={false}
                  disabled={!courseId}
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
                  options={leadList}
                  id={"moduleLead"}
                  required={false}
                  disabled={!courseId}
                  control={control}
                  watch={watch}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} display={"flex"} gap={2}>
                <Box flexGrow={1}>
                  <FormDropdown
                    label={"Year"}
                    options={getYearsList()}
                    helperText={""}
                    control={control}
                    fullWidth
                    disabled={!courseId}
                    name={""}
                  />
                </Box>
                <SearchButton
                  sx={{ mb: 0.5 }}
                  onClick={handleSubmit(onSearch)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <SearchTable
                  tableData={moduleTableData}
                  tableHeaders={tableHeads}
                  id={"id"}
                  paginate={true}
                  // actionButtons={actionButtons}
                  viewMoreOptions={actionButtons}
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
