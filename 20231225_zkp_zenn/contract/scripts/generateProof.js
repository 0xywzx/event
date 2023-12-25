const merkleTree = require('fixed-merkle-tree');
const snarkjs = require('snarkjs');
const fs = require("fs");

const { getRowValueFromCsv } = require('./csv');
const question = require("./question");

const MERKLE_TREE_HEIGHT = 20;

const generateProof = async () => {

  const leafIndex = await question("Your index : ");
  const secret = await question("Your secret : ");

  const leaves = getRowValueFromCsv("../configs/leaves.csv", "value");

  console.log("-> Creating merkle proof... Your path is", leafIndex);
  const tree = new merkleTree(MERKLE_TREE_HEIGHT, leaves);
  const root = tree.root();
  const { pathElements, pathIndices } = tree.path(leafIndex);

  console.log("-> Creating proof...")
  const { proof, publicSignals } = await snarkjs.groth16.fullProve(
    {
      "root": root,
      "secretHash": leaves[leafIndex],
      "secret": secret,
      "pathElements": pathElements,
      "pathIndices": pathIndices
    },
    "../circom/circuit_js/circuit.wasm",
    "../circom/circuit_final.zkey"
  );

  console.log("-> Verifying proof...")
  const vKey = JSON.parse(fs.readFileSync("../circom/verification_key.json"));
  const res = await snarkjs.groth16.verify(vKey, publicSignals, proof);
  if (res === true) {
    console.log("-> Verification succeed !!!!!!!");
  } else {
    console.log("-> Invalid proof");
    process.exit(0);
  }

  const solidityCallData = await snarkjs.groth16.exportSolidityCallData(
    proof,
    publicSignals
  );
  const jsonData = JSON.parse(`[${solidityCallData}]`);
  console.log("Please use this calldata for on-chain verification");
  console.log("_pA", JSON.stringify(jsonData[0]));
  console.log("_pB", JSON.stringify(jsonData[1]));
  console.log("_pC", JSON.stringify(jsonData[2]));
  console.log("_pubSignals", JSON.stringify(jsonData[3]));

  return jsonData
}

module.exports = generateProof;
// generateProof().then(() => {
//   process.exit(0);
// });