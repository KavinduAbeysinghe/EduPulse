import { Box } from "@mui/material";
import bgCard from "../../assets/images/abstract.jpg";

interface BgCardProps {
  color: string;
}

export const BgCard: React.FC<any> = ({
  color,
  children,
}: BgCardProps | any) => {
  return (
    <Box
      sx={{
        textAlign: "center",
        p: 3,
        borderRadius: "10px",
        overflow: "hidden",
        position: "relative",
        transition: "all .3s ease-in-out",
        ":hover": {
          transform: "scale(1.01)",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        },
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
          objectPosition: "top",
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
      <Box sx={{ position: "relative", zIndex: 2 }}>{children}</Box>
    </Box>
  );
};
