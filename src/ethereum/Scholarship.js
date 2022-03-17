import web3 from "../web3";
import ContractJson from "./build/Scholarship.json";
import Address from "./address/Address.json";

export default new web3.eth.Contract(
  JSON.parse(ContractJson.interface),
  Address
);
