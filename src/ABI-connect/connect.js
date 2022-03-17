import React from "react";
import contract from "../contract/Scholarship";
import web3 from "../web3";

console.log("=============", contract);
const pickFunction = (service) => {
  switch (service) {
    case "studentRegistration":
      return contract.methods.registerStudent;

    case "vendorRegistration":
      return contract.methods.registerVendor;

    case "getListOfStudents":
      return contract.methods.getListOfStudents;

    case "getListOfVendors":
      return contract.methods.getListOfVendors;

    case "getListOfDeviceIssue":
      return contract.methods.getListOfDeviceIssue;

    case "approveVendor":
      return contract.methods.approveVendor;

    case "rejectVendor":
      return contract.methods.rejectVendor;

    case "issueNewDevice":
      return contract.methods.issueNewDevice;

    default:
  }
};

export const GetContractBalance = async () => {
  const balanceData = await web3.eth.getBalance(contract.options.address);
  return balanceData;
};

export const BlockChatinTransction = async (service, ...props) => {
  const callService = pickFunction(service);
  const accounts = await web3.eth.getAccounts();
  const responseData = await callService(...props)
    .send({
      from: accounts[0],
      value: 0,
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      const errorData = { error };
      return { error: errorData.error };
    });
  return responseData;
};

export const BlockChatinGetData = async (service) => {
  const callService = pickFunction(service);
  const data = await callService().call();
  return data;
};
