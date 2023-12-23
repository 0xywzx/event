const hre = require("hardhat");

const generateRoot = require('./generateRoot');

async function main() {

  const root = generateRoot();

  const VerifierContractFactory = await hre.ethers.getContractFactory("Groth16Verifier");
  const verifierContract = await VerifierContractFactory.deploy();

  const ContractFactory = await hre.ethers.getContractFactory("ZKDistributer");
  const contract = await ContractFactory.deploy(
    await verifierContract.getAddress(),
    root
  );

  console.log("Verifier Contract Address :", await  verifierContract.getAddress());
  console.log("ZKDistributer Contract Address :", await  contract.getAddress());

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
