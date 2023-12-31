import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, ThemeProvider, createTheme } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { FormTextField } from "../../components/inputs/FormTextField";
import { useNotification } from "../../contexts/NotificationContext";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { CustomBackdrop } from "../../components/backdrops/CustomBackdrop";

interface ForgotPasswordFormProps {
  setShowModal: (showModal: boolean) => void;
}

export const ForgotPasswordForm = ({
  setShowModal,
}: ForgotPasswordFormProps) => {
  const notify = useNotification();

  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);

  const defaultValues = {
    username: "",
    email: "",
    phone: "",
  };

  const commonError = "Field is required";

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(commonError),
    email: Yup.string().required(commonError),
    phone: Yup.string().required(commonError),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: any) => {
    setShowBackdrop(true);
    setTimeout(() => {
      console.log(data);
      setShowBackdrop(false);
      notify.info("An email is sent to you mail!");
      setShowModal(false);
    }, 1500);
  };

  const clearForm = () => {
    reset({});
    reset(defaultValues);
  };

  return (
    <>
      <CustomBackdrop open={showBackdrop} />
      <Grid container spacing={3} p={2}>
        <Grid item xs={12} sm={12} md={12}>
          <FormTextField
            register={register("username")}
            label={"Username"}
            required={true}
            error={!!errors?.username?.message}
            helperText={errors?.username?.message?.toString()}
            disabled={false}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <FormTextField
            register={register("email")}
            label={"Email"}
            required={true}
            error={!!errors?.email?.message}
            helperText={errors?.email?.message?.toString()}
            disabled={false}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <FormTextField
            register={register("phone")}
            label={"Phone"}
            required={true}
            error={!!errors?.phone?.message}
            helperText={errors?.phone?.message?.toString()}
            disabled={false}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          display={"flex"}
          gap={2}
          justifyContent={"end"}
        >
          <PrimaryButton
            sx={{ mt: 3 }}
            text={"Save"}
            type={"submit"}
            onClick={handleSubmit(onSubmit)}
          />
        </Grid>
      </Grid>
    </>
  );
};
