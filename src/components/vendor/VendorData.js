import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Title from "../vendor/Title";
import { Button } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { BlockChatinTransction } from "../../ABI-connect/connect";
import TransctionModal from "../shared/TransctionModal";

export default function VendorData({
  title,
  vendorData,
  fetchVendorData,
  pending,
}) {
  const [start, setStart] = useState(false);
  const [response, setResponse] = useState(null);
  const activateVendor = async (index) => {
    setStart(true);
    const responseData = await BlockChatinTransction("approveVendor", index);
    fetchVendorData();

    setResponse(responseData);
  };

  const deActivateVendor = async (index) => {
    setStart(true);
    const responseData = await BlockChatinTransction("rejectVendor", index);
    fetchVendorData();

    setResponse(responseData);
  };

  return (
    <React.Fragment>
      {start && <TransctionModal response={response} />}
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
            <th>Registration Number</th>
            <th>Earning</th>
            <th>Address</th>
            <th>Pincode</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody style={{ backgroundColor: "rgb(245 245 245)", color: "black" }}>
          {!pending && vendorData.length === 0 && (
            <tr>
              <td colSpan={7} align="center">
                No Vendor available!
              </td>
            </tr>
          )}

          {vendorData &&
            vendorData?.map((row, key) => {
              return (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{row?.name}</td>
                  <td>{row?.registrationNo || "NA"}</td>
                  <td>
                    {parseFloat(row?.amount / 1000000000000000000).toFixed(2)}{" "}
                    ETH
                  </td>
                  <td>{row?.vendorAddress}</td>
                  <td>{row?.pincode}</td>
                  <td align="right">
                    {!row?.status ? (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => activateVendor(row?.slNo)}
                      >
                        Approve
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => deActivateVendor(row?.slNo)}
                      >
                        In-active
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </React.Fragment>
  );
}
