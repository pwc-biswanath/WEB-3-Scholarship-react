import React, { Component } from "react";
// import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import swal from "sweetalert";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  number: Yup.string().trim().required("Unique no is required"),
});

const FormUI = ({ submitForm }) => {
  const saveData = (value) => {
    const { name, number } = value;
    swal({
      title: "Are you sure?",
      text: "Want to submit the form !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        submitForm(name, number);
      }
    });
  };

  return (
    <Container
      style={{
        //   backgroundImage: "url(" + loginImg + ")",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "87vh",
        display: "grid",
        placeContent: "center",
      }}
      fluid
    >
      <h4>Registration</h4>
      <p>Register yourself to get the amount</p>
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
                name: "",
                number: "",
              }}
              validationSchema={LoginSchema}
              onSubmit={(values, { setSubmitting }) => {
                saveData(values);
                setSubmitting(false);
              }}
            >
              {({ touched, errors, isSubmitting }) => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <Field
                      type="text"
                      name="name"
                      autoComplete="flase"
                      placeholder="Enter Full Name"
                      className={`form-control text-muted ${
                        touched.name && errors.name ? "is-invalid" : ""
                      }`}
                    />

                    <ErrorMessage
                      component="div"
                      name="name"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="number">Unique No</label>
                    <Field
                      type="number"
                      name="number"
                      autoComplete="flase"
                      placeholder="Enter contact Unique No"
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
                      value="Register"
                    />
                  </span>
                </Form>
              )}
            </Formik>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default FormUI;
