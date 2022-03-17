import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AdminHeader from "./AdminHeader";
import TransctionList from "../TransctionList";
import { BlockChatinGetData } from "../../ABI-connect/connect";
import LinearProgress from "@mui/material/LinearProgress";
const theme = createTheme();

export default function AllTransaction() {
  const [start, setStart] = useState(false);
  const [depositors, setDepositors] = useState(null);

  async function fetchData() {
    setStart(true);

    const depositors = await BlockChatinGetData("getListOfDepositors");
    setDepositors(depositors);
    setStart(false);
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      {start && <LinearProgress color="secondary" />}
      <CssBaseline />
      <AdminHeader />
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
            py: 4,
            height: "90vh",
            overflow: "auto",
          }}
        >
          <Container maxWidth={false}>
            <Row style={{ marginTop: 30 }}>
              <Col>
                <h3>All Transctions </h3>
                <p>List Of Amount Deposit</p>
                <TransctionList depositors={depositors} />
              </Col>
            </Row>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
}
