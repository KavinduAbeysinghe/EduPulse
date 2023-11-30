import { Grid, Stack, Typography } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { forumData } from "../../util";
import { PrimaryButton } from "../buttons/PrimaryButton";
import { BgCard } from "../common/BgCard";
import { CardHeading } from "../common/CardHeading";
import { InnerModal } from "../modals/CustomModal";
import { ForumCard } from "./ForumCard";
import { StartDiscussionForum } from "./StartDiscussionForum";
import { useAuthContext } from "../../contexts/AuthContext";

const SearchForums = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const [showModal, setShowModal] = useState<boolean>(false);

  const [otherForumData, setForumData] = useState<Array<any>>([]);

  const [myForumData, setMyForumData] = useState<Array<any>>([]);

  const navigate = useNavigate();

  const handleStartDiscuss = () => {
    setShowModal(true);
  };

  const handleNavigateViewDiss = (id: any) => {
    console.log("id -> ", id);
    const forum = { id: id };
    searchParams.set("forum", JSON.stringify(forum));
    navigate(`/control/discussions-and-forums/view?${searchParams}`);
  };

  const { authContext } = useAuthContext();

  useLayoutEffect(() => {
    console.log("triggered");

    const myForums = forumData?.filter(
      (item) => item?.createdUserId === authContext.user.id
    );
    const otherForums = forumData?.filter(
      (item) => item?.createdUserId !== authContext.user.id
    );
    setMyForumData(myForums);
    setForumData(otherForums);
  }, [forumData, showModal]);

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
          {myForumData.length > 0 ? (
            <>
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
            </>
          ) : (
            <Grid item xs={12} sm={12} md={12}>
              <Typography>No Forums Available</Typography>
            </Grid>
          )}
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
          {otherForumData.length > 0 ? (
            <>
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
            </>
          ) : (
            <Grid item xs={12} sm={12} md={12}>
              <Typography>No Forums Available</Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default SearchForums;
