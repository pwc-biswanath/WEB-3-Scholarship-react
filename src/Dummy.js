import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import web3 from "./web3";
import lottery from "./contract/Scholarship";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TopBar from "./components/TopBar";
import Players from "./components/Players";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CircularProgress from "@mui/material/CircularProgress";

const App = () => {
  const [manager, setManager] = useState(null);
  const [player, setPlayer] = useState([]);
  const [balance, setBalance] = useState(null);
  const [account, setaccount] = useState(null);
  const [message, setMessage] = useState(null);
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState(false);
  const [winnerAddress, setWinnerAddress] = useState(null);

  async function fetchData() {
    const accounts = await web3.eth.getAccounts();
    setaccount(accounts);

    const manager = await lottery.methods.manager().call();
    setManager(manager);

    const players = await lottery.methods.getPlayers().call();
    setPlayer(players);

    const studentList = await lottery.methods.getListOfStudents().call();

    const balance = await web3.eth.getBalance(lottery.options.address);
    setBalance(balance);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const enterToLottery = async () => {
    setStart(true);
    setEnd(false);
    setMessage(null);
    await lottery.methods
      .register("Biswanath Dsa", 124, 134)
      .send({
        from: account[0],
        value: 100000000000000000,
      })
      .then((data) => {
        setStart(false);
        setEnd(true);
        fetchData();
      })
      .catch((error) => {
        setStart(false);
        setMessage(error.message);
      });
  };

  const winner = async () => {
    setStart(true);
    setEnd(false);
    await lottery.methods
      .pickWinner()
      .send({
        from: account[0],
      })
      .then(async (data) => {
        setStart(false);
        setEnd(true);

        const account = await lottery.methods.getWinner().call();
        setWinnerAddress(account);
        fetchData();
      })
      .catch((error) => {
        setStart(false);
        setMessage(error.message);
      });
  };

  return (
    <>
      <TopBar manager={manager} />
      {start && (
        <Alert severity="info">
          <AlertTitle>Please Wait</AlertTitle>
          Your transction is in progress —{" "}
          <strong>
            {" "}
            <CircularProgress />
          </strong>
        </Alert>
      )}

      {message && (
        <Alert severity="error">
          <AlertTitle>Sorry</AlertTitle>
          {message}
        </Alert>
      )}

      {end && (
        <Alert severity="success">Your transction processed successfully</Alert>
      )}

      {winnerAddress && (
        <Alert severity="success">
          Winner is {winnerAddress}. Amount has transfered
        </Alert>
      )}

      <div className="App">
        <center>
          <p>
            <h5 style={{ color: "grey" }}>
              My account: {account && account[0]}
            </h5>
            <h1>
              Winning amount{" "}
              <b style={{ color: "#ff8f00" }}>
                {balance / 1000000000000000000} ETH
              </b>
            </h1>
          </p>
          <ButtonGroup>
            <Button
              variant="contained"
              onClick={(e) => enterToLottery()}
              style={{ marginRight: 10 }}
            >
              Enrole yourself with 0.10 ETH
            </Button>
            {account && account[0] === manager && (
              <Button variant="outlined" onClick={(e) => winner()}>
                Pick Winner
              </Button>
            )}
          </ButtonGroup>

          <Players player={player} />
        </center>

        <br />
        <br />
      </div>
    </>
  );
};
export default App;
