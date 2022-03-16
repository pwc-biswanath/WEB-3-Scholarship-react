import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { Avatar, ListItemAvatar } from "@mui/material";
import { BlockChatinGetData } from "../../ABI-connect/connect";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ openVendorModal, closeVendorModal }) {
  const [start, setStart] = React.useState(false);
  const [vendorData, setVendorData] = React.useState([]);
  let history = useNavigate();
  const handleClose = () => closeVendorModal(false);

  React.useEffect(() => {
    fetchVendorData();
  }, []);

  async function fetchVendorData() {
    setStart(true);
    const vendorList = await BlockChatinGetData("getListOfVendors");
    const vendor = vendorList.filter((item) => item.status === true);

    setVendorData(vendor);
    setStart(false);
  }

  const login = (slNo) => {
    localStorage.setItem("vendorID", slNo);
    history("/vendor-dashboard");
  };

  return (
    <div>
      <Modal
        open={openVendorModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Select Vendor
          </Typography>
          {vendorData.length > 0
            ? vendorData.map((data) => {
                return (
                  <List>
                    <ListItem disablePadding>
                      <ListItemButton onClick={() => login(data?.slNo)}>
                        <ListItemAvatar>
                          <Avatar
                            style={{ backgroundColor: "#e78d13" }}
                          ></Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={data?.name} />
                      </ListItemButton>
                    </ListItem>
                  </List>
                );
              })
            : "Please wait..."}
        </Box>
      </Modal>
    </div>
  );
}
