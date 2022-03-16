import "./App.css";
import React, { useEffect, useState } from "react";
import StudentRegistration from "./components/student/StudentRegistration";
import web3 from "./web3";
import LandingPage from "./components/landing/LandingPage";
import { Routes, Route } from "react-router-dom";
import VendorRegistration from "./components/vendor/VendorRegistration";
import VendorPendingList from "./components/vendor/VendorPendingList";
import IssueDevice from "./components/vendor/IssueDevice";
import AssignDevice from "./components/vendor/AssignDevice";
import AdminDashboard from "./components/admin/AdminDashboard";
import VendorDashboard from "./components/vendor/VendorDashboard";
import VendorApprovedList from "./components/vendor/VendorApprovedList";
import StudentList from "./components/student/StudentList";
import StudentDetails from "./components/student/StudentDetails";
import VendorIssuedList from "./components/vendor/VendorIssuedList";
import StartScholarship from "./components/StartScholarship";
import AllIssuedList from "./components/admin/AllIssuedList";
import AdminWallet from "./components/admin/AdminWallet";
import AllTransaction from "./components/admin/AllTransaction";

export const AccountContest = React.createContext("light");

const App = () => {
  const [account, setaccount] = useState(null);
  async function fetchData() {
    const accounts = await web3.eth.getAccounts();
    setaccount(accounts);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AccountContest.Provider value={account}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/start" element={<StartScholarship />} />
        <Route path="/register" element={<StudentRegistration />} />
        <Route path="/vendor-register" element={<VendorRegistration />} />
        <Route path="/vendor-pending" element={<VendorPendingList />} />
        <Route path="/vendor-approved" element={<VendorApprovedList />} />
        <Route path="/issue-device" element={<IssueDevice />} />
        <Route path="/vendor-issued-list" element={<VendorIssuedList />} />
        <Route path="/assign-device/:id" element={<AssignDevice />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/vendor-dashboard" element={<VendorDashboard />} />
        <Route path="/student-list" element={<StudentList />} />
        <Route path="/student-details" element={<StudentDetails />} />
        <Route path="/all-issued-device" element={<AllIssuedList />} />
        <Route path="/admin-wallet" element={<AdminWallet/>} />
        <Route path="/all-transaction" element={<AllTransaction/>} />
      </Routes>
      <div></div>
      <div
        maxWidth="sm"
        style={{
          backgroundColor: "#8080807a",
          padding: 10,
          bottom: 0,
          position: "fixed",
          width: "100%",
        }}
      >
        <img src="/assets/images/pwc_logo.png" height="35px"></img>
      </div>
    </AccountContest.Provider>
  );
};
export default App;
