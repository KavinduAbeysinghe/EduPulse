import { Grid } from "@mui/material";
import React, { useLayoutEffect, useState } from "react";
import { FormTextField } from "../../components/inputs/FormTextField";
import { useForm } from "react-hook-form";
import { FormAutocomplete } from "../../components/autocomplete/FormAutocomplete";
import { FormDatePicker } from "../../components/datepickers/FormDatePicker";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { commonDateFormat, courseData, globalDateFormat } from "../../util";
import { CustomBackdrop } from "../../components/backdrops/CustomBackdrop";
import { useNotification } from "../../contexts/NotificationContext";
import dayjs from "dayjs";
import { CustomChip } from "../../components/chips/CustomChip";

interface EnrollCourseFormProps {
  setShowModal: (show: boolean) => void;
  courseList: Array<any>;
  setData: any;
}

export const EnrollCourseForm = ({
  setShowModal,
  courseList,
  setData,
}: EnrollCourseFormProps) => {
  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);

  const commonError = "Field is required";

  const notify = useNotification();

  const validationSchema = Yup.object().shape({
    course: Yup.string().required(commonError),
    dateFrom: Yup.string()
      .required(commonError)
      .test("required-err", commonError, (value) => {
        return !(value === undefined || value === null || value === "");
      }),
    dateTo: Yup.string()
      .required(commonError)
      .test("required-err", commonError, (value) => {
        return !(value === undefined || value === null || value === "");
      }),
  });

  const {
    register,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = (data: any) => {
    setShowBackdrop(true);
    const timeout = setTimeout(() => {
      const courseId = parseInt(data?.course);
      const dateFrom = dayjs(data?.dateFrom).format(globalDateFormat);
      const dateTo = dayjs(data?.dateTo).format(globalDateFormat);
      setData((prev: any[]) => {
        const newArr = [...prev];
        newArr.push({
          id: newArr.length + 1,
          courseId: courseId,
          dateFrom: dateFrom,
          dateTo: dateTo,
        });
        return newArr;
      });
      notify.success("Course Enrolled Successfully");
      setShowModal(false);
      setShowBackdrop(false);
    }, 1000);
    return () => clearTimeout(timeout);
  };

  return (
    <>
      <CustomBackdrop open={showBackdrop} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <FormAutocomplete
            error={!!errors?.course?.message}
            helperText={errors?.course?.message?.toString()}
            required={true}
            setValue={setValue}
            label={"Course"}
            options={courseList}
            id={"course"}
            disabled={false}
            control={control}
            watch={watch}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormDatePicker
            label={"Date From"}
            error={!!errors?.dateFrom?.message}
            helperText={errors?.dateFrom?.message?.toString()}
            required={true}
            name={"dateFrom"}
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormDatePicker
            label={"Date To"}
            error={!!errors?.dateTo?.message}
            helperText={errors?.dateTo?.message?.toString()}
            required={true}
            name={"dateTo"}
            control={control}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          display={"flex"}
          justifyContent={"flex-end"}
        >
          <PrimaryButton text={"> Save"} onClick={handleSubmit(onSubmit)} />
        </Grid>
      </Grid>
    </>
  );
};
