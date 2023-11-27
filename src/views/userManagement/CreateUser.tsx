import { Grid } from "@mui/material";
import { CreateUserForm } from "./CreateUserForm";
import { EnrolledCourses } from "./EnrolledCourses";
import { EnrolledModules } from "./EnrolledModules";

export const CreateUser = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12}>
        <CreateUserForm />
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <EnrolledCourses />
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <EnrolledModules />
      </Grid>
    </Grid>
  );
};
