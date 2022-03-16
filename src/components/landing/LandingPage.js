import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Home from "@mui/icons-material/Home";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ImageCard } from "../common/ImageCard";
import VendorListModal from "./VendorListModal";
import StudentListModal from "./StudentListModal";

const theme = createTheme();

export default function LandingPage() {
  const [openVendorModal, setOpenVendorModal] = React.useState(false);
  const [openStudentModal, setOpenStudentModal] = React.useState(false);
  const closeVendorModal = () => setOpenVendorModal(false);
  const closeStudentModal = () => setOpenStudentModal(false);

  return (
    <ThemeProvider theme={theme}>
      {openVendorModal && (
        <VendorListModal
          openVendorModal={openVendorModal}
          closeVendorModal={closeVendorModal}
        />
      )}
      {openStudentModal && (
        <StudentListModal
          openStudentModal={openStudentModal}
          closeStudentModal={closeStudentModal}
        />
      )}
      <CssBaseline />
      <AppBar
        position="relative"
        style={{ backgroundColor: "#d25304", color: "#fff" }}
      >
        <Toolbar>
          <Home sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Welcome to E-Scholarship
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            height:"90vh",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              E-SCHOLARSHIP
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Reach benifies directly to beneficiaries
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={1}
              justifyContent="center"
            >
              <div style={{ display: "inline-flex" }}>
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <ImageCard title="Student Register" image_index="0" />
                </Link>
                <Link to="/vendor-register" style={{ textDecoration: "none" }}>
                  <ImageCard title="Vendor Register" image_index="1" />
                </Link>
                <div onClick={() => setOpenVendorModal(true)}>
                  <ImageCard title="Vendor Dashboard" image_index="2" />
                </div>

                <Link to="/admin-dashboard" style={{ textDecoration: "none" }}>
                  <ImageCard title="Admin Dashboard" image_index="3" />
                </Link>
                <div onClick={() => setOpenStudentModal(true)}>
                  <ImageCard title="Student Dashboard" image_index="4" />
                </div>
              </div>
            </Stack>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
}
