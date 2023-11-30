import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Avatar, AvatarGroup, CardActionArea, Stack } from "@mui/material";

interface ForumCardProps {
  img: any;
  title: any;
  date: string;
  action: () => void;
  people: Array<any>;
  description: string;
}

export const ForumCard = ({
  img,
  action,
  title,
  date,
  people,
  description,
}: ForumCardProps) => {
  return (
    <Card
      onClick={action}
      sx={{
        maxWidth: 345,
        height: "100%",
        position: "relative",
        overflow: "visible",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        borderRadius: "10px",
        transition: "all .3s ease-in-out",
        ":hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: " column",
          height: "100%",
        }}
      >
        <CardMedia
          loading="lazy"
          component="img"
          height="100"
          image={img}
          alt="green iguana"
          sx={{
            width: "90%",
            position: "absolute",
            top: -30,
            left: 10,
            right: 10,
            margin: "auto",
            zIndex: 1,
            borderRadius: "10px",
            // px: 2,
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px !important",
            // ":hover": {
            //   transform: "translateY(-20%)",
            // },
          }}
        />
        <CardContent
          sx={{
            mt: 9,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Typography
            fontSize={"small"}
            fontWeight={600}
            gutterBottom
            component="div"
          >
            {title}
          </Typography>
          <Typography
            color={"text.secondary"}
            fontSize={"small"}
            gutterBottom
            component="div"
          >
            Created On: {date}
          </Typography>

          <Typography
            mt={1}
            variant="body2"
            color="text.secondary"
            textAlign={"justify"}
          >
            {description}
          </Typography>
          <AvatarGroup
            max={4}
            sx={{
              mt: 1,
              height: "100%",
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            {people?.map((p: any, index) => (
              <Avatar key={index} alt="Remy Sharp" src={p} />
            ))}
          </AvatarGroup>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
