require('dotenv').config()
const Web3 = require('web3');
const EthereumTx = require('ethereumjs-tx').Transaction;

const privatekey = process.env.PRIVATEKEY;
const rpc = "https://eth-goerli.g.alchemy.com/v2/wqs_4vhDYjGUMKyt2joL59W0HBlsB6O8";
const contractAddress = "0xF76880166e54e31b199fEa5961Af7f4F03a8360d";
const toAddress = "0x021006653ceDF465cA40AAc1dea57Bea241cdA6F";
const amount = "10000000000000000";

async function app() {

  let web3 = await new Web3(new Web3.providers.HttpProvider(rpc));

  const address = await web3.eth.accounts.privateKeyToAccount('0x' + privatekey).address
  await web3.eth.accounts.wallet.add({
    privateKey: privatekey,
    address: address
  })

  let contractABI = [
    {"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function","signature":"0xa9059cbb"},
  ]

  const contract = await new web3.eth.Contract(contractABI, contractAddress);

  let details = {
    nonce: await web3.utils.toHex(await web3.eth.getTransactionCount(address, 'pending')),
    gasPrice: await web3.utils.toHex("2000000000"),
    gasLimit: await web3.utils.toHex("500000"),
    to: contractAddress,
    from: address,
    data: await contract.methods.transfer(toAddress, amount).encodeABI(),
    type: "0"
  };

  console.log("----- details -----\n", details);

  let transaction = new EthereumTx(details, { chain: 'goerli' });
  transaction.sign(Buffer.from(privatekey, 'hex'));

  let rawdata =  transaction.serialize().toString('hex');
  console.log("----- data -----\n", rawdata);

  await web3.eth.sendSignedTransaction('0x' + rawdata)
    .once('transactionHash', async (txhash) => {
      console.log("----- txhash -----\n", txhash);
    })
    .on('confirmation', async function(confirmationNumber, receipt){
      console.log("Confirmation : ", confirmationNumber);
      if (confirmationNumber == 3) {
        console.log(await web3.eth.getTransactionReceipt(receipt.transactionHash));
      }
    })

}

app()
