import {
  faEye,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import SearchTable from "../../components/tables/SearchTable";
import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { FormTextField } from "../../components/inputs/FormTextField";
import { FormButton } from "../../components/buttons/FormButton";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { useEffect, useLayoutEffect, useState } from "react";
import { CustomChip } from "../../components/chips/CustomChip";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { set, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { CustomBackdrop } from "../../components/backdrops/CustomBackdrop";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchButton } from "../../components/buttons/SearchButton";
import { courseData, roles } from "../../util";
import AlertDialogSlide from "../../components/modals/AlertDialog";
import { useNotification } from "../../contexts/NotificationContext";
import { useAuthContext } from "../../contexts/AuthContext";

export const SearchCourse = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [tableData, setTableData] = useState<Array<any>>([]);

  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);

  const [showAlert, setShowAlert] = useState<boolean>(false);

  const navigate = useNavigate();

  const { authContext } = useAuthContext();

  const coursesTableHeads = [
    "Course Code",
    "Course Name",
    "Course Description",
    "Course Status",
  ];

  const formatData = (data: Array<any>) => {
    return data?.map((d: any) => ({
      id: d?.id,
      code: d?.code,
      name: d?.name,
      description: d?.description,
      status:
        d?.status === "active" ? (
          <CustomChip label={"Active"} type="success" />
        ) : (
          <CustomChip label={"Inactive"} />
        ),
    }));
  };

  useLayoutEffect(() => {
    setTableData(formatData(courseData));
  }, []);

  const handleNaviagteView = (id: any) => {
    const course = { id: id, page: "view" };
    searchParams.set("course", JSON.stringify(course));
    navigate(`/control/course-management/view-course?${searchParams}`);
  };

  const handleNaviagteEdit = () => {
    navigate("/control/course-management/edit-course");
  };

  const handleDelete = () => {
    setShowAlert(true);
  };

  const [actionButtons, setActionButtons] = useState<Array<any>>([]);

  const aB = [
    { tooltip: "View", icon: faEye, handleClick: handleNaviagteView },
    { tooltip: "Edit", icon: faPenToSquare, handleClick: handleNaviagteEdit },
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

  const defaultValues = {
    courseName: "",
    courseDescription: "",
  };

  const { register, watch, handleSubmit, setValue, reset } = useForm({
    defaultValues: defaultValues,
  });

  const handleSearch = (data: any) => {
    setShowBackdrop(true);
    setTimeout(() => {
      const courseName = data?.courseName;
      const courseDesc = data?.courseDescription;

      const filteredArray = courseData?.filter((d) => {
        const courseNameMatches = courseName ? courseName === d?.name : true;
        const courseDescMatches = courseDesc
          ? courseDesc === d?.description
          : true;
        return courseNameMatches && courseDescMatches;
      });
      setTableData(formatData(filteredArray));
      setShowBackdrop(false);
    }, 1000);
  };

  const resetSearch = () => {
    setShowBackdrop(true);
    const timeout = setTimeout(() => {
      reset(defaultValues);
      setTableData(formatData(courseData));
      setShowBackdrop(false);
    }, 1000);

    return () => clearTimeout(timeout);
  };

  const handleCreate = () => {
    navigate("/control/course-management/create-course");
  };

  const notify = useNotification();

  const handleYesClick = () => {
    setShowAlert(false);
    setShowBackdrop(true);
    const timeout = setTimeout(() => {
      notify.success("Deleted Successfully");
      setShowBackdrop(false);
    }, 1000);
    return () => clearTimeout(timeout);
  };

  return (
    <>
      <AlertDialogSlide
        message={"Do you want to remove the selected course?"}
        handleYesClick={handleYesClick}
        handleNoClick={() => setShowAlert(false)}
        openAlert={showAlert}
        setOpenAlert={setShowAlert}
      />
      <CustomBackdrop open={showBackdrop} />
      <Box>
        {isAccessible && (
          <PrimaryButton text={"+ Add Course"} onClick={handleCreate} />
        )}
      </Box>
      <Box className={"basic-card"} mt={2}>
        <Box px={2}>
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

          <Grid container spacing={2} mb={3} mt={1}>
            <Grid item xs={12} sm={12} md={6}>
              <FormTextField
                placeholder="Search by course name"
                register={register("courseName")}
                label={"Course Name"}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              display={"flex"}
              gap={2}
              // alignItems={"center"}
            >
              <FormTextField
                placeholder="Search by course description"
                register={register("courseDescription")}
                label={"Course Description"}
              />
              <SearchButton action={handleSubmit(handleSearch)} />
            </Grid>
            {/* <Grid item md={3} display={"flex"} gap={1} alignItems={"center"}>
          <FormButton text={"Search"} variant={"contained"} />
          <FormButton text={"Clear"} variant={"outlined"} />
        </Grid> */}
          </Grid>
          <SearchTable
            tableData={tableData}
            tableHeaders={coursesTableHeads}
            id={"id"}
            paginate={true}
            actionButtons={actionButtons}
          />
        </Box>
      </Box>
    </>
  );
};
