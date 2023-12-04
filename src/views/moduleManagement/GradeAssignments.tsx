import { Box, Chip, Grid, Stack, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { FormCard } from "../../components/common/FormCard";
import { FormAutocomplete } from "../../components/autocomplete/FormAutocomplete";
import { useForm } from "react-hook-form";
import { useLayoutEffect, useState } from "react";
import {
  courseData,
  gradeAssignmentsData,
  roles,
  studentData,
  studentData2,
  users,
} from "../../util";
import SearchTable from "../../components/tables/SearchTable";
import { SearchButton } from "../../components/buttons/SearchButton";
import { UserColumn } from "../../components/common/UserColumn";
import { CustomChip } from "../../components/chips/CustomChip";
import { CustomBackdrop } from "../../components/backdrops/CustomBackdrop";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { InnerModal } from "../../components/modals/CustomModal";
import { GradeAssignmentForm } from "./GradeAssignmentForm";

export const GradeAssignments = () => {
  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);

  const [openModal, setOpenModal] = useState<boolean>(false);

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const { setValue, control, watch, handleSubmit } = useForm({});

  const [studentList] = useState<Array<any>>(
    users
      ?.filter((user) => user?.role?.includes(roles.STUDENT))
      ?.map((data: any) => ({
        label: `${data?.userId} - ${data?.name}`,
        value: data?.id,
      }))
  );

  const [tableHeads] = useState<Array<string>>([
    "Stu Code",
    "Student",
    "Course Code",
    "Course Name",
    "Submission",
    "Submitted Date",
    "Overdue Status",
  ]);

  const formatData = (data: Array<any>) => {
    return data?.map((d) => {
      const student = studentData2?.find((stu) => stu.id === d?.stuId);

      const course = courseData?.find(
        (course) => course?.id === student?.courseId
      );
      console.log(student, course);
      if (student) {
        return {
          id: d?.id,
          stuCode: student?.userId,
          student: <UserColumn id={student?.id} />,
          courseCode: course?.code,
          courseName: course?.name,
          submission: d?.submission ? "Yes" : "No",
          submittedDate: d?.submittedDate,
          overdueStatus: d?.overdueStatus ? (
            <CustomChip label="Ok" type="success" />
          ) : (
            <CustomChip label="Overdue" />
          ),
        };
      }
    });
  };

  const [tableData, setTableData] = useState<Array<any>>(
    formatData(gradeAssignmentsData)
  );

  useLayoutEffect(() => {
    const state = searchParams.get("assignment");
    if (state) {
      const parsedState = JSON.parse(state);
      console.log(parsedState);
    }
  }, [location]);

  const onSearch = (data: any) => {
    setShowBackdrop(true);
    const timeout = setTimeout(() => {
      if (data?.student) {
        const filteredArr = gradeAssignmentsData?.filter(
          (d: any) => d?.stuId === data?.student
        );
        setTableData(formatData(filteredArr));
      } else {
        setTableData(formatData(gradeAssignmentsData));
      }
      setShowBackdrop(false);
    }, 1000);
    return () => clearTimeout(timeout);
  };

  const resetSearch = () => {
    setShowBackdrop(true);
    const timeout = setTimeout(() => {
      setValue("student", "");
      setTableData(formatData(gradeAssignmentsData));
      setShowBackdrop(false);
    }, 1000);
    return () => clearTimeout(timeout);
  };

  const [submissionId, setSubmissionId] = useState<any>("");

  const handleGrade = (id: any) => {
    setSubmissionId(id);
    setOpenModal(true);
  };

  const aB = [
    { tooltip: "Grade", icon: faEye, handleClick: handleGrade },
    // { tooltip: "Edit", icon: faPenToSquare, handleClick: handleNavigateEdit },
  ];

  return (
    <>
      <InnerModal
        open={openModal}
        setOpen={setOpenModal}
        maxWidth={"sm"}
        title={"Grade Assignment"}
        body={
          <GradeAssignmentForm
            submissionId={submissionId}
            setOpen={setOpenModal}
          />
        }
      />
      <CustomBackdrop open={showBackdrop} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <Box className={"basic-card"} px={3}>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              flexWrap={"wrap"}
            >
              <Typography className={"card-heading"}>
                Grade Assignment
              </Typography>
              <Chip
                icon={<RefreshRoundedIcon />}
                label="Refresh"
                onClick={resetSearch}
              />
            </Stack>
            <Grid container mt={1} spacing={2}>
              <Grid item xs={12} sm={12} md={12}>
                <Typography color={"text.secondary"}>
                  Assignment Name:{" "}
                  <span style={{ fontWeight: 600 }}>Sample Assignment</span>
                </Typography>
                <Typography color={"text.secondary"}>
                  Due Date: <span style={{ fontWeight: 600 }}>15/12/2023</span>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} display={"flex"} gap={2}>
                <FormAutocomplete
                  error={false}
                  helperText={undefined}
                  setValue={setValue}
                  label={"Student"}
                  options={studentList}
                  id={"student"}
                  required={false}
                  disabled={false}
                  control={control}
                  watch={watch}
                />
                <SearchButton
                  sx={{ mb: 0.45 }}
                  onClick={handleSubmit(onSearch)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <SearchTable
                  tableData={tableData}
                  tableHeaders={tableHeads}
                  id={"id"}
                  paginate={true}
                  viewMoreOptions={aB}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
