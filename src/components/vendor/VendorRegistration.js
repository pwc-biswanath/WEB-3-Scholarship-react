import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@mui/material/LinearProgress";
import VendorForm from "./VendorForm";
import Home from "@mui/icons-material/Home";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { BlockChatinTransction } from "../../ABI-connect/connect";
import TransctionModal from "../shared/TransctionModal";

const useStyles = makeStyles(({ palette, ...theme }) => ({
  cardHolder: {
    background: "#f3f3f4",
    alignItems: "center",
    height: "90vh",
    overflow: "auto",
  },
}));

const VendorRegistration = () => {
  const classes = useStyles();

  const [start, setStart] = useState(false);
  const [response, setResponse] = useState(null);
  const submitForm = async (name, registrationNo, vendorAddress, pincode) => {
    setStart(true);
    const responseData = await BlockChatinTransction(
      "vendorRegistration",
      name,
      registrationNo,
      vendorAddress,
      pincode
    );
    setResponse(responseData);
  };

  return (
    <>
      {start && <TransctionModal response={response} />}
      <AppBar
        position="relative"
        style={{ backgroundColor: "#d25304", color: "#fff" }}
      >
        <Toolbar>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Home sx={{ mr: 2 }} style={{ color: "#fff" }} />
          </Link>
          <Typography variant="h6" color="inherit" noWrap>
            Welcome to E-Scholarship
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.cardHolder}>
        <VendorForm submitForm={submitForm} start={start} />
      </div>
    </>
  );
};
export default VendorRegistration;
