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
import { InnerModal } from "../../components/modals/CustomModal";
import { EnrollCourseForm } from "./EnrollCourseForm";
import { CustomBackdrop } from "../../components/backdrops/CustomBackdrop";
import { commonDateFormat, courseData } from "../../util";
import { CustomChip } from "../../components/chips/CustomChip";
import dayjs from "dayjs";
import { useNotification } from "../../contexts/NotificationContext";

interface EnrolledCourseProps {
  isUserCreated: boolean;
}

export const EnrolledCourses = ({ isUserCreated }: EnrolledCourseProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);
  const [courseList, setCourseList] = useState<Array<any>>([]);
  const [enrolledCourseTableData, setEnrolledCourseTableData] = useState<
    Array<any>
  >([]);
  const notify = useNotification();
  const [data, setData] = useState<Array<any>>([]);

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
    "Course Name",
    "Date From",
    "Date To",
    "Course Status",
  ];

  useLayoutEffect(() => {
    setCourseList(
      courseData?.map((d: any) => ({
        label: d?.name,
        value: d?.id,
      }))
    );
  }, []);

  const formatData = (data: Array<any>) => {
    console.log(data);

    return data?.map((d: any) => {
      const course = courseData?.find((dta: any) => dta?.id === d?.courseId);
      return {
        id: d?.id,
        courseCode: course?.code,
        courseName: course?.name,
        dateFrom: dayjs(new Date(d?.dateFrom)).format(commonDateFormat),
        dateTo: dayjs(new Date(d?.dateTo)).format(commonDateFormat),
        courseStatus:
          course?.status === "active" ? (
            <CustomChip label={"Active"} type="success" />
          ) : (
            <CustomChip label={"Inactive"} />
          ),
      };
    });
  };

  useEffect(() => {
    setEnrolledCourseTableData(formatData(data));
  }, [data]);

  const onSearch = (dta: any) => {
    setShowBackdrop(true);
    const timeout = setTimeout(() => {
      const filteredArr = data?.filter((item) => {
        const courseMatches = dta?.course
          ? dta?.course === item?.courseId
          : true;
        const dateFromMatches = dta?.dateFrom
          ? new Date(item?.dateFrom) >= new Date(dta?.dateFrom)
          : true;
        const dateToMatches = dta?.dateTo
          ? new Date(item?.dateTo) <= new Date(dta?.dateTo)
          : true;
        return courseMatches && dateFromMatches && dateToMatches;
      });
      setEnrolledCourseTableData(formatData(filteredArr));
      setShowBackdrop(false);
    }, 1000);
    return () => clearTimeout(timeout);
  };

  const handleReset = () => {
    setValue("course", "");
    setValue("dateFrom", "");
    setValue("dateTo", "");
    setShowBackdrop(true);
    const timeout = setTimeout(() => {
      setEnrolledCourseTableData(formatData(data));
      setShowBackdrop(false);
    }, 1000);
    return () => clearTimeout(timeout);
  };

  const handleEnrollNow = () => {
    if (isUserCreated) {
      setShowModal(true);
    } else {
      notify.warn("Please Create a User First");
    }
  };

  return (
    <>
      <CustomBackdrop open={showBackdrop} />
      <InnerModal
        open={showModal}
        setOpen={setShowModal}
        maxWidth={"sm"}
        title={"Enroll Course"}
        body={
          <EnrollCourseForm
            setData={setData}
            setShowModal={setShowModal}
            courseList={courseList}
          />
        }
      />
      <FormCard header={"Enrolled Courses"} onResetClick={handleReset}>
        <Box mb={3}>
          <PrimaryButton text={"+ Enroll Now"} onClick={handleEnrollNow} />
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
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
          <Grid item xs={12} sm={12} md={3}>
            <FormDatePicker
              label={"Date From"}
              error={false}
              helperText={""}
              name={"dateFrom"}
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} display={"flex"} gap={2}>
            <FormDatePicker
              label={"Date To"}
              error={false}
              helperText={""}
              name={"dateTo"}
              control={control}
            />
            <SearchButton
              sx={{ mb: { md: 0.5, sm: 0 } }}
              onClick={handleSubmit(onSearch)}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <SearchTable
              tableData={enrolledCourseTableData}
              tableHeaders={coursesTableHeads}
              id={"id"}
              paginate={true}
            />
          </Grid>
        </Grid>
      </FormCard>
    </>
  );
};
