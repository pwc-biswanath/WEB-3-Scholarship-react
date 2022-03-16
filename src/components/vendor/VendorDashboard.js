import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import VendorHeader from "./VendorHeader";
import VendorInfo from "./VendorInfo";
import { DashboardCard } from "../common/DashboadCard";
import { BlockChatinGetData } from "../../ABI-connect/connect";

const theme = createTheme();

export default function VendorDashboard(props) {
  const [vendorData, setVendorData] = useState([]);
  const id = localStorage.getItem("vendorID");

  useEffect(() => {
    fetchVendorData();
  }, []);

  async function fetchVendorData() {
    const vendorList = await BlockChatinGetData("getListOfVendors");

    vendorList[id] && setVendorData(vendorList[id]);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <VendorHeader name="" />
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
            <Grid container spacing={3}>
              <Grid item xl={4} lg={4} sm={4} xs={12}>
                <Container
                  maxWidth={false}
                  style={{ marginTop: 30, height: "100%" }}
                >
                  <center>
                    <VendorInfo vendorData={vendorData} />
                  </center>
                </Container>
              </Grid>

              <Grid item xl={6} lg={6} sm={6} xs={12}>
                <Grid item xl={3} lg={3} sm={6} xs={12}>
                  <DashboardCard
                    title="Total Issued Device"
                    image_index="3"
                    count="0"
                  />
                </Grid>
                <Grid item xl={3} lg={3} sm={6} xs={12}>
                  <DashboardCard
                    title="Earning"
                    image_index="4"
                    count={
                      parseFloat(
                        vendorData?.amount / 1000000000000000000
                      ).toFixed(2) + " ETH"
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
}
