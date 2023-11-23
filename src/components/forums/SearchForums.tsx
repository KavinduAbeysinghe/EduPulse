import React, { useState } from "react";
import { ActivityCard } from "../../views/dashboard/ActivityCard";
import { BgCard } from "../common/BgCard";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { PrimaryButton } from "../buttons/PrimaryButton";
import { ForumCard } from "./ForumCard";
import bg1 from "../../assets/images/abstract.jpg";
import p1 from "../../assets/images/person3.jpg";
import p2 from "../../assets/images/person4.jpg";
import p3 from "../../assets/images/person5.jpg";
import p4 from "../../assets/images/person6.jpg";
import p5 from "../../assets/images/person7.jpg";
import { SearchField } from "../inputs/SearchField";
import { InnerModal } from "../modals/CustomModal";
import { StartDiscussionForum } from "./StartDiscussionForum";

export const SearchForums = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const forumsData = [
    {
      id: 1,
      title: "Introduction to Programming",
      description:
        "Discuss the fundamentals of programming languages, share tips, and ask questions related to coding basics.",
      date: "2023-01-15",
      people: [p1, p2, p3, p4, p5],
      code: "F1001",
      img: bg1,
    },
    {
      id: 2,
      title: "Mathematics for Machine Learning",
      description:
        "Explore mathematical concepts crucial for understanding machine learning algorithms. Dive into discussions on linear algebra, calculus, and statistics.",
      date: "2023-02-05",
      people: [p1, p2, p3, p4, p5],
      code: "F1001",
      img: bg1,
    },
    {
      id: 3,
      title: "Web Development Bootcamp",
      description:
        "Join the conversation on web development technologies, frameworks, and best practices. Share your projects and seek feedback from the community.",
      date: "2023-03-10",
      people: [p1, p2, p3, p4, p5],
      code: "F1001",
      img: bg1,
    },
    {
      id: 4,
      title: "Artificial Intelligence Ethics",
      description:
        "Delve into the ethical considerations surrounding artificial intelligence. Discuss responsible AI development, bias, and the societal impact of AI.",
      date: "2023-04-02",
      people: [p1, p2, p3, p4, p5],
      code: "F1001",
      img: bg1,
    },
    {
      id: 5,
      title: "Data Science Challenges",
      description:
        "Share your experiences tackling real-world data science challenges. Discuss data cleaning, feature engineering, and model evaluation strategies.",
      date: "2023-05-20",
      people: [p1, p2, p3, p4, p5],
      code: "F1001",
      img: bg1,
    },
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
      img: bg1,
    },
    {
      id: 8,
      title: "Blockchain and Cryptocurrency",
      description:
        "Explore the world of blockchain technology and cryptocurrencies. Discuss decentralized finance, smart contracts, and the future of digital currency.",
      date: "2023-08-03",
      people: [p1, p2, p3, p4, p5],
      code: "F1001",
      img: bg1,
    },
  ];

  const handleStartDiscuss = () => {
    setShowModal(true);
  };

  return (
    <>
      <InnerModal
        open={showModal}
        setOpen={setShowModal}
        maxWidth={"sm"}
        title={"Start a Discussion"}
        body={<StartDiscussionForum />}
      />
      <Grid container rowSpacing={7} columnSpacing={2}>
        <Grid item md={12}>
          <BgCard color={"#26588b"}>
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
        {forumsData?.map((d: any) => (
          <Grid item xs={12} sm={6} md={3} key={d?.id}>
            <ForumCard
              img={d?.img}
              title={`${d?.code} - ${d?.title}`}
              date={d?.date}
              action={function (): void {
                throw new Error("Function not implemented.");
              }}
              people={d?.people}
              description={d?.description}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
