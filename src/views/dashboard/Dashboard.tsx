import {
  Avatar,
  Box,
  Button,
  Grid,
  Grow,
  IconButton,
  Popover,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { ActivityCard } from "./ActivityCard";
import { CardHeading } from "../../components/common/CardHeading";
import { DashboardAreaChart } from "./DashboardAreaChart";
import { SearchField } from "../../components/inputs/SearchField";
import BasicDateCalendar from "../../components/datepickers/BasicDateCalendar";
import { Notice, NoticeIn } from "../../components/notices/Notice";
import { CircularProgressWithLabel } from "../../components/progress/CircularProgress";
import { ScheduleListView } from "./ScheduleListView";
import { MoreButton } from "../../components/common/MoreButton";
import { DashboardLineChart } from "./DashboardLineChart";
import profileImg from "../../assets/images/person3.jpg";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { InnerModal } from "../../components/modals/CustomModal";

export const Dashboard = () => {
  const [noticeState, setNoticeState] = useState<Array<any>>([]);

  const p1 = 75;
  const p2 = 85;
  const p3 = 55;

  const [progress1, setProgress1] = useState<number>(0);
  const [progress2, setProgress2] = useState<number>(0);
  const [progress3, setProgress3] = useState<number>(0);

  const [showModal, setShowModal] = useState<boolean>(false);

  const activityCardData = [
    {
      tag: "Active Courses",
      value: 3,
      color: "#14147c",
    },
    {
      tag: "Active Quizes",
      value: 12,
      color: "#481c68",
    },
    {
      tag: "Active Courses",
      value: 3,
      color: "#60036d",
    },
  ];

  const noticeList: Array<NoticeIn> = [
    {
      priority: "high",
      dateTime: "1 November 2023 @ 8 AM",
      title: "Complete all the remaining evaluations",
      description:
        "ALl the remaining evaluations need to be completed by 1 PM today",
    },
    {
      priority: "medium",
      dateTime: "1 November 2023 @ 8 AM",
      title: "Complete all the remaining evaluations",
      description:
        "ALl the remaining evaluations need to be completed by 1 PM today",
    },
    {
      priority: "low",
      dateTime: "1 November 2023 @ 8 AM",
      title: "Complete all the remaining evaluations",
      description:
        "ALl the remaining evaluations need to be completed by 1 PM today",
    },
    {
      priority: "low",
      dateTime: "1 November 2023 @ 8 AM",
      title: "Complete all the remaining evaluations",
      description:
        "ALl the remaining evaluations need to be completed by 1 PM today",
    },
    {
      priority: "high",
      dateTime: "1 November 2023 @ 8 AM",
      title: "Complete all the remaining evaluations",
      description:
        "ALl the remaining evaluations need to be completed by 1 PM today",
    },
  ];

  const activityOverviewData = [
    {
      title: "Web Design and Development",
      value: progress1,
      color: "#26588b",
    },
    {
      title: "Database Management System",
      value: progress2,
      color: "",
    },
    {
      title: "Computer Systems Fundamentals",
      value: progress3,
      color: "#3398ff",
    },
  ];

  const scheduleData = [
    {
      title: "DBMS Coursework Submission",
      description: "Due 25 Nov",
    },
    {
      title: "CSF Tutorial Submission",
      description: "Due 25 Nov",
    },
    {
      title: "Java Course Submission",
      description: "Due 25 Nov",
    },
  ];

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleFilterHighPriority = () => {
    setNoticeState(noticeList?.filter((notice) => notice?.priority === "high"));
    handleClose();
  };

  const handleFilterMediumPriority = () => {
    setNoticeState(
      noticeList?.filter((notice) => notice?.priority === "medium")
    );
    handleClose();
  };

  const handleFilterLowPriority = () => {
    setNoticeState(noticeList?.filter((notice) => notice?.priority === "low"));
    handleClose();
  };

  const handleFilterAll = () => {
    setNoticeState(noticeList);
    handleClose();
  };

  useLayoutEffect(() => {
    setNoticeState(noticeList);
  }, []);

  const priorityActions = [
    {
      name: "All",
      action: handleFilterAll,
    },
    {
      name: "High Priority",
      action: handleFilterHighPriority,
    },
    {
      name: "Medium Priority",
      action: handleFilterMediumPriority,
    },
    {
      name: "Low Priority",
      action: handleFilterLowPriority,
    },
  ];

  const progressGridRef = useRef<any>(null);

  const animateProgressBar = () => {
    let animationFrameId: number;
    const start = performance.now();
    const duration = 1000; // Animation duration in milliseconds

    const updateProgress = () => {
      const elapsed = performance.now() - start;
      const progressValue1 = Math.min((elapsed / duration) * p1, p1);
      const progressValue2 = Math.min((elapsed / duration) * p2, p2);
      const progressValue3 = Math.min((elapsed / duration) * p3, p3);

      setProgress1(progressValue1);
      setProgress2(progressValue2);
      setProgress3(progressValue3);

      if (progressValue1 < p1 && progressValue2 < p2 && progressValue3 < p3) {
        // Continue the animation
        animationFrameId = requestAnimationFrame(updateProgress);
      }
    };

    // Start the animation
    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      // Cancel the animation frame when the component unmounts or the target is out of the viewport
      cancelAnimationFrame(animationFrameId);
    };
  };

  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };
    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // The target element is in the viewport
          console.log("Target element is in the viewport!");
          animateProgressBar();
        } else {
          // The target element is out of the viewport
          console.log("Target element is out of the viewport!");
        }
      });
    };

    // Create an instance of IntersectionObserver with the callback and options
    const observer = new IntersectionObserver(callback, options);

    // If there's a target element, start observing it
    if (progressGridRef.current) {
      observer.observe(progressGridRef.current);
    }

    // Clean up the observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, []);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 0);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <InnerModal
        open={showModal}
        setOpen={setShowModal}
        maxWidth={"sm"}
        title={"Upcomming Schedules"}
        body={<p>Upcomming Schedules</p>}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <Grow
                in={isVisible}
                style={{ transformOrigin: "0 0 0" }}
                {...(isVisible ? { timeout: 1500 } : {})}
              >
                <Box className={"basic-card"} px={3}>
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    flexWrap={"wrap"}
                  >
                    <Box>
                      <Typography fontWeight={600} variant="h4">
                        Hello, Steph !
                      </Typography>
                      <Typography color={"text.secondary"} mt={1}>
                        Welcome to the dashboard of Edu Pulse xD
                      </Typography>
                    </Box>
                    <SearchField />
                  </Stack>
                  <Grid container spacing={2} mt={1}>
                    {activityCardData?.map((d: any, index) => (
                      <Grid key={index} item xs={12} sm={12} md={4}>
                        <ActivityCard
                          tag={d?.tag}
                          value={d?.value}
                          color={d?.color}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Grow>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Grow
                in={isVisible}
                style={{ transformOrigin: "0 0 0" }}
                {...(isVisible ? { timeout: 300 } : {})}
              >
                <Box className={"basic-card"} px={3}>
                  <CardHeading text={"Learning Time Overview"} />
                  <DashboardAreaChart />
                </Box>
              </Grow>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Grow
                in={isVisible}
                style={{ transformOrigin: "0 0 0" }}
                {...(isVisible ? { timeout: 500 } : {})}
              >
                <Box className={"basic-card"} px={3}>
                  <CardHeading text={"Activity Overview"} />
                  <Typography mt={1} color={"text.secondary"}>
                    Your recent module completion
                  </Typography>
                  <Grid
                    ref={progressGridRef}
                    container
                    rowSpacing={2}
                    columnSpacing={2}
                    mt={2}
                  >
                    {activityOverviewData?.map((d: any) => (
                      <Grid
                        key={d?.title}
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        gap={1}
                      >
                        <Typography fontWeight={500}>{d?.title}</Typography>
                        <CircularProgressWithLabel
                          value={d?.value}
                          color={d?.color}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Grow>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Grow
                in={isVisible}
                style={{ transformOrigin: "0 0 0" }}
                {...(isVisible ? { timeout: 700 } : {})}
              >
                <Box className={"basic-card"} px={3}>
                  <CardHeading text={"Progress"} />
                  <Box mt={2}>
                    <DashboardLineChart />
                  </Box>
                </Box>
              </Grow>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <Grow
                in={isVisible}
                style={{ transformOrigin: "0 0 0" }}
                {...(isVisible ? { timeout: 900 } : {})}
              >
                <Box className={"basic-card"} px={3}>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    gap={2}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src={profileImg}
                      sx={{ width: 100, height: 100 }}
                    />
                    <Box>
                      <Typography variant="h6">Steph Williams</Typography>
                      <Typography fontSize={"small"} color={"text.secondary"}>
                        Computer Science Student
                      </Typography>
                      <Typography fontSize={"small"} color={"text.secondary"}>
                        University of Westminster
                      </Typography>
                      <Typography fontSize={"small"} color={"text.secondary"}>
                        Stu No: E110110110
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Grow>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Grow
                in={isVisible}
                style={{ transformOrigin: "0 0 0" }}
                {...(isVisible ? { timeout: 1100 } : {})}
              >
                <Box height={"100%"} className={"basic-card"} px={3}>
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <CardHeading text={"Recent Notices"} />
                    <div>
                      <Tooltip title={"Filter"}>
                        <IconButton onClick={handleClick}>
                          <FilterListRoundedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                      >
                        {priorityActions?.map((a: any) => (
                          <Button
                            onClick={a?.action}
                            key={a?.name}
                            fullWidth
                            sx={{ textTransform: "initial" }}
                          >
                            {a?.name}
                          </Button>
                        ))}
                      </Popover>
                    </div>
                  </Stack>
                  <Box
                    mt={2}
                    height={400}
                    overflow={"auto"}
                    borderRadius={"10px"}
                  >
                    <Notice options={noticeState} />
                  </Box>
                </Box>
              </Grow>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Grow
                in={isVisible}
                style={{ transformOrigin: "0 0 0" }}
                {...(isVisible ? { timeout: 1300 } : {})}
              >
                <Box height={"100%"} className={"basic-card"} px={3}>
                  <CardHeading text={"Schedule"} />
                  <Box mt={2}>
                    <BasicDateCalendar />
                    <Typography color={"primary"}>Upcomming</Typography>
                    <ScheduleListView data={scheduleData} />
                    {/* <MoreButton
                    onClick={() => {
                      setShowModal(true);
                      console.log("ed");
                    }}
                  >
                    More
                  </MoreButton> */}
                  </Box>
                </Box>
              </Grow>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
