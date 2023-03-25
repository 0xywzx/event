import { ethers } from "hardhat";
import * as dotenv from 'dotenv';
dotenv.config()

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC as string);
const mnemonic = process.env.MNEMONIC as string;

function getPath(pathIndex: number) {
  return `m/44'/60'/${String(pathIndex)}'/0/0`
}

async function main() {
  // let wallet
  let userAddress
  let userSigner
  let derivePath
  let tx
  let i
  let wallet
  let hdNode
  let toAddress

  // // Create random wallet -----------
  // const mnemonic = ethers.utils.entropyToMnemonic(ethers.utils.randomBytes(32));

  wallet = ethers.Wallet.fromMnemonic(
    mnemonic,
  );

  console.log("Mnemonic phrase :", mnemonic);
  console.log("Master Address : ", wallet.address);

  // set up gas
  for (i=1; i <= 2; i++) {

    hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic).derivePath(getPath(0));
    wallet = new ethers.Wallet(
      hdNode.privateKey,
      provider
    );
    console.log("Sending from :", wallet.address);

    // send gas
    hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic).derivePath(getPath(i));
    toAddress = hdNode.address;
    const amount = "0.01";

    tx = await wallet.sendTransaction({
      to: toAddress,
      value: ethers.utils.parseEther(amount),
      data: '0x',
      gasLimit: '21000'
    });
    console.log(`Sending ${amount} ETH to ${toAddress}`);
    console.log("Transaction Hash :", tx.hash);
    // Waiting for the transaction to be mined
    await tx.wait();
  };

  // execute transaction
  for (i=1; i <= 2; i++) {

    hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic).derivePath(getPath(i));
    wallet = new ethers.Wallet(
      hdNode.privateKey,
      provider
    );
    console.log("Execute from :", wallet.address);

    const contractAddress = ""
    const iface = new ethers.utils.Interface([
      'function transfer(address recipient, uint256 amount)'
    ]);
    const data = iface.encodeFunctionData('' , []);

    tx = await wallet.sendTransaction({
      to: toAddress,
      value: '0x',
      data: data,
    });
    console.log("Transaction Hash :", tx.hash);
    // Waiting for the transaction to be mined
    await tx.wait();
  };
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
