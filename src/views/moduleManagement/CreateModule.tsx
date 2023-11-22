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
import { useState } from "react";
import { FormAutocomplete } from "../../components/autocomplete/FormAutocomplete";

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

export const CreateModule = () => {
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
        });
        return newArr;
      });
      setValue("colloboratorName", "");
    }
  };

  return (
    <Box className={"basic-card"} px={3}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography className="card-heading">Create Module</Typography>
        <Chip icon={<RefreshRoundedIcon />} label="Reset" onClick={() => {}} />
      </Stack>
      <Grid container mt={1} spacing={2}>
        <Grid item md={12}>
          <Typography fontSize={"small"} mb={1}>
            Select the course first *
          </Typography>
          <FormTextField
            register={register("moduleName")}
            label={"Related Course"}
          />
        </Grid>
        <Grid item md={3}>
          <FormTextField
            register={register("moduleName")}
            label={"Module Code"}
          />
        </Grid>
        <Grid item md={3}>
          <FormTextField
            register={register("moduleName")}
            label={"Module Name"}
          />
        </Grid>
        <Grid item md={3}>
          <FormTextField
            register={register("moduleName")}
            label={"Module Lead"}
          />
        </Grid>
        <Grid item md={3}>
          <FormTextField
            register={register("moduleName")}
            label={"Created Date"}
          />
        </Grid>
        <Grid item md={12}>
          <FormTextField
            register={register("moduleName")}
            label={"Module Description"}
          />
        </Grid>
      </Grid>
      <Grid container mt={2} spacing={2}>
        <Grid item md={5.5}>
          <Typography mb={1} fontWeight={600}>
            Add Learning Objectives
          </Typography>
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
          <ListView
            isAvatarExists={false}
            data={learnObjList}
            setData={setLearnObjList}
          />
        </Grid>
        <Grid item md={1} display={"flex"} justifyContent={"center"}>
          <Divider orientation="vertical" />
        </Grid>
        <Grid item md={5.5}>
          <Typography mb={1} fontWeight={600}>
            Add Colloborators
          </Typography>
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
          <ListView
            isAvatarExists={true}
            data={collabsList}
            setData={setCollabsList}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
