import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

interface ScheduleListViewProps {
  data: Array<any>;
}

export const ScheduleListView = ({ data }: ScheduleListViewProps) => {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {data?.map((d: any, index) => (
        <React.Fragment key={d?.title}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Box
                sx={{
                  height: 20,
                  width: 20,
                  backgroundColor: "primary.main",
                  borderRadius: "100%",
                }}
              ></Box>
              {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
            </ListItemAvatar>
            <ListItemText
              primary={d?.title}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {/* {d?.title} */}
                  </Typography>
                  - {d?.description}
                </React.Fragment>
              }
            />
          </ListItem>
          {index + 1 !== data?.length && (
            <Divider variant="inset" component="li" />
          )}
        </React.Fragment>
      ))}
    </List>
  );
};
