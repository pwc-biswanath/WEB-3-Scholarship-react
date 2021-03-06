const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/Scholarship.json");
const path = require("path");
const fs = require("fs-extra");

const provider = new HDWalletProvider(
  "frame wool share waste scare vivid fade link kite side poet about",
  // remember to change this to your own phrase!
  "https://rinkeby.infura.io/v3/3751b5f38fca4a718859e6760905f4a8"
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: "4700000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);

  const storeAddressPath = path.resolve(__dirname, "address");
  fs.removeSync(storeAddressPath);
  fs.ensureDirSync(storeAddressPath);
  fs.outputJsonSync(
    path.resolve(storeAddressPath, "Address.json"),
    result.options.address
  );

  provider.engine.stop();
};
deploy();
