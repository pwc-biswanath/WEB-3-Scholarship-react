import React, { useState, useContext, useEffect } from "react";
import Form from "./Form";
import { makeStyles } from "@material-ui/core/styles";
import swal from "sweetalert";
import { AppBar, Toolbar } from "@mui/material";
import Home from "@mui/icons-material/Home";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  BlockChatinTransction,
  BlockChatinGetData,
} from "../../ABI-connect/connect";
import TransctionModal from "../shared/TransctionModal";

const useStyles = makeStyles(({ palette, ...theme }) => ({
  cardHolder: {
    background: "#f3f3f4",
    alignItems: "center",
    height: "90vh",
    overflow: "auto",
  },
}));

const StudentRegistration = () => {
  const classes = useStyles();

  const [start, setStart] = useState(false);
  const [response, setResponse] = useState(null);

  const getDataFromDatabase = (name, rollNo, dob) => {
    fetch("http://localhost:6060/posts")
      .then((res) => res.json())
      .then(async (json) => {
        const validateStudent = json.data.find(
          (data) => data.uniqueNo === rollNo
        );
        if (validateStudent) {
          setStart(true);
          const responseData = await BlockChatinTransction(
            "studentRegistration",
            name,
            rollNo,
            validateStudent?.score,
            dob
          );
          setResponse(responseData);
        } else {
          swal("Sorry you are not validated", {
            icon: "error",
          });
        }
      });
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  async function fetchStudentData() {
    const students = await BlockChatinGetData("getListOfStudents");
  }

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
        <Form submitForm={getDataFromDatabase} start={start} />
      </div>
    </>
  );
};
export default StudentRegistration;
