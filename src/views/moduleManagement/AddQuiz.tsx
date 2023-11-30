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
import { FormAutocomplete } from "../../components/autocomplete/FormAutocomplete";

interface AddQuizProps {
  appendQuiz: any;
  quizes: any;
  sectionList: Array<any>;
  setShowModal: any;
}

export const AddQuiz = ({
  appendQuiz,
  quizes,
  sectionList,
  setShowModal,
}: AddQuizProps) => {
  const notify = useNotification();

  const [tempOptions, setTempOptions] = useState<Array<any>>([]);

  const [tempAnswerId, setTempAnswerId] = useState<any>("");

  const [tempAnswerIndex, setTempAnswerIndex] = useState<any>("");

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
    section: Yup.string(),
    selectSection: Yup.number()
      .required(commonValidationError)
      .typeError(commonValidationError),
    quizTitle: Yup.string().required(commonValidationError),
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
      if (tempAnswerIndex && tempAnswerId) {
        if (!isEditQues) {
          setQuestionsList((prev) => [
            ...prev,
            {
              questionId: prev.length + 1,
              question: question,
              answerOptionId: tempAnswerId,
              options: tempOptions,
            },
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
              answerOptionId: tempAnswerId,
              options: tempOptions,
            };
            return newArr;
          });
        }
        setValue("question", "");
        setTempAnswerId("");
        setTempAnswerIndex("");
        setTempOptions([]);
      } else {
        notify.warn("Please select an answer");
      }
    }
  };

  const handleEdit = (id: number) => {
    setIsEditQues(true);
    setEditQuesId(id);
    const ques = questionsList?.find((q: any) => q?.questionId === id);
    setValue("question", ques?.question);
    setTempOptions(ques?.options);
    setTempAnswerId(ques?.answerOptionId);
    setTempAnswerIndex(ques?.answerOptionId);
  };

  const handleRemove = (id: number) => {
    setQuestionsList((prev) =>
      [...prev]?.filter((d: any) => d?.questionId !== id)
    );
  };

  const handleSelectAnswer = (id: number, index: number) => {
    setTempAnswerId(id);
    setTempAnswerIndex(index + 1);
  };

  const handleRemoveOpt = (id: number) => {
    setTempOptions((prev) => [...prev]?.filter((d: any) => d?.optionId !== id));
  };

  const handleAddQuiz = (data: any) => {
    console.log(data);

    if (questionsList?.length > 0) {
      const d = quizes?.find((i: any) => i?.ID === data?.selectSection);
      const index = quizes?.indexOf(d);
      d?.data?.push({
        quizId: quizes?.data?.length + 1,
        minutes: data?.minutes,
        seconds: data?.seconds,
        title: data?.quizTitle,
        questionData: questionsList,
      });
      quizes[index] = d;
      console.log(quizes);
      setShowModal(false);
      //   quizData?.data?.push({})
      // appendQuiz();
    } else {
      notify.warn("Please Add Questions");
    }
  };

  const sectionName = watch("section");

  const handleAddSection = () => {
    if (sectionName) {
      const dupExists = quizes?.find((i: any) => i?.title === sectionName);
      if (!dupExists) {
        appendQuiz({
          ID: quizes.length + 1,
          title: sectionName,
          data: [],
        });
        notify.success("Section Added Successfully");
      } else {
        notify.warn("Already Exists");
      }
      setValue("section", "");
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        display={"flex"}
        gap={1}
        alignItems={"center"}
      >
        <FormTextField
          register={register("section")}
          label={"Add Section"}
          placeholder="Enter Secion Title"
        />
        <IconButton onClick={handleAddSection}>
          <AddCircleOutlineRoundedIcon fontSize="large" />
        </IconButton>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <FormAutocomplete
          error={!!errors?.selectSection?.message}
          helperText={errors?.selectSection?.message?.toString()}
          setValue={setValue}
          label={"Select Section"}
          options={sectionList}
          id={"selectSection"}
          required={true}
          disabled={false}
          control={control}
          watch={watch}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <FormTextField
          required={true}
          register={register("quizTitle")}
          label={"Quiz Title"}
          placeholder="Enter a title for the quiz"
          error={!!errors?.quizTitle?.message}
          helperText={errors?.quizTitle?.message?.toString()}
        />
      </Grid>
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
                {tempOptions?.map((o: any, index) => (
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
                      onClick={() => handleSelectAnswer(o?.optionId, index)}
                    >
                      <ListItemIcon>{`(${index + 1})`}</ListItemIcon>
                      <ListItemText primary={o?.option} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Grid>
            {tempAnswerIndex && (
              <Grid item xs={12} sm={12} md={12}>
                <Chip
                  label={`Answer Number: ${tempAnswerIndex}`}
                  sx={{ fontWeight: 700 }}
                />
              </Grid>
            )}
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
            {
              <CustomRadioGroup
                options={q?.options?.map((i: any) => ({
                  label: i?.option,
                  value: i?.optionId,
                }))}
                control={control}
                error={false}
                helperText={""}
                id={"question"}
                label={q?.question}
                disabled={false}
                val={q.answerOptionId}
              />
            }
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
        <PrimaryButton text={"Save"} onClick={handleSubmit(handleAddQuiz)} />
      </Grid>
    </Grid>
  );
};
