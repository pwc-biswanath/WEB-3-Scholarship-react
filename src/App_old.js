import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import Dummy from "./Dummy";
import TopBar from "./components/TopBar";
import StudentRegistration from "./components/StudentRegistration";
import StartScholarship from "./components/StartScholarship";
import StudentList from "./components/StudentList";
import web3 from "./web3";
import lottery from "./contract/Scholarship";
import { Routes, Route, Link } from "react-router-dom";
export const AccountContest = React.createContext("light");

const App = () => {
  const [manager, setManager] = useState(null);
  const [account, setaccount] = useState(null);

  async function fetchData() {
    const accounts = await web3.eth.getAccounts();
    setaccount(accounts);

    const manager = await lottery.methods.manager().call();
    setManager(manager);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AccountContest.Provider value={account}>
      <TopBar manager={manager} />
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/register" element={<StudentRegistration />} />
        <Route path="/start" element={<StartScholarship />} />
        <Route path="/list" element={<StudentList />} />
      </Routes>
    </AccountContest.Provider>
  );
};
export default App;
