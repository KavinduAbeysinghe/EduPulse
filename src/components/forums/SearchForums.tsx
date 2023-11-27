import React, { useState } from "react";
import { ActivityCard } from "../../views/dashboard/ActivityCard";
import { BgCard } from "../common/BgCard";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { PrimaryButton } from "../buttons/PrimaryButton";
import { ForumCard } from "./ForumCard";
import bg1 from "../../assets/images/abstract.jpg";
import bg2 from "../../assets/images/bgimg1.jpg";
import bg3 from "../../assets/images/bgimg2.jpg";
import bg4 from "../../assets/images/bgimg3.jpg";
import bg5 from "../../assets/images/bgimg4.jpg";
import bg6 from "../../assets/images/bgimg5.jpg";
import p1 from "../../assets/images/person3.jpg";
import p2 from "../../assets/images/person4.jpg";
import p3 from "../../assets/images/person5.jpg";
import p4 from "../../assets/images/person6.jpg";
import p5 from "../../assets/images/person7.jpg";
import { SearchField } from "../inputs/SearchField";
import { InnerModal } from "../modals/CustomModal";
import { StartDiscussionForum } from "./StartDiscussionForum";
import { useLocation, useNavigate } from "react-router-dom";
import { CardHeading } from "../common/CardHeading";
import { forumData } from "../../util";

export const SearchForums = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const [showModal, setShowModal] = useState<boolean>(false);

  const [otherForumData, setForumData] = useState<Array<any>>(forumData);

  const [myForumData, setMyForumData] = useState<Array<any>>([
    {
      id: 6,
      title: "Cybersecurity Awareness",
      description:
        "Stay informed about the latest trends in cybersecurity. Discuss threat mitigation, best practices, and share resources to enhance digital security.",
      date: "2023-06-08",
      people: [p1, p2, p3, p4, p5],
      code: "F1001",
      img: bg1,
    },
    {
      id: 7,
      title: "Mobile App Development Insights",
      description:
        "Connect with fellow mobile app developers. Discuss platform-specific challenges, user experience design, and share insights into the app development lifecycle.",
      date: "2023-07-15",
      people: [p1, p2, p3, p4, p5],
      code: "F1001",
      img: bg2,
    },
    {
      id: 8,
      title: "Blockchain and Cryptocurrency",
      description:
        "Explore the world of blockchain technology and cryptocurrencies. Discuss decentralized finance, smart contracts, and the future of digital currency.",
      date: "2023-08-03",
      people: [p1, p2, p3, p4, p5],
      code: "F1001",
      img: bg3,
    },
  ]);

  const navigate = useNavigate();

  const handleStartDiscuss = () => {
    setShowModal(true);
  };

  const handleNavigateViewDiss = (id: any) => {
    const forum = { id: id };
    searchParams.set("forum", JSON.stringify(forum));
    navigate(`/control/discussions-and-forums/view?${searchParams}`);
  };

  return (
    <>
      <InnerModal
        open={showModal}
        setOpen={setShowModal}
        maxWidth={"sm"}
        title={"Start a Discussion"}
        body={
          <StartDiscussionForum
            setMyForums={setMyForumData}
            setOpen={setShowModal}
          />
        }
      />
      <Grid container rowSpacing={4} columnSpacing={7}>
        <Grid item md={12}>
          <BgCard color={"#26588b"} onClick={handleNavigateViewDiss}>
            <Typography color={"#fff"} mb={2} textAlign={"justify"}>
              Welcome to our vibrant community hub! 🌐 Engage, connect, and
              share your thoughts on a multitude of topics. Start meaningful
              discussions, gain diverse perspectives, and foster a space where
              ideas flourish. Join the conversation – your voice matters! 🗣️
              #CommunityConnection #DiscussTogether
            </Typography>
            <Stack direction={"row"} justifyContent={"end"}>
              <PrimaryButton
                text={"Start a Disscussion Now !"}
                onClick={handleStartDiscuss}
              />
            </Stack>
          </BgCard>
        </Grid>
        <Grid
          item
          container
          rowSpacing={7}
          columnSpacing={2}
          xs={12}
          sm={12}
          md={12}
        >
          <Grid item md={12} sm={12} xs={12}>
            <CardHeading text={"My Forums"} />
          </Grid>
          {myForumData?.map((d: any) => (
            <Grid item xs={12} sm={12} md={3} key={d?.id}>
              <ForumCard
                img={d?.img}
                title={`${d?.code} - ${d?.title}`}
                date={d?.date}
                action={() => handleNavigateViewDiss(d?.id)}
                people={d?.people}
                description={d?.description}
              />
            </Grid>
          ))}
        </Grid>
        <Grid
          item
          container
          xs={12}
          sm={12}
          md={12}
          rowSpacing={7}
          columnSpacing={2}
        >
          <Grid item md={12} sm={12} xs={12}>
            <CardHeading text={"Other Forums"} />
          </Grid>
          {otherForumData?.map((d: any) => (
            <Grid item xs={12} sm={12} md={3} key={d?.id}>
              <ForumCard
                img={d?.img}
                title={`${d?.code} - ${d?.title}`}
                date={d?.date}
                action={() => handleNavigateViewDiss(d?.id)}
                people={d?.people}
                description={d?.description}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
};
