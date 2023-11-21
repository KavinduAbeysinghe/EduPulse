import { faEye, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import SearchTable from "../../components/tables/SearchTable";
import { faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Grid } from "@mui/material";
import { FormTextField } from "../../components/inputs/FormTextField";
import { FormButton } from "../../components/buttons/FormButton";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

export const CourseManagement = () => {
  const coursesTableHeads = [
    "Course Code",
    "Course Name",
    "Course Description",
    "Course Status",
  ];

  const courseData = [
    {
      code: "C-1001",
      name: "Database Management Systems",
      description: "Database Management Systems",
      status: "active",
    },
    {
      code: "C-1001",
      name: "Database Management Systems",
      description: "Database Management Systems",
      status: "active",
    },
    {
      code: "C-1001",
      name: "Database Management Systems",
      description: "Database Management Systems",
      status: "active",
    },
    {
      code: "C-1001",
      name: "Database Management Systems",
      description: "Database Management Systems",
      status: "active",
    },
    {
      code: "C-1001",
      name: "Database Management Systems",
      description: "Database Management Systems",
      status: "active",
    },
  ];

  const actionButtons = [
    { tooltip: "More", icon: faEllipsis, handleClick: () => {} },
  ];

  return (
    <>
      <Grid container spacing={2} mb={3}>
        <Grid item md={6}>
          <FormTextField register={undefined} label={"Course Name"} />
        </Grid>
        <Grid item md={6}>
          <FormTextField register={undefined} label={"Course Description"} />
        </Grid>
        {/* <Grid item md={3} display={"flex"} gap={1} alignItems={"center"}>
          <FormButton text={"Search"} variant={"contained"} />
          <FormButton text={"Clear"} variant={"outlined"} />
        </Grid> */}
      </Grid>
      <SearchTable
        tableData={courseData}
        tableHeaders={coursesTableHeads}
        id={""}
        paginate={true}
        actionButtons={actionButtons}
      />
    </>
  );
};
