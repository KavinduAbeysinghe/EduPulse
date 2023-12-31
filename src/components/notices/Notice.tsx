import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";

export interface NoticeIn {
  priority: "high" | "medium" | "low";
  dateTime: string;
  title: string;
  description: string;
}

interface NoticeProps {
  options: Array<NoticeIn>;
}

export const Notice = ({ options }: NoticeProps) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div>
      {options?.map((opt: NoticeIn, index) => (
        <Accordion
          className="notice-accordion"
          elevation={4}
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
          sx={{
            // backgroundColor: "rgb(240, 242, 245)",
            boxShadow: "none",
            borderLeft: `5px solid ${
              opt?.priority === "high"
                ? "#f10095"
                : opt?.priority === "medium"
                ? "gold"
                : "gray"
            }`,
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}bh-content`}
            id={`panel${index}bh-header`}
          >
            <Box display={"flex"} flexDirection={"column"}>
              <Typography sx={{ color: "text.secondary" }}>
                {opt?.dateTime}
              </Typography>
              <Typography sx={{ color: "text.primary" }} fontWeight={700}>
                {opt?.title}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{opt?.description}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};
