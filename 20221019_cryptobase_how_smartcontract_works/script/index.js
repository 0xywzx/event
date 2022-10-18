const Web3 = require('web3');
const EthereumTx = require('ethereumjs-tx').Transaction;

const rpc = "";
const contractAddress = "";
const privatekey = "";
const toAddress = "";
const amount = "";

async function app() {

  let web3 = await new Web3(new Web3.providers.HttpProvider(rpc.rinkeby));

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
    gasPrice: await web3.utils.toHex(await web3.eth.getGasPrice()),
    gasLimit: await web3.utils.toHex("500000"),
    to: contractAddress,
    from: address,
    data: await contract.methods.transfer(toAddress, amount).encodeABI(),
    type: "0"
  }

  let transaction = new EthereumTx(details, { chain: 'goerli' })
  transaction.sign(Buffer.from(privatekey, 'hex'))

  let rawdata =  transaction.serialize().toString('hex')

  await web3.eth.sendSignedTransaction('0x' + rawdata)
    .once('transactionHash', async (txhash) => {
      console.log("txhash", txhash)
    })
    .on('receipt', function(receipt){
      console.log("recipt", receipt)
    })
    .on('confirmation', async function(confirmationNumber, receipt){
      if (confirmationNumber == 1) {
        console.log(await web3.eth.getTransactionReceipt(receipt.transactionHash))
      }
    })

}

app()
