import {
  Avatar,
  Box,
  Divider,
  Grid,
  Grow,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import bg from "../../assets/images/bgimg3.jpg";
import { MessageView } from "./MessageView";
import { FormTextField } from "../inputs/FormTextField";
import { Chip } from "@mui/material";
import { ReactNode } from "react";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { PrimaryButton } from "../buttons/PrimaryButton";
import { CardHeading } from "../common/CardHeading";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import p1 from "../../assets/images/person.jpg";
import { useForm } from "react-hook-form";
import { CustomChip } from "../chips/CustomChip";

export const ViewForum = () => {
  const [replyList, setReplyList] = useState<Array<any>>([
    {
      name: "John Smith",
      designation: "Computer Science Student",
      profileImg: p1,
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, deserunt doloremque? Tenetur modi, aperiam ad magni officia quaerat! Quis possimus odit nobis incidunt unde libero aliquam maiores aut ut beatae!",
      date: "1 Nov 2023",
    },
    {
      name: "John Smith",
      designation: "Computer Science Student",
      profileImg: p1,
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, deserunt doloremque? Tenetur modi, aperiam ad magni officia quaerat! Quis possimus odit nobis incidunt unde libero aliquam maiores aut ut beatae!",
      date: "1 Nov 2023",
    },
    {
      name: "John Smith",
      designation: "Computer Science Student",
      profileImg: p1,
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, deserunt doloremque? Tenetur modi, aperiam ad magni officia quaerat! Quis possimus odit nobis incidunt unde libero aliquam maiores aut ut beatae!",
      date: "1 Nov 2023",
    },
    {
      name: "John Smith",
      designation: "Computer Science Student",
      profileImg: p1,
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, deserunt doloremque? Tenetur modi, aperiam ad magni officia quaerat! Quis possimus odit nobis incidunt unde libero aliquam maiores aut ut beatae!",
      date: "1 Nov 2023",
    },
    {
      name: "John Smith",
      designation: "Computer Science Student",
      profileImg: p1,
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, deserunt doloremque? Tenetur modi, aperiam ad magni officia quaerat! Quis possimus odit nobis incidunt unde libero aliquam maiores aut ut beatae!",
      date: "1 Nov 2023",
    },
  ]);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 0);
    return () => clearTimeout(timeoutId);
  }, []);

  const onResetClick = () => {};

  const { register, watch, handleSubmit, setValue, reset, control } = useForm(
    {}
  );

  const handleSendMessage = (data: any) => {
    setReplyList((prev) => {
      const newArr = [...prev];
      newArr.push({
        name: "Steph Williams",
        designation: "Computer Science Student",
        profileImg: p1,
        date: "24 Nov 2023",
        message: data?.message,
      });
      return newArr;
    });
  };

  return (
    <Box sx={{ position: "relative" }}>
      <img
        src={bg}
        alt=""
        style={{
          //   position: "absolute",
          width: "100%",
          height: "150px",
          borderRadius: "10px",
          objectFit: "cover",
          zIndex: -1,
        }}
      />
      <Box
        sx={{
          mt: -7,
          zIndex: 5,
          p: 3,
          backgroundColor: "#fff",
          position: "absolute",
          left: 0,
          right: 0,
          mx: 2,
          borderRadius: "10px",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          useFlexGap
          gap={2}
          flexWrap={"wrap"}
        >
          <Box>
            <Stack direction={"row"} gap={1} useFlexGap alignItems={"center"}>
              <CardHeading text={"F1001 - Database Management Systems"} />
              <CustomChip label={"Active"} type="success" />
            </Stack>
            <Typography>Created On 1 Nov 2023 by @JohnSmith</Typography>
          </Box>
          <Chip
            icon={<RefreshRoundedIcon />}
            label="Refresh"
            onClick={onResetClick}
          />
        </Stack>
        <Typography mt={2}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error tempora
          harum impedit maiores ea fugit officiis voluptas, assumenda in ab
          molestias minus illo dolor nulla blanditiis nostrum magnam quibusdam
          sapiente?
        </Typography>
        <Divider className={"custom-divider-dark"} sx={{ my: 3 }} />
        <Box sx={{ height: "500px", overflow: "auto" }}>
          <Stack gap={2} useFlexGap direction={"column"}>
            {replyList?.map((reply: any, index) => (
              //   <Grow
              //     key={index}
              //     in={isVisible}
              //     style={{ transformOrigin: "0 0 0" }}
              //     {...(isVisible ? { timeout: 500 } : {})}
              //   >
              <MessageView
                key={index}
                profileImg={reply?.profileImg}
                name={reply?.name}
                description={reply?.message}
                date={reply?.date}
                designation={reply?.designation}
              />
              //   </Grow>
            ))}
          </Stack>
        </Box>
        <Grid container spacing={2} my={3}>
          <Grid item xs={12} sm={12} md={12} container gap={2}>
            <FormTextField
              register={register("message")}
              label={"Type a Reply"}
              placeholder="Type a reply..."
              multiline
            />
          </Grid>
          <Grid
            container
            justifyContent={"flex-end"}
            item
            xs={12}
            sm={12}
            md={12}
          >
            <PrimaryButton
              text={"Send"}
              startIcon={<SendRoundedIcon />}
              onClick={handleSubmit(handleSendMessage)}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
