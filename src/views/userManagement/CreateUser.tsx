import { Grid } from "@mui/material";
import { CreateUserForm } from "./CreateUserForm";
import { EnrolledCourses } from "./EnrolledCourses";
import { EnrolledModules } from "./EnrolledModules";
import { useState } from "react";
import { roles } from "../../util";

export const CreateUser = () => {
  const [isUserCreated, setIsUserCreated] = useState<boolean>(false);

  const [role, setRole] = useState<number>(roles.STUDENT);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12}>
        <CreateUserForm setIsUserCreated={setIsUserCreated} setRole={setRole} />
      </Grid>
      {role === roles.STUDENT ? (
        <Grid item xs={12} sm={12} md={12}>
          <EnrolledCourses isUserCreated={isUserCreated} />
        </Grid>
      ) : role === roles.STAFF ? (
        <Grid item xs={12} sm={12} md={12}>
          <EnrolledModules isUserCreated={isUserCreated} />
        </Grid>
      ) : (
        <></>
      )}
    </Grid>
  );
};
