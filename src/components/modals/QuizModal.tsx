import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  LinearProgress,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  linearProgressClasses,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { CustomRadioGroup } from "../radio/CustomRadioGroup";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { PrimaryButton } from "../buttons/PrimaryButton";
import AlertDialog from "./AlertDialog2";

interface QuizModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  quizData: any;
  setQuizData: any;
}

export const QuizModal = ({
  open,
  setOpen,
  quizData,
  setQuizData,
}: QuizModalProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [openAlert2, setOpenAlert2] = useState<boolean>(false);

  const quizMinutes = quizData?.minutes;

  const quizSeconds = quizData?.seconds;

  const [minutes, setMinutes] = useState<number>(quizMinutes);

  const [seconds, setSeconds] = useState<number>(quizSeconds);

  const [progressValue, setProgressValue] = useState<number>(100);

  const [questions, setQuestions] = useState<Array<any>>(
    quizData?.questionData
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timeout);
        } else {
          setMinutes((prevMins) => prevMins - 1);
          setSeconds(59);
        }
      } else {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }
      const totalSeconds = quizMinutes * 60 + quizSeconds;
      const remainingSeconds = minutes * 60 + seconds;
      const currentProgress = (remainingSeconds / totalSeconds) * 100;
      setProgressValue(currentProgress);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [minutes, seconds]);

  const getTime = () => {
    return `${minutes}:${seconds}`;
  };

  const commonError = "Field is required";

  const validationSchema = Yup.object().shape({
    questionsList: Yup.array().of(
      Yup.object().shape({
        question: Yup.string().required(commonError),
      })
    ),
  });

  const defaultValues = {
    questionsList: [{ question: "" }],
  };

  const {
    control,
    formState: { errors, dirtyFields, isDirty },
    handleSubmit,
    getValues,
    setValue,
    watch,
  } = useForm({ resolver: yupResolver(validationSchema) });

  const { fields } = useFieldArray({ name: "questionsList", control });

  const handleOpenAlert = (data: any) => {
    // console.log(data);
    // setOpen(false);
    setOpenAlert(true);
  };

  const onSubmit = (data: any) => {
    console.log(data);
    setOpenAlert(false);
    setOpen(false);
  };

  useEffect(() => {
    if (progressValue === 0) {
      console.log(getValues());
      setOpen(false);
      setOpenAlert2(true);
    }
  }, [progressValue]);

  return (
    <React.Fragment>
      <AlertDialog
        title={"Quiz Submission"}
        message={"Your Quiz was automatically submitted!"}
        confirmModal={true}
        okClick={() => {
          setOpenAlert2(false);
          setQuizData(null);
        }}
        open={openAlert2}
      />
      <AlertDialog
        title={"Quiz Submission"}
        message={"Do you want to submit this quiz?"}
        confirmModal={false}
        yesClick={handleSubmit(onSubmit)}
        noClick={() => setOpenAlert(false)}
        open={openAlert}
      />
      <Dialog fullWidth={true} maxWidth={"xl"} open={open}>
        <DialogTitle>{quizData?.title}</DialogTitle>
        <DialogContent>
          <Box
            position={"sticky"}
            top={0}
            zIndex={2}
            sx={{ backgroundColor: "#fff" }}
          >
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              useFlexGap
              flexWrap={"wrap"}
            >
              <Stack direction={"row"} gap={1} mb={1}>
                <Typography color={"text.secondary"}>
                  Questions Remaining:{" "}
                </Typography>
                <Typography fontWeight={600}>
                  {`${questions?.length}/${questions?.length}`}
                </Typography>
              </Stack>
              <Stack direction={"row"} gap={1}>
                <Typography color={"text.secondary"}>
                  Remaining Time:{" "}
                </Typography>
                <Typography fontWeight={600}>{getTime()}</Typography>
              </Stack>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={progressValue}
              sx={{
                height: 10,
                borderRadius: "500px",
                [`& .${linearProgressClasses.bar}`]: {
                  background:
                    "linear-gradient(195deg, rgb(73, 163, 241),rgb(26, 115, 232))",
                },
              }}
            />
          </Box>
          <Grid container spacing={2} mt={3}>
            {questions?.map((q: any, index) => (
              <Grid key={q?.questionId} item md={12} mx={3}>
                <Divider textAlign="left">
                  <Chip
                    label={`Question ${index + 1}`}
                    sx={{ fontWeight: 700, mb: 1, fontSize: "large" }}
                  />
                </Divider>
                <CustomRadioGroup
                  options={q?.options?.map((i: any) => ({
                    label: i?.option,
                    value: i?.optionId,
                  }))}
                  control={control}
                  error={!!errors?.questionsList?.[index]?.question?.message}
                  helperText={errors?.questionsList?.[
                    index
                  ]?.question?.message?.toString()}
                  id={`questionsList[${index}].question`}
                  label={q?.question}
                />
              </Grid>
            ))}
            <Grid
              item
              md={12}
              mx={3}
              display={"flex"}
              justifyContent={"flex-end"}
              alignItems={"center"}
            >
              <PrimaryButton text={"Submit"} onClick={handleOpenAlert} />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
