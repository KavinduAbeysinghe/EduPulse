import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  AvatarGroup,
  CardActionArea,
  Divider,
  IconButton,
  Stack,
} from "@mui/material";
import { CustomChip } from "../../components/chips/CustomChip";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

interface ModuleCardProps {
  img: any;
  title: any;
  code: string;
  lead: string;
  status: "active" | "inactive";
  date: string;
  action: () => void;
}

export const ModuleCard = ({
  img,
  code,
  lead,
  status,
  action,
  title,
  date,
}: ModuleCardProps) => {
  return (
    <Card
      onClick={action}
      sx={{
        maxWidth: 345,
        position: "relative",
        overflow: "visible",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        borderRadius: "10px",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="100"
          image="https://zeenea.com/wp-content/uploads/2023/01/databases-zeenea.jpg.webp"
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
        <CardContent sx={{ mt: 9 }}>
          <Typography
            fontSize={"small"}
            fontWeight={600}
            gutterBottom
            component="div"
          >
            {title}
          </Typography>
          <Stack direction={"column"} gap={1} mt={2}>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography
                fontSize={"small"}
                fontWeight={600}
                color={"text.secondary"}
              >
                CODE
              </Typography>
              <Typography fontSize={"small"}>{code}</Typography>
            </Stack>
            <Divider />
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography
                fontSize={"small"}
                fontWeight={600}
                color={"text.secondary"}
              >
                LEAD
              </Typography>
              <Typography fontSize={"small"}>{lead}</Typography>
            </Stack>
            <Divider />
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography
                fontSize={"small"}
                fontWeight={600}
                color={"text.secondary"}
              >
                CREATED DATE
              </Typography>
              <Typography fontSize={"small"}>{date}</Typography>
            </Stack>
            <Divider />
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography
                fontSize={"small"}
                fontWeight={600}
                color={"text.secondary"}
              >
                STATUS
              </Typography>
              {status === "active" ? (
                <CustomChip label={"Active"} type="success" />
              ) : (
                <CustomChip label={"Inactive"} />
              )}
            </Stack>
            <Divider />
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography
                fontSize={"small"}
                fontWeight={600}
                color={"text.secondary"}
              >
                COLLABORATORS
              </Typography>
              <AvatarGroup max={4}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                <Avatar
                  alt="Trevor Henderson"
                  src="/static/images/avatar/5.jpg"
                />
              </AvatarGroup>
            </Stack>
          </Stack>
          {/* <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
