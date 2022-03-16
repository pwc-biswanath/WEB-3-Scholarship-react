import React, { useContext, useState, useEffect } from "react";
// import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import swal from "sweetalert";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import lottery from "../contract/Scholarship";
import { AccountContest } from "../App";
import web3 from "../web3";
import LinearProgress from "@mui/material/LinearProgress";
import TransctionList from "./TransctionList";

const LoginSchema = Yup.object().shape({
  number: Yup.string().trim().required("Amount is required"),
});

const FormUI = () => {
  const account = useContext(AccountContest);
  const [balance, setBalance] = useState(null);
  const [start, setStart] = useState(false);
  const [depositors, setDepositors] = useState(null);

  async function fetchData() {
    setStart(true);
    const balance = await web3.eth.getBalance(lottery.options.address);
    setBalance(balance);

    const depositors = await lottery.methods.getListOfDepositors().call();
    setDepositors(depositors);

    setStart(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const inititate = async (number) => {
    setStart(true);
    await lottery.methods
      .enter()
      .send({
        from: account[0],
        value: number,
      })
      .then((data) => {
        swal("Process successfully completed", {
          icon: "success",
        });
        fetchData();
      })
      .catch((error) => {
        swal(error.message, {
          icon: "error",
        });
        setStart(false);
      });
  };

  const saveData = (value) => {
    const { number } = value;
    swal({
      title: "Are you sure?",
      text: "Want to do the recharge !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        inititate(number * 1000000000000000000);
      }
    });
  };

  return (
    <>
      {start && <LinearProgress color="secondary" />}

      <Container
        style={{
          //   backgroundImage: "url(" + loginImg + ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          // height: "87vh",
          display: "grid",
          placeContent: "center",
        }}
        fluid
      >
        <center>
          <p>
            <br />

            <h1>
              Current Contract Balance :{" "}
              <b style={{ color: "#ff8f00" }}>
                {parseFloat(balance / 1000000000000000000).toFixed(2)} ETH
              </b>
            </h1>
          </p>
        </center>

        <Row>
          <Col
            style={{
              border: "1px solid #8080804f",
              padding: 25,
              backgroundColor: "white",
            }}
          >
            <div className="col-lg-12">
              <Formik
                initialValues={{
                  number: "",
                }}
                validationSchema={LoginSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  saveData(values);
                  setSubmitting(false);
                  resetForm();
                }}
              >
                {({ touched, errors, isSubmitting }) => (
                  <Form>
                    <div className="form-group">
                      <label htmlFor="number">Amount (ETH)</label>
                      <Field
                        type="number"
                        name="number"
                        autoComplete="flase"
                        placeholder="Enter Amount"
                        className={`form-control text-muted ${
                          touched.number && errors.number ? "is-invalid" : ""
                        }`}
                      />

                      <ErrorMessage
                        component="div"
                        name="number"
                        className="invalid-feedback"
                      />
                    </div>

                    <span class="input-group-btn">
                      <input
                        class="btn btn-default btn-primary"
                        type="submit"
                        value={start ? "Please wait ..." : "Add to contract"}
                        disabled={start}
                      />
                    </span>
                  </Form>
                )}
              </Formik>
            </div>
          </Col>
        </Row>
        {/* <Row style={{ marginTop: 30 }}>
          <Col>
            <h3>Transctions </h3>
            <p>List of amount deposit</p>
            <TransctionList depositors={depositors} />
          </Col>
        </Row> */}
      </Container>
    </>
  );
};

export default FormUI;
