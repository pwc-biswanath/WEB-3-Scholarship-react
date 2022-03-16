import * as React from "react";
import Table from "react-bootstrap/Table";
import Title from "../vendor/Title";
import LinearProgress from "@mui/material/LinearProgress";

export default function StudentData({ title, studentData, start }) {
  return (
    <React.Fragment>
      {start && <LinearProgress color="secondary" />}
      <Title>{title}</Title>

      <Table striped hover>
        <thead style={{ backgroundColor: "#e08912", color: "#fff" }}>
          <tr>
            <th>#ID</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Roll No</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody style={{ backgroundColor: "rgb(245 245 245)", color: "black" }}>
          {!start && studentData.length === 0 && (
            <tr>
              <td colSpan={7} align="center">
                No Student available!
              </td>
            </tr>
          )}

          {studentData &&
            studentData?.map((row, key) => {
              return (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{row.name}</td>
                  <td>{row.dob}</td>
                  <td>{row.rollNo}</td>
                  <td>
                    {parseFloat(row?.amount / 1000000000000000000).toFixed(2)}{" "}
                    ETH
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </React.Fragment>
  );
}
