const hre = require("hardhat");

const generateProof = require("./generateProof");
const question = require("./question");

async function main() {
  const contractAddress = await question("Contract address : ");
  const contract = await hre.ethers.getContractAt(
    "ZKDistributer",
    contractAddress
  );

  const proof = await generateProof();

  console.log("-> Start minting ...")
  const tx = await contract.safeMint(
    proof[0],
    proof[1],
    proof[2],
    proof[3],
  );
  console.log("-> Transaction hash :", tx.hash);
  console.log("-> Confirming the transaction...");

  await tx.wait(1);
  console.log("-> Transaction has been succeed")
}

main().then(() => {
  process.exit(0);
});
