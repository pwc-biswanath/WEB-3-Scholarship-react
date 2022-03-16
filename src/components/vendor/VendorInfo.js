import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {Avatar } from "@mui/material";

export default function BasicList({ vendorData }) {
  const {
    name,
    pincode,
    status,
    vendorAddress,
  } = vendorData;
  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <nav aria-label="main mailbox folders" style={{padding:20}}>
      <Avatar
            sx={{
              backgroundColor: '#e78d13',
              height: 60,
              width: 60,
              marginRight:1
            }}
          >
          </Avatar>
        <List style={{padding:20}}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>Name: </ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>Address: </ListItemIcon>
              <ListItemText primary={vendorAddress} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>Pin: </ListItemIcon>
              <ListItemText primary={pincode} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>Status: </ListItemIcon>
              <ListItemText primary={status ? "Active" : "Inactive"} />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}
