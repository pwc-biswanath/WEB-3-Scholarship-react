import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Title from "../vendor/Title";
import { Divider } from "@mui/material";
import StudentHeader from "./StudentHeader";
import IssuedStudentData from "../vendor/IssuedStudentData";
import LinearProgress from "@mui/material/LinearProgress";
import { BlockChatinGetData } from "../../ABI-connect/connect";

const theme = createTheme();
export default function StudentDetails() {
  const [studentData, setStudentData] = useState([]);
  const [issueDevice, setIssueDevice] = useState([]);
  const [start, setStart] = useState(false);

  const id = localStorage.getItem("studentID");

  useEffect(() => {
    fetchStudentData();
  }, []);

  async function fetchStudentData() {
    setStart(true);
    const students = await BlockChatinGetData("getListOfStudents");

    setStudentData(students[id]);
    filterIssueDeviceData();
  }

  async function filterIssueDeviceData() {
    setStart(true);
    const deviceIssue = await BlockChatinGetData("getListOfDeviceIssue");

    await setIssueDevice(deviceIssue);
    setStart(false);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StudentHeader name={""} />
      {start && <LinearProgress color="secondary" />}
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
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <Title>Student Details</Title>

                  <Divider sx={{ my: 1 }} />
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell>Name:</TableCell>
                        <TableCell>{studentData?.name}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Date Of birth:</TableCell>
                        <TableCell>{studentData?.dob}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Roll no:</TableCell>
                        <TableCell>{studentData?.rollNo}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Available balance:</TableCell>
                        <TableCell>
                          {parseFloat(
                            studentData?.amount / 1000000000000000000
                          ).toFixed(3)}{" "}
                          ETH
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          OTP{" "}
                          <small style={{ color: "red" }}>
                            [ Do not shere with anyone ]
                          </small>
                          :
                        </TableCell>
                        <TableCell>{studentData?.otp}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <IssuedStudentData
                    title="Iussed Device List"
                    issueDevice={issueDevice?.filter(
                      (data) => data.studentIndex === id
                    )}
                    back_url=""
                  />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
}
