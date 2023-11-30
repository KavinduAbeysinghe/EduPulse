import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { InnerModal } from "../modals/CustomModal";
import { DocPreviewModal } from "../modals/DocPreviewModal";
import { useState } from "react";
import { QuizModal } from "../modals/QuizModal";
import { string } from "yup";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

interface CustomizedAccordionsProps {
  data: Array<any>;
  isQuiz: boolean;
}

export default function CustomizedAccordions({
  data,
  isQuiz,
}: CustomizedAccordionsProps) {
  const [showModal, setShowModal] = React.useState(false);
  const [showQModal, setShowQModal] = React.useState(false);

  const [docDetails, setDocDetails] = useState<any>(null);

  const [quizData, setQuizData] = useState<any>(null);

  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const handleDownloadFile = (file: any) => {
    const link = document.createElement("a");
    link.href = file;
    link.download = "sample.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
    setShowModal(true);
  };

  const handlePreviewQuiz = (data: any) => {
    console.log(data);
    setQuizData(data);
    setShowQModal(true);
  };

  return (
    <div>
      {quizData && (
        <QuizModal
          setQuizData={setQuizData}
          open={showQModal}
          setOpen={setShowQModal}
          quizData={quizData}
        />
      )}
      {docDetails && (
        <DocPreviewModal
          open={showModal}
          setOpen={setShowModal}
          maxWidth={"lg"}
          doc={docDetails?.doc}
          docType={docDetails?.docType}
          title={docDetails?.docTitle}
        />
      )}
      {data?.map((d: any, index) => (
        <Accordion
          key={index}
          //   expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
          sx={{
            borderRadius: "10px",
            border: "none",
            overflow: "hidden",
            ":hover": {
              transform: "scale(1.01)",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              background: "#fff",
            },
            transition: "all .3s ease-in-out",
            mb: 2,
          }}
          className="module-accordion"
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>{d?.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {d?.data?.map((e: any, index2: number) => (
              <List key={index2} sx={{ width: "100%" }} aria-label="contacts">
                <ListItem
                  disablePadding
                  secondaryAction={
                    !isQuiz ? (
                      <IconButton
                        edge="end"
                        aria-label="download"
                        onClick={() => handleDownloadFile(e)}
                      >
                        <DownloadRoundedIcon />
                      </IconButton>
                    ) : (
                      <></>
                    )
                  }
                >
                  <ListItemButton
                    onClick={() =>
                      !isQuiz
                        ? handlePreviewFile(e?.file)
                        : handlePreviewQuiz(e)
                    }
                  >
                    <ListItemIcon>
                      <InsertDriveFileRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary={e?.title} />
                  </ListItemButton>
                </ListItem>
              </List>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
