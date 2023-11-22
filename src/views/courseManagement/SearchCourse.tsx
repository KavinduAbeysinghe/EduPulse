import { faEye, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import SearchTable from "../../components/tables/SearchTable";
import { faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Box, Chip, Grid, IconButton, Stack, Typography } from "@mui/material";
import { FormTextField } from "../../components/inputs/FormTextField";
import { FormButton } from "../../components/buttons/FormButton";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { useLayoutEffect, useState } from "react";
import { CustomChip } from "../../components/chips/CustomChip";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { set, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { CustomBackdrop } from "../../components/backdrops/CustomBackdrop";
import { useLocation, useNavigate } from "react-router-dom";

export const SearchCourse = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [tableData, setTableData] = useState<Array<any>>([]);

  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);

  const navigate = useNavigate();

  const coursesTableHeads = [
    "Course Code",
    "Course Name",
    "Course Description",
    "Course Status",
  ];

  const courseData = [
    {
      id: 1,
      code: "C-1001",
      name: "Database Management Systems 1",
      description: "Database Management Systems 1",
      status: "active",
    },
    {
      id: 2,
      code: "C-1002",
      name: "Database Management Systems 2",
      description: "Database Management Systems 2",
      status: "active",
    },
    {
      id: 3,
      code: "C-1003",
      name: "Database Management Systems 3",
      description: "Database Management Systems 3",
      status: "active",
    },
    {
      id: 4,
      code: "C-1004",
      name: "Database Management Systems 4",
      description: "Database Management Systems 4",
      status: "active",
    },
    {
      id: 5,
      code: "C-1005",
      name: "Database Management Systems 5",
      description: "Database Management Systems 5",
      status: "active",
    },
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

  const actionButtons = [
    { tooltip: "More", icon: faEllipsis, handleClick: handleNaviagteView },
  ];

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
    reset(defaultValues);
    setTableData(formatData(courseData));
  };

  const handleCreate = () => {
    navigate("/control/course-management/create-course");
  };

  return (
    <>
      <CustomBackdrop open={showBackdrop} />
      <Box>
        <PrimaryButton text={"+ Add Course"} onClick={handleCreate} />
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
            <Grid item md={5.5}>
              <FormTextField
                placeholder="Search by course name"
                register={register("courseName")}
                label={"Course Name"}
              />
            </Grid>
            <Grid item md={5.5}>
              <FormTextField
                placeholder="Search by course description"
                register={register("courseDescription")}
                label={"Course Description"}
              />
            </Grid>
            <Grid item md={1}>
              <IconButton onClick={handleSubmit(handleSearch)}>
                <SearchRoundedIcon />
              </IconButton>
            </Grid>
            {/* <Grid item md={3} display={"flex"} gap={1} alignItems={"center"}>
          <FormButton text={"Search"} variant={"contained"} />
          <FormButton text={"Clear"} variant={"outlined"} />
        </Grid> */}
          </Grid>
        </Box>
        <SearchTable
          tableData={tableData}
          tableHeaders={coursesTableHeads}
          id={"id"}
          paginate={true}
          actionButtons={actionButtons}
        />
      </Box>
    </>
  );
};
