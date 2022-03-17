import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import swal from "sweetalert";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  GetContractBalance,
  BlockChatinEnterTransction,
} from "../ABI-connect/connect";
import TransctionModal from "./shared/TransctionModal";

const LoginSchema = Yup.object().shape({
  number: Yup.string().trim().required("Amount is required"),
});

const FormUI = () => {
  const [balance, setBalance] = useState(null);
  const [start, setStart] = useState(false);
  const [response, setResponse] = useState(null);

  async function fetchData() {
    setStart(true);
    const balance = await GetContractBalance();
    setBalance(balance);
    setStart(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const inititate = async (number) => {
    setStart(true);
    const responseData = await BlockChatinEnterTransction(number);
    setResponse(responseData);
    fetchData();
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
      {start && <TransctionModal response={response} />}

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
      </Container>
    </>
  );
};

export default FormUI;
