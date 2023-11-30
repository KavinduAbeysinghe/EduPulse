import {
  Avatar,
  Box,
  Collapse,
  Divider,
  Grid,
  Grow,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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
import { TransitionGroup } from "react-transition-group";
import { useLocation } from "react-router-dom";
import { forumData, userData } from "../../util";
import dayjs from "dayjs";
import { CustomBackdrop } from "../backdrops/CustomBackdrop";
import { useAuthContext } from "../../contexts/AuthContext";

export const ViewForum = () => {
  const location = useLocation();

  const [userDetails, setUserDetails] = useState<any>(null);

  const { authContext } = useAuthContext();

  useLayoutEffect(() => {
    setUserDetails(authContext?.user);
  }, [authContext]);

  const searchParams = new URLSearchParams(location.search);

  const [forumDetails, setForumDetails] = useState<any>(null);

  const [replyList, setReplyList] = useState<Array<any>>([]);

  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);

  useLayoutEffect(() => {
    const forumObj = searchParams.get("forum");
    if (forumObj) {
      const f = JSON.parse(forumObj);
      console.log(f);

      const forum = forumData?.find((d: any) => d?.id === f?.id);

      setForumDetails({
        code: forum?.code,
        img: forum?.img,
        title: forum?.title,
        description: forum?.description,
        status: "active",
        createdDate: dayjs(new Date(forum?.date ?? "")).format("DD/MM/YYYY"),
        createdBy: userData?.find((d: any) => d?.id === forum?.createdUserId)
          ?.username,
      });
      setReplyList(
        forum?.replies?.map((d: any) => {
          const usr = userData?.find((dta: any) => dta?.id === d?.userId);
          console.log("usr", usr);
          return {
            name: usr?.name,
            designation: usr?.designation,
            profileImg: usr?.profileImg,
            message: d?.reply,
            date: dayjs(new Date(d?.postedDate)).format("DD/MM/YYYY"),
          };
        }) ?? []
      );
    }
  }, [location]);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 0);
    return () => clearTimeout(timeoutId);
  }, []);

  const onResetClick = () => {
    setShowBackdrop(true);
    const timeout = setTimeout(() => {
      setShowBackdrop(false);
    }, 1000);

    return () => clearTimeout(timeout);
  };

  const { register, watch, handleSubmit, setValue, reset, control } = useForm(
    {}
  );

  const handleSendMessage = (data: any) => {
    setReplyList((prev) => {
      const newArr = [...prev];
      newArr.push({
        name: userDetails?.name,
        designation: "Computer Science Student",
        profileImg: userDetails?.profileImg,
        date: dayjs(new Date()).format("DD/MM/YYYY"),
        message: data?.message,
      });
      return newArr;
    });
    scrollToBottom();
  };

  const boxRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <>
      <CustomBackdrop open={showBackdrop} />
      <Box sx={{ position: "relative" }}>
        <img
          src={forumDetails?.img}
          alt=""
          style={{
            //   position: "absolute",
            width: "100%",
            height: "150px",
            borderRadius: "10px",
            objectFit: "cover",
            zIndex: -1,
            filter: "brightness(80%)",
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
                <CardHeading
                  text={`${forumDetails?.code} - ${forumDetails?.title}`}
                />
                <CustomChip label={"Active"} type="success" />
              </Stack>
              <Typography>
                Created {forumDetails?.createdDate} by @
                {forumDetails?.createdBy}
              </Typography>
            </Box>
            <Chip
              icon={<RefreshRoundedIcon />}
              label="Refresh"
              onClick={onResetClick}
            />
          </Stack>
          <Typography mt={2}>{forumDetails?.description}</Typography>
          <Divider className={"custom-divider-dark"} sx={{ my: 3 }} />
          <Box ref={boxRef} sx={{ height: "500px", overflow: "auto" }}>
            <TransitionGroup>
              {replyList?.map((reply: any, index) => (
                <Collapse>
                  <MessageView
                    key={index}
                    profileImg={reply?.profileImg}
                    name={reply?.name}
                    description={reply?.message}
                    date={reply?.date}
                    designation={reply?.designation}
                  />
                </Collapse>
              ))}
            </TransitionGroup>
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
    </>
  );
};
