import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import IssuedStudentData from "../vendor/IssuedStudentData";
import AdminHeader from "./AdminHeader";
import { BlockChatinGetData } from "../../ABI-connect/connect";

const theme = createTheme();
export default function AllIssuedList() {
  const [issueDevice, setIssueDevice] = useState([]);
  const [start, setStart] = useState(false);
  useEffect(() => {
    fetchStudentData();
  }, []);

  async function fetchStudentData() {
    setStart(true);
    const deviceIssue = await BlockChatinGetData("getListOfDeviceIssue");
    setIssueDevice(deviceIssue);
    setStart(false);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AdminHeader name={""} />
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
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <IssuedStudentData
                    title="All Iussed Device List"
                    issueDevice={issueDevice}
                    start={start}
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
