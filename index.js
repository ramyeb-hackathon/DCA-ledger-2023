const express = require('express');
const Web3 = require('web3');
const web3 = new Web3('https://eth-sepolia.g.alchemy.com/v2/BTfPSsKzac-QCKX4ydep7MfU-jyAYzUB');
const cron = require('node-cron');
const fs = require('fs');

const abiPath = 'abi.json';
const abiContent = fs.readFileSync(abiPath, 'utf8');
const SmartContractABI = JSON.parse(abiContent);
const SmartContractAddress = "0x93A8672e1097D17e850417aC5d56bd38AA8DaE1c";

const app = express();
const port = process.env.PORT || 3000;


const callSC = async () => {
  console.log("In function callSC");

  const myContract = new web3.eth.Contract(SmartContractABI, SmartContractAddress);
  const result = await myContract.methods.name().call();

  console.log(result);
  console.log("Done with this");

}

cron.schedule('*/10 * * * * *', () => {
  console.log('running a task every 10 seconds : ');
  callSC();
});

app.listen(port);
console.log('listening on', port);