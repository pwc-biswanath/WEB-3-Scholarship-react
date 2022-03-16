import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export default function AlignItemsList({ player }) {
  return (
    <List sx={{ maxWidth: 360, bgcolor: "background.paper" }}>
      {player.map((data, index) => {
        return (
          <ListItem alignItems="flex-start" key={"val_" + index}>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={data}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  ></Typography>
                  {` — Player no ${index + 1}`}
                </React.Fragment>
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
}
