import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import swal from "sweetalert";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Card, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

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

const VendorSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  registration_no: Yup.string().trim().required("registration no is required"),
  address: Yup.string().trim().required("Address is required"),
  pincode: Yup.number().required("Pincode no is required"),
});

const VendorForm = ({ submitForm, start }) => {
  const classes = useStyles();

  const saveData = (value) => {
    const { name, registration_no, address, pincode } = value;

    swal({
      title: "Are you sure?",
      text: "Want to submit the form !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        submitForm(name, registration_no, address, pincode);
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
              Vendor Registration
            </Typography>
            <div
              className="p-8 h-full"
              style={{ justifyContent: "center", padding: "20px" }}
            >
              <Formik
                initialValues={{
                  name: "",
                  registration_no: "",
                  address: "",
                  pincode: "",
                }}
                validationSchema={VendorSchema}
                onSubmit={(values, { setSubmitting }) => {
                  saveData(values);
                  setSubmitting(false);
                }}
              >
                {({ touched, errors, isSubmitting }) => (
                  <Form>
                    <div className="form-group">
                      <label htmlFor="name">Vendor Name</label>
                      <Field
                        type="text"
                        name="name"
                        autoComplete="flase"
                        placeholder="Enter Vendor Name"
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
                      <label htmlFor="name">Registration No</label>
                      <Field
                        type="text"
                        name="registration_no"
                        autoComplete="flase"
                        placeholder="Enter registration No"
                        className={`form-control text-muted ${
                          touched.registration_no && errors.registration_no
                            ? "is-invalid"
                            : ""
                        }`}
                      />

                      <ErrorMessage
                        component="div"
                        name="registration_no"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="name">Address</label>
                      <Field
                        type="text"
                        name="address"
                        autoComplete="flase"
                        placeholder="Enter registration No"
                        className={`form-control text-muted ${
                          touched.address && errors.address ? "is-invalid" : ""
                        }`}
                      />

                      <ErrorMessage
                        component="div"
                        name="address"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="name">Pincode</label>
                      <Field
                        type="text"
                        name="pincode"
                        autoComplete="flase"
                        placeholder="Enter Pincode"
                        className={`form-control text-muted ${
                          touched.pincode && errors.pincode ? "is-invalid" : ""
                        }`}
                      />

                      <ErrorMessage
                        component="div"
                        name="pincode"
                        className="invalid-feedback"
                      />
                    </div>

                    <span className="input-group-btn">
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

export default VendorForm;
