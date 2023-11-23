import { Box, Typography } from "@mui/material";
import bgCard from "../../assets/images/abstract.jpg";

interface ActivityCardProps {
  tag: string;
  value: number | string;
  color: string;
}

export const ActivityCard = ({ tag, value, color }: ActivityCardProps) => {
  return (
    <Box
      sx={{
        textAlign: "center",
        p: 3,
        borderRadius: "10px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <img
        src={bgCard}
        alt="activity card image"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "grayscale(100%)",
          opacity: 0.6,
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: color,
          opacity: 0.5,
          zIndex: 1,
        }}
      ></Box>
      <Box sx={{ position: "relative", zIndex: 2 }}>
        <Typography color={"white"} variant="h3">
          {value}
        </Typography>
        <Typography color={"#f5f5f5"}>{tag}</Typography>
      </Box>
    </Box>
  );
};
