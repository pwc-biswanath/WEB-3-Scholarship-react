import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "react-bootstrap/Table";
import Title from "../vendor/Title";
import { Button, Divider, TextField } from "@mui/material";
import VendorHeader from "./VendorHeader";
import AssignDevice from "./AssignDevice";
import { BlockChatinGetData } from "../../ABI-connect/connect";

const theme = createTheme();
export default function IssueDevice() {
  const [rollNo, setRollNo] = useState();
  const [studentList, setStudentList] = useState([]);
  const [student, setStudent] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [detailsIndex, setDetailsIndex] = useState("");

  useEffect(() => {
    fetchIssueDevice();
    fetchStudentData();
  }, []);

  async function fetchIssueDevice() {
    const listOfDeviceIssue = await BlockChatinGetData("getListOfDeviceIssue");
  }

  async function fetchStudentData() {
    const students = await BlockChatinGetData("getListOfStudents");
    setStudentList(students);
  }

  const findStudentByRoll = async () => {
    setIsSubmit(true);
    let newStudenList = studentList.filter((item) => item.rollNo == rollNo);

    await setStudent(newStudenList);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <VendorHeader name={""} />
      <main>
        {/* Hero unit */}
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "90vh",
            overflow: "auto",
            paddingBottom: 10,
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {detailsIndex === "" && (
                  <Grid container>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={6}>
                      <Paper
                        sx={{
                          p: 2,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Title>Issue Device</Title>
                        <Divider></Divider>
                        <div
                          style={{
                            padding: "35px",
                            borderRadius: "8px",
                          }}
                        >
                          <div className="form-group">
                            <TextField
                              id="outlined-basic"
                              name="roll"
                              label="Enter Roll no"
                              variant="outlined"
                              size="small"
                              onChange={(e) => setRollNo(e.target.value)}
                            />
                          </div>
                          <div>
                            <Button
                              variant="outlined"
                              onClick={findStudentByRoll}
                              className="btn btn-default btn-primary"
                            >
                              Search
                            </Button>
                          </div>
                        </div>
                      </Paper>
                    </Grid>
                    <Grid item xs={3}></Grid>
                  </Grid>
                )}
                {isSubmit && detailsIndex === "" && (
                  <Paper
                    sx={{
                      p: 2,
                      mt: 3,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Table
                      striped
                      hover
                      style={{
                        backgroundColor: "#e08912",
                        color: "black",
                      }}
                    >
                      <thead
                        style={{
                          backgroundColor: "#e08912",
                          color: "#fff",
                        }}
                      >
                        <tr>
                          <th>#ID</th>
                          <th>Name</th>
                          <th>Dob</th>
                          <th>Available Balance</th>
                          <th>Roll No</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody
                        style={{
                          backgroundColor: "rgb(245 245 245)",
                          color: "black",
                        }}
                      >
                        {student.length === 0 && (
                          <tr>
                            <td colSpan={7} align="center">
                              Student Details Not available!
                            </td>
                          </tr>
                        )}

                        {student &&
                          student?.map((row, key) => {
                            return (
                              <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{row.name}</td>
                                <td>{row.dob}</td>
                                <td>
                                  {parseFloat(
                                    row?.amount / 1000000000000000000
                                  ).toFixed(2)}{" "}
                                  ETH
                                </td>
                                <td>{row.rollNo}</td>

                                <td>
                                  <Button
                                    variant="contained"
                                    className="btn btn-default btn-primary"
                                    onClick={() => setDetailsIndex(row?.slNo)}
                                  >
                                    Issue
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </Table>
                  </Paper>
                )}

                {student.length !== 0 && detailsIndex != "" && (
                  <Paper
                    sx={{
                      p: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <AssignDevice
                      studentDetails={student[detailsIndex]}
                      setDetailsIndex={setDetailsIndex}
                    />
                  </Paper>
                )}
              </Grid>
            </Grid>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
}
