import { Box, Grid } from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormAutocomplete } from "../../components/autocomplete/FormAutocomplete";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { FormCard } from "../../components/common/FormCard";
import { FormDropdown } from "../../components/dropdowns/FormDropdown";
import { FormTextField } from "../../components/inputs/FormTextField";
import { FormDatePicker } from "../../components/datepickers/FormDatePicker";
import { SearchButton } from "../../components/buttons/SearchButton";
import SearchTable from "../../components/tables/SearchTable";
import { useNotification } from "../../contexts/NotificationContext";
import { InnerModal } from "../../components/modals/CustomModal";
import { EnrollModuleForm } from "./EnrollModuleForm";
import { courseData, moduleData } from "../../util";

interface EnrolledModulesProps {
  isUserCreated: boolean;
}

export const EnrolledModules = ({ isUserCreated }: EnrolledModulesProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [data, setData] = useState<Array<any>>([]);
  const [enrolledModuleTblData, setEnrolledModuleTblData] = useState<
    Array<any>
  >([]);

  const [courseList, setCourseList] = useState<Array<any>>([]);
  const [moduleList, setModuleList] = useState<Array<any>>([]);

  const {
    register,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({});

  const coursesTableHeads = [
    "Course Code",
    "Module Code",
    "Module Description",
    "Date From",
    "Date To",
  ];

  const notify = useNotification();

  const handleEnrollNow = () => {
    if (isUserCreated) {
      setOpenModal(true);
      console.log("ddc");
    } else {
      notify.warn("Please Create a User First");
    }
  };

  useLayoutEffect(() => {
    setCourseList(
      courseData?.map((d: any) => ({
        label: d?.name,
        value: d?.id,
      }))
    );
  }, []);

  const course = watch("course");

  useEffect(() => {
    if (course) {
      setModuleList(
        moduleData
          ?.filter((mod) => mod?.courseId === course)
          ?.map((mod) => ({ label: mod?.title, value: mod?.id }))
      );
    } else {
      setModuleList([]);
    }
  }, [course]);

  return (
    <>
      <InnerModal
        open={openModal}
        setOpen={setOpenModal}
        maxWidth={"sm"}
        title={"Enroll Modules"}
        body={
          <EnrollModuleForm
            setShowModal={setOpenModal}
            courseList={courseList}
            setData={setData}
          />
        }
      />
      <FormCard header={"Enrolled Modules"} onResetClick={() => {}}>
        <Box mb={3}>
          <PrimaryButton text={"+ Enroll Now"} onClick={handleEnrollNow} />
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <FormAutocomplete
              error={false}
              helperText={""}
              setValue={setValue}
              label={"Course"}
              options={courseList}
              id={"course"}
              required={false}
              disabled={false}
              control={control}
              watch={watch}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12} display={"flex"} gap={2}>
            <FormAutocomplete
              error={false}
              helperText={""}
              setValue={setValue}
              label={"Module Name"}
              options={moduleList}
              id={"module"}
              required={false}
              disabled={false}
              control={control}
              watch={watch}
            />
            <SearchButton sx={{ mb: 0.5 }} />
          </Grid>

          {/* <Grid item xs={12} sm={12} md={3}>
            <FormAutocomplete
              error={false}
              helperText={""}
              setValue={setValue}
              label={"Module Lead"}
              options={[]}
              id={"course"}
              required={false}
              disabled={false}
              control={control}
              watch={watch}
            />
          </Grid> */}
          {/* <Grid item xs={12} sm={12} md={3} display={"flex"} gap={2}>
            <FormDropdown
              name={"Year"}
              options={[]}
              helperText={""}
              control={control}
              fullWidth
              label={"Year"}
            />
            <SearchButton sx={{ mb: 0.5 }} />
          </Grid> */}
          <Grid item xs={12} sm={12} md={12}>
            <SearchTable
              tableData={[]}
              tableHeaders={coursesTableHeads}
              id={""}
              paginate={true}
            />
          </Grid>
        </Grid>
      </FormCard>
    </>
  );
};
