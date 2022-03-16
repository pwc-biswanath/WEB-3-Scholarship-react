import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import swal from "sweetalert";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Card, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { findByLabelText } from "@testing-library/react";

const useStyles = makeStyles(({ palette, ...theme }) => ({
  card: {
    maxWidth: 900,
    width: 500,
    borderRadius: 5,
    marginTop: "3rem",
    display: "flex",
    marginLeft: "33%",
  },
}));

const LoginSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  roll_no: Yup.string().trim().required("Roll no is required"),
  dob: Yup.string().trim().required("Date of Birth is required"),
});

const FormUI = ({ submitForm, start }) => {
  const classes = useStyles();

  const saveData = (value) => {
    const { name, roll_no, dob } = value;

    swal({
      title: "Are you sure?",
      text: "Want to submit the form !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        submitForm(name, roll_no, dob);
      }
    });
  };

  return (
    <div>
      <Card className={classes.card}>
        <Grid container>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Typography
              style={{ marginLeft: "15px", marginTop: "10px", padding: 3 }}
              component="h1"
              variant="h5"
            >
              Student Registration
            </Typography>
            <div
              className="p-4 h-full"
              style={{ justifyContent: "center", padding: "20px" }}
            >
              <Formik
                initialValues={{
                  name: "",
                  roll_no: "",
                  dob: "",
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
                      <label htmlFor="dob">Date Of Birth</label>
                      <Field
                        type="date"
                        name="dob"
                        autoComplete="flase"
                        placeholder="Enter DOB"
                        className={`form-control text-muted ${
                          touched.name && errors.name ? "is-invalid" : ""
                        }`}
                      />

                      <ErrorMessage
                        component="div"
                        name="dob"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="roll_no">Roll No</label>
                      <Field
                        type="number"
                        name="roll_no"
                        autoComplete="flase"
                        placeholder="Enter contact Roll No"
                        className={`form-control text-muted ${
                          touched.roll_no && errors.roll_no ? "is-invalid" : ""
                        }`}
                      />

                      <ErrorMessage
                        component="div"
                        name="roll_no"
                        className="invalid-feedback"
                      />
                    </div>

                    <span className="form-group">
                      <input
                        className="btn btn-default btn-primary"
                        type="submit"
                        value={"Submit"}
                      />
                    </span>
                  </Form>
                )}
              </Formik>
            </div>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default FormUI;
