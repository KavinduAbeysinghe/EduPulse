import {
  Box,
  ButtonGroup,
  Chip,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormTextField } from "../../components/inputs/FormTextField";
import * as Yup from "yup";
import { useFieldArray, useForm } from "react-hook-form";
import { CardHeading } from "../../components/common/CardHeading";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { CustomRadioGroup } from "../../components/radio/CustomRadioGroup";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import { commonValidationError, quizData } from "../../util";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNotification } from "../../contexts/NotificationContext";

interface AddQuizProps {
  appendQuiz: any;
  quizes: any;
}

export const AddQuiz = ({ appendQuiz, quizes }: AddQuizProps) => {
  const notify = useNotification();

  const [tempOptions, setTempOptions] = useState<Array<any>>([]);

  const [tempAnswerId, setTempAnswerId] = useState<any>("");

  const [radioOptions, setRadioOptions] = useState<Array<any>>([]);

  const [questionsList, setQuestionsList] = useState<Array<any>>([]);

  const [isEditQues, setIsEditQues] = useState<boolean>(false);

  const [editQuesId, setEditQuesId] = useState<any>("");

  const validationSchema = Yup.object().shape({
    // hours: Yup.number()
    //   .required(commonValidationError)
    //   .typeError(commonValidationError),
    minutes: Yup.number()
      .required(commonValidationError)
      .typeError(commonValidationError),
    seconds: Yup.number()
      .required(commonValidationError)
      .typeError(commonValidationError),
    question: Yup.string(),
    option: Yup.string(),
  });

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  // const { fields, remove, prepend } = useFieldArray({
  //   name: "questionsList",
  //   control,
  // });

  const option = watch("option");

  const question = watch("question");

  const handleAddOption = (event: any) => {
    if (event?.key === "Enter") {
      if (option) {
        setTempOptions((prev) => [
          ...prev,
          { optionId: prev.length + 1, option },
        ]);
        setValue("option", "");
      }
    }
  };

  useEffect(() => {
    setRadioOptions(
      tempOptions?.map((item) => ({
        label: item?.option,
        value: item?.optionId,
      }))
    );
  }, [tempOptions]);

  useEffect(() => {
    if (!question) {
      setValue("option", "");
      setTempOptions([]);
    }
  }, [question]);

  const handleAddQuestion = () => {
    if (question && tempOptions?.length > 0) {
      console.log(isEditQues);

      if (!isEditQues) {
        setQuestionsList((prev) => [
          {
            questionId: prev.length + 1,
            question: question,
            answerOptionId: 1,
            options: tempOptions,
          },
          ...prev,
        ]);
      } else {
        setQuestionsList((prev) => {
          let newArr = [...prev];
          const i = newArr?.find((d: any) => d?.questionId === editQuesId);
          const index = newArr.indexOf(i);
          console.log(i, index);
          newArr[index] = {
            questionId: editQuesId,
            question: question,
            answerOptionId: 1,
            options: tempOptions,
          };
          return newArr;
        });
      }
      setValue("question", "");
      setTempOptions([]);
    }
  };

  const handleEdit = (id: number) => {
    setIsEditQues(true);
    setEditQuesId(id);
    const ques = questionsList?.find((q: any) => q?.questionId === id);
    setValue("question", ques?.question);
    setTempOptions(ques?.options);
  };

  const handleRemove = (id: number) => {
    setQuestionsList((prev) =>
      [...prev]?.filter((d: any) => d?.questionId !== id)
    );
  };

  const handleSelectAnswer = (id: number) => {
    setTempAnswerId(id);
  };

  const handleRemoveOpt = (id: number) => {
    setTempOptions((prev) => [...prev]?.filter((d: any) => d?.optionId !== id));
  };

  const handleAddQuiz = (data: any) => {
    if (questionsList?.length > 0) {
      const d = quizes?.find((i: any) => i?.title === "Week 1");
      const index = quizes?.indexOf(d);
      d?.data?.push({
        quizId: quizes?.data?.length + 1,
        minutes: data?.minutes,
        seconds: data?.seconds,
        title: "Quiz 2",
        questionData: questionsList,
      });
      quizes[index] = d;
      console.log(quizes);

      //   quizData?.data?.push({})
      // appendQuiz();
    } else {
      notify.warn("Please Add Questions");
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12}>
        <Typography fontWeight={600} color={"text.secondary"}>
          Duration
        </Typography>
      </Grid>
      {/* <Grid item xs={12} sm={4} md={4}>
        <FormTextField
          register={register("hours")}
          label={"Hours"}
          required={true}
          type="number"
          error={!!errors?.hours?.message}
          helperText={errors?.hours?.message?.toString()}
        />
      </Grid> */}
      <Grid item xs={12} sm={6} md={6}>
        <FormTextField
          register={register("minutes")}
          label={"Minutes"}
          required={true}
          type="number"
          error={!!errors?.minutes?.message}
          helperText={errors?.minutes?.message?.toString()}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <FormTextField
          register={register("seconds")}
          label={"Seconds"}
          required={true}
          type="number"
          error={!!errors?.seconds?.message}
          helperText={errors?.seconds?.message?.toString()}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Box sx={{ backgroundColor: "#eee", p: 3, borderRadius: "10px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <FormTextField
                register={register("question")}
                label={"Question"}
                required={true}
                multiline
                placeholder="Enter the question here..."
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              display={"flex"}
              gap={2}
              alignItems={"center"}
            >
              <FormTextField
                register={register("option")}
                label={"Option"}
                required={true}
                disabled={!question}
                placeholder="Enter the option for the question"
                onKeyDown={handleAddOption}
              />
              {/* <IconButton onClick={handleAddOption}>
                <AddCircleOutlineRoundedIcon fontSize="large" />
              </IconButton> */}
            </Grid>
            <Grid xs={12} sm={12} item md={12}>
              <List sx={{ width: "100%" }} aria-label="contacts">
                {tempOptions?.map((o: any) => (
                  <ListItem
                    key={o?.optionId}
                    disablePadding
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="download"
                        onClick={() => handleRemoveOpt(o?.optionId)}
                      >
                        <DeleteRoundedIcon />
                      </IconButton>
                    }
                  >
                    <ListItemButton
                      onClick={() => handleSelectAnswer(o?.optionId)}
                    >
                      <ListItemIcon>
                        <CircleRoundedIcon />
                      </ListItemIcon>
                      <ListItemText primary={o?.option} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              display={"flex"}
              gap={2}
              alignItems={"center"}
              justifyContent={"flex-end"}
            >
              <PrimaryButton text={"+ Add"} onClick={handleAddQuestion} />
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        {questionsList?.map((q: any, index) => (
          <Grid key={q?.questionId} item md={12} mx={3}>
            <Divider textAlign="left">
              <Chip
                label={`Question ${index + 1}`}
                sx={{ fontWeight: 700, mb: 1, fontSize: "large" }}
              />
            </Divider>
            <Stack direction={"row"} justifyContent={"flex-end"} useFlexGap>
              <Tooltip title={"Edit"}>
                <IconButton onClick={() => handleEdit(q?.questionId)}>
                  <EditRoundedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={"Remove"}>
                <IconButton onClick={() => handleRemove(q?.questionId)}>
                  <DeleteRoundedIcon />
                </IconButton>
              </Tooltip>
            </Stack>
            <CustomRadioGroup
              options={q?.options?.map((i: any) => ({
                label: i?.option,
                value: i?.optionId,
              }))}
              control={control}
              error={false}
              helperText={""}
              id={``}
              label={q?.question}
            />
          </Grid>
        ))}
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-end"}
      >
        <PrimaryButton text={"> Save"} onClick={handleSubmit(handleAddQuiz)} />
      </Grid>
    </Grid>
  );
};
