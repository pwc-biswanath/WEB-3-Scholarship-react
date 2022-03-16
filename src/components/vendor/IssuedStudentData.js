import * as React from "react";
import Table from "react-bootstrap/Table";
import Title from "./Title";
import LinearProgress from "@mui/material/LinearProgress";

export default function IssuedStudentData({ title, issueDevice, start }) {
  return (
    <React.Fragment>
      {start && <LinearProgress color="secondary" />}
      <a
        href={`https://rinkeby.etherscan.io/address/0x8d7a184f034e21d59a6456431e0fe742a0b87727#internaltx`}
        target="_blank"
        rel="noreferrer"
      >
        <h5 style={{ float: "right", fontSize: 15 }}>View Transactions</h5>
      </a>

      <Title>{title}</Title>

      <Table
        striped
        hover
        style={{ backgroundColor: "rgb(245 245 245)", color: "black" }}
      >
        <thead style={{ backgroundColor: "#e08912", color: "#fff" }}>
          <tr>
            <th>#ID</th>
            <th>Name</th>
            <th>Vendor</th>

            <th>Roll No</th>
            <th>IMEI No</th>
            <th>Amount</th>
            <th>Remark</th>
          </tr>
        </thead>
        <tbody style={{ backgroundColor: "rgb(245 245 245)", color: "black" }}>
          {!start && issueDevice.length === 0 && (
            <tr>
              <td colSpan={7} align="center">
                No data available!
              </td>
            </tr>
          )}

          {issueDevice &&
            issueDevice?.map((row, key) => {
              return (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{row?.name}</td>
                  <td>{row?.vendorName}</td>
                  <td>{row?.rollNo}</td>
                  <td>{row?.deviceIMEI}</td>

                  <td>
                    {parseFloat(row?.amount / 1000000000000000000).toFixed(2)}
                    <b> ETH</b>
                  </td>
                  <td>{row?.remark}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </React.Fragment>
  );
}
