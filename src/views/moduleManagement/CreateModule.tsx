import {
  Box,
  Chip,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { FormTextField } from "../../components/inputs/FormTextField";
import { useForm } from "react-hook-form";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { ListView } from "./ListView";
import { useEffect, useLayoutEffect, useState } from "react";
import { FormAutocomplete } from "../../components/autocomplete/FormAutocomplete";
import { useLocation } from "react-router-dom";
import { courseData, moduleData, userData } from "../../util";
import { FormDatePicker } from "../../components/datepickers/FormDatePicker";
import dayjs from "dayjs";

const collaborators = [
  {
    id: 1,
    name: "John Hopkins",
    designation: "Senior Lecturer",
    lecturerCode: "L1001",
  },
  {
    id: 2,
    name: "Emily Rodriguez",
    designation: "Assistant Professor",
    lecturerCode: "L1002",
  },
  {
    id: 3,
    name: "Michael Smith",
    designation: "Associate Professor",
    lecturerCode: "L1003",
  },
  {
    id: 4,
    name: "Jessica Thompson",
    designation: "Lecturer",
    lecturerCode: "L1004",
  },
  {
    id: 5,
    name: "Daniel White",
    designation: "Professor",
    lecturerCode: "L1005",
  },
  {
    id: 6,
    name: "Sophia Brown",
    designation: "Senior Lecturer",
    lecturerCode: "L1006",
  },
];

interface CreateModuleProps {
  setIsModuleCreated: any;
}

export const CreateModule = ({ setIsModuleCreated }: CreateModuleProps) => {
  const [isCourseSelected, setIsCourseSelected] = useState<boolean>(false);

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const [page, setPage] = useState<string>("");

  const [id, setId] = useState<any>("");

  const [title, setTitle] = useState<string>("Create Module");

  useEffect(() => {
    const moduleObj = searchParams.get("module");
    if (moduleObj) {
      const mod = JSON.parse(moduleObj);
      const module = moduleData?.find((d: any) => d?.id === mod?.id);
      setPage(mod?.page);
      setId(mod?.id);
      setTitle(
        mod?.page === "view"
          ? "View Module"
          : mod?.page === "edit"
          ? "Edit Module"
          : "Create Module"
      );
      setLearnObjList(
        module?.learningObjectives?.map((d: any, index) => ({
          id: index + 1,
          primary: d,
        })) ?? []
      );
      setCollabsList(
        module?.collaborators?.map((d: any, index) => ({
          id: d,
          primary: userData?.find((c) => c?.id === d)?.username,
          secondary: userData?.find((c) => c?.id === d)?.designation,
          profileImg: userData?.find((c) => c?.id === d)?.profileImg,
        })) ?? []
      );
      setValue("course", module?.courseId);
      setValue("moduleCode", module?.code);
      setValue("moduleName", module?.title);
      setValue("moduleDescription", module?.title);
      setValue("moduleLead", module?.lead);
      setValue(
        "createdDate",
        dayjs(new Date(module?.createdDate ?? "")).format("DD/MM/YYYY")
      );
    }
  }, [location]);

  const [learnObjList, setLearnObjList] = useState<Array<any>>([]);

  const [collabsList, setCollabsList] = useState<Array<any>>([]);

  const collabs = collaborators?.map((d: any) => ({
    label: `${d?.lecturerCode} - ${d?.name}`,
    value: d?.id,
  }));

  const { register, watch, handleSubmit, setValue, reset, control } = useForm(
    {}
  );

  const learnObjective = watch("learningObjective");

  const handleAddLearnObj = () => {
    if (learnObjective) {
      setLearnObjList((prev) => {
        let newArr = [...prev];
        newArr.unshift({
          id: newArr.length + 1,
          primary: learnObjective,
        });
        return newArr;
      });
      setValue("learningObjective", "");
    }
  };

  const colloboratorName = watch("colloboratorName");

  const handleAddCollabs = () => {
    if (colloboratorName) {
      setCollabsList((prev) => {
        let newArr = [...prev];
        newArr.unshift({
          id: colloboratorName,
          primary: collaborators?.find((c) => c?.id === colloboratorName)?.name,
          secondary: collaborators?.find((c) => c?.id === colloboratorName)
            ?.name,
          profileImg: userData?.find((c) => c?.id === colloboratorName)
            ?.profileImg,
        });
        return newArr;
      });
      setValue("colloboratorName", "");
    }
  };

  const courseList = courseData?.map((d: any) => ({
    label: d?.name,
    value: d?.id,
  }));

  const leadsList = userData?.map((d: any) => ({
    label: d?.username,
    value: d?.id,
  }));

  const course = watch("course");

  useEffect(() => {
    if (course) {
      setIsCourseSelected(true);
    }
  }, [course]);

  return (
    <Box className={"basic-card"} px={3}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography className="card-heading">{title}</Typography>
        {page !== "view" && (
          <Chip
            icon={<RefreshRoundedIcon />}
            label="Reset"
            onClick={() => {}}
          />
        )}
      </Stack>
      <Grid container mt={1} spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <Typography fontSize={"small"} mb={1}>
            Select the course first *
          </Typography>
          <FormAutocomplete
            error={false}
            helperText={undefined}
            setValue={setValue}
            label={"Select Course"}
            options={courseList}
            id={"course"}
            required={false}
            disabled={page === "view"}
            control={control}
            watch={watch}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <FormTextField
            register={register("moduleCode")}
            label={"Module Code"}
            disabled={!isCourseSelected || page === "view"}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <FormTextField
            register={register("moduleName")}
            label={"Module Name"}
            disabled={!isCourseSelected || page === "view"}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <FormAutocomplete
            error={false}
            helperText={undefined}
            setValue={setValue}
            label={"Module Lead"}
            options={leadsList}
            id={"moduleLead"}
            required={false}
            disabled={!isCourseSelected || page === "view"}
            control={control}
            watch={watch}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <FormDatePicker
            label={"Created Date"}
            error={false}
            helperText={undefined}
            name={"createdDate"}
            control={control}
            disabled={!isCourseSelected || page === "view"}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <FormTextField
            register={register("moduleDescription")}
            label={"Module Description"}
            disabled={!isCourseSelected || page === "view"}
          />
        </Grid>
      </Grid>
      <Grid container mt={2} spacing={2}>
        <Grid item xs={12} sm={12} md={5.5}>
          <Typography mb={1} fontWeight={600}>
            Learning Objectives
          </Typography>
          {page !== "view" && (
            <Stack direction={"row"} gap={1}>
              <FormTextField
                register={register("learningObjective")}
                label={"Learning Objective"}
                placeholder="Enter learning objective to add"
              />
              <IconButton onClick={handleAddLearnObj}>
                <AddRoundedIcon />
              </IconButton>
            </Stack>
          )}
          <ListView
            isAvatarExists={false}
            data={learnObjList}
            setData={setLearnObjList}
            disabled={page === "view"}
          />
        </Grid>
        <Grid item md={1} display={"flex"} justifyContent={"center"}>
          <Divider orientation="vertical" />
        </Grid>
        <Grid item xs={12} sm={12} md={5.5}>
          <Typography mb={1} fontWeight={600}>
            Colloborators
          </Typography>
          {page !== "view" && (
            <Stack direction={"row"} gap={1}>
              <FormAutocomplete
                error={false}
                helperText={""}
                setValue={setValue}
                label={"Colloborator Name"}
                options={collabs}
                id={"colloboratorName"}
                required={false}
                disabled={false}
                control={control}
                watch={watch}
              />
              <IconButton onClick={handleAddCollabs}>
                <AddRoundedIcon />
              </IconButton>
            </Stack>
          )}
          <ListView
            disabled={page === "view"}
            isAvatarExists={true}
            data={collabsList}
            setData={setCollabsList}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
