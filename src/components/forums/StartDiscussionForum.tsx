import { FormTextField } from "../inputs/FormTextField";
import { Avatar, Box, Grid, Stack, Typography } from "@mui/material";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { FormAutocomplete } from "../../components/autocomplete/FormAutocomplete";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { FormCard } from "../../components/common/FormCard";
import { FormDropdown } from "../../components/dropdowns/FormDropdown";
import InsertPhotoRoundedIcon from "@mui/icons-material/InsertPhotoRounded";

export const StartDiscussionForum = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({});
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12}>
        <Box
          sx={{
            backgroundColor: "#eee",
            p: 3,
            borderRadius: "10px",
            transition: "all .3s ease-in-out",
            ":hover": { backgroundColor: "#dbdbdb" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            cursor: "pointer",
            flexDirection: "column",
          }}
        >
          <InsertPhotoRoundedIcon fontSize={"large"} sx={{ color: "gray" }} />
          <Typography sx={{ color: "gray" }}>Insert a Forum Cover</Typography>
          <Typography fontSize={"small"} sx={{ color: "gray" }}>
            Click or Drag & Drop to Upload
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <FormTextField
          register={register("title")}
          label={"Title"}
          error={false}
          helperText={""}
          disabled={false}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <FormTextField
          register={register("description")}
          label={"Description"}
          error={false}
          helperText={""}
          disabled={false}
          multiline
        />
      </Grid>
      <Grid item container md={12} justifyContent={"end"} alignItems={"center"}>
        <PrimaryButton text={"> Create"} />
      </Grid>
    </Grid>
  );
};
