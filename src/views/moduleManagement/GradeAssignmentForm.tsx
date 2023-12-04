import {
  Grid,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useLayoutEffect, useState } from "react";
import { FormTextField } from "../../components/inputs/FormTextField";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import {
  commonValidationError,
  gradeAssignmentsData,
  studentData2,
} from "../../util";
import { yupResolver } from "@hookform/resolvers/yup";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import { DocPreviewModal } from "../../components/modals/DocPreviewModal";
import { useNotification } from "../../contexts/NotificationContext";
import { CustomBackdrop } from "../../components/backdrops/CustomBackdrop";

interface GradeAssignmentFormProps {
  submissionId: any;
  setOpen: any;
}

export const GradeAssignmentForm = ({
  submissionId,
  setOpen,
}: GradeAssignmentFormProps) => {
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);

  const [docDetails, setDocDetails] = useState<any>(null);

  const [student, setStudent] = useState<any>("");

  const [submittedDate, setSubmittedDate] = useState<any>("");

  const [file, setFile] = useState<any>("");

  const [isGraded, setIsGraded] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (submissionId) {
      const submission = gradeAssignmentsData?.find(
        (d: any) => d?.id === submissionId
      );
      const student = studentData2?.find(
        (s: any) => s?.id === submission?.stuId
      );
      setStudent(student?.name);
      setSubmittedDate(submission?.submittedDate);
      const doc = submission?.file;
      const names = doc?.split("/");
      setFile({
        fileName: names ? names[names?.length - 1] : "",
        file: submission?.file,
      });
      if (submission?.isGraded) {
        setIsGraded(true);
        setValue("mark", parseInt(submission?.mark));
        setValue("remark", submission?.remark);
      }
    }
  }, [submissionId]);

  const validationSchema = Yup.object().shape({
    mark: Yup.number()
      .required(commonValidationError)
      .typeError(commonValidationError),
    remark: Yup.string(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handlePreviewFile = (file: any) => {
    console.log(typeof file);
    if (typeof file === "string") {
      setDocDetails({
        doc: file,
        docType: "application/pdf",
        docTitle: "Sample.pdf",
      });
    } else {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setDocDetails({
          doc: e.target.result,
          docType: file.type,
          docTitle: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
    setShowPreviewModal(true);
  };

  const handleDownloadFile = (file: any) => {
    const link = document.createElement("a");
    link.href = file;
    link.download = "sample.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const notify = useNotification();

  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);

  const onSubmit = (data: any) => {
    setOpen(false);
    setShowBackdrop(true);
    const timeout = setTimeout(() => {
      const submission = gradeAssignmentsData.find(
        (d: any) => d.id === submissionId
      );
      if (submission) {
        const index = gradeAssignmentsData.indexOf(submission);
        gradeAssignmentsData[index] = {
          id: submission?.id,
          stuId: submission?.stuId,
          submittedDate: submission?.submittedDate,
          submission: submission?.submission,
          overdueStatus: submission?.overdueStatus,
          file: submission?.file,
          mark: data?.mark,
          remark: data?.remark,
          isGraded: true,
        };
        notify.success("Grading Success");
      }
      setShowBackdrop(false);
    }, 1000);
    return () => clearTimeout(timeout);
  };

  return (
    <>
      <CustomBackdrop open={showBackdrop} />
      <DocPreviewModal
        open={showPreviewModal}
        setOpen={setShowPreviewModal}
        maxWidth={"lg"}
        doc={docDetails?.doc}
        docType={docDetails?.type}
        title={docDetails?.title}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <Typography color={"text.secondary"}>
            Student: <span style={{ fontWeight: 600 }}>{student}</span>
          </Typography>
          <Typography color={"text.secondary"}>
            Submitted Date:{" "}
            <span style={{ fontWeight: 600 }}>{submittedDate}</span>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <ListItem
            disablePadding
            secondaryAction={
              <Tooltip title={"Remove File"} placement="left-start">
                <IconButton
                  edge="end"
                  aria-label="download"
                  onClick={() => handleDownloadFile(file?.file)}
                >
                  <DownloadRoundedIcon />
                </IconButton>
              </Tooltip>
            }
          >
            <ListItemButton onClick={() => handlePreviewFile(file?.file)}>
              <ListItemIcon>
                <InsertDriveFileRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={file?.fileName} />
            </ListItemButton>
          </ListItem>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <FormTextField
            register={register("mark")}
            label={"Mark"}
            type="number"
            required={true}
            error={!!errors?.mark?.message}
            helperText={errors?.mark?.message?.toString()}
            disabled={isGraded}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <FormTextField
            register={register("remark")}
            label={"Remark"}
            disabled={isGraded}
          />
        </Grid>
        {!isGraded && (
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            display={"flex"}
            justifyContent={"flex-end"}
            alignItems={"center"}
          >
            <PrimaryButton text={"Save"} onClick={handleSubmit(onSubmit)} />
          </Grid>
        )}
      </Grid>
    </>
  );
};
