import web3 from "../web3";
import ContractJson from "../ethereum/build/Scholarship.json";

const address = "0x8d7a184F034e21D59A6456431e0FE742A0B87727";

export default new web3.eth.Contract(
  JSON.parse(ContractJson.interface),
  address
);
