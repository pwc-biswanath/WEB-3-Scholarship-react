import React, { useState, useContext } from "react";
import Form from "./Form";
import web3 from "../web3";
import lottery from "../contract/Scholarship";
import { AccountContest } from "../App";
import swal from "sweetalert";
import LinearProgress from "@mui/material/LinearProgress";

const StudentRegistration = () => {
  const account = useContext(AccountContest);
  const [start, setStart] = useState(false);

  const getDataFromDatabase = (name, uniqueNo) => {
    fetch("http://localhost:6060/posts")
      .then((res) => res.json())
      .then((json) => {
        const validateStudent = json.data.find(
          (data) => data.uniqueNo === uniqueNo
        );
        if (validateStudent) {
          submitForm(name, uniqueNo, validateStudent?.score);
        } else {
          swal("Sorry you are not validated", {
            icon: "error",
          });
        }
      });
  };

  const submitForm = async (name, uniqueNo, score) => {
    setStart(true);
    await lottery.methods
      .register(name, Number(uniqueNo), Number(score))
      .send({
        from: account[0],
        value: 0,
      })
      .then((data) => {
        swal("Amount successfully transfered", {
          icon: "success",
        });
        setStart(false);
      })
      .catch((error) => {
        swal(error.message, {
          icon: "error",
        });
        setStart(false);
      });
  };
  return (
    <>
      {start && <LinearProgress color="secondary" />}

      <Form submitForm={getDataFromDatabase} />
    </>
  );
};
export default StudentRegistration;
