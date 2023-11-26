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

interface QuizModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  quizData: any;
}

export const QuizModal = ({ open, setOpen, quizData }: QuizModalProps) => {
  const handleClose = () => {
    setOpen(false);
  };

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

  const onSubmit = (data: any) => {
    console.log(data);
    setOpen(false);
  };

  return (
    <React.Fragment>
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
            <LinearProgress variant="determinate" value={progressValue} />
          </Box>
          <Grid container spacing={2} mt={3}>
            {questions?.map((q: any, index) => (
              <Grid item md={12} mx={3}>
                <Divider textAlign="left">
                  <Chip
                    label={`Question ${index + 1}`}
                    sx={{ fontWeight: 700, mb: 1, fontSize: "large" }}
                  />
                </Divider>
                <CustomRadioGroup
                  key={q?.questionId}
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
              <PrimaryButton text={"Submit"} onClick={handleSubmit(onSubmit)} />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
