import React from "react";
import Table from "react-bootstrap/Table";

const TransctionList = ({ depositors }) => {
  return (
    <Table striped
    hover
    style={{ backgroundColor: "rgb(245 245 245)", color: "black" }}>
      <thead style={{ backgroundColor: "#e08912", color: "#fff" }}>
        <tr>
          <th>#</th>
          <th>Address</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody style={{ backgroundColor: "rgb(245 245 245)", color: "black" }}>
        {depositors &&
          depositors.map((data, index) => {
            const { depositerAddress, amount } = data;
            return (
              <tr>
                <td>{index + 1}</td>

                <td>{depositerAddress}</td>
                <td>{amount / 1000000000000000000} ETH</td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};
export default TransctionList;
