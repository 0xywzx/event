const merkleTree = require('fixed-merkle-tree');
const snarkjs = require('snarkjs');
const crypto = require('crypto');
const circomlib = require('circomlib');
const fs = require("fs");

/** Generate random number of specified byte length */
const rbigint = (nbytes) => leBuff2int(crypto.randomBytes(nbytes));

/** Compute pedersen hash */
const pedersenHash = (data) => circomlib.babyJub.unpackPoint(circomlib.pedersenHash.hash(data))[0];

const MERKLE_TREE_HEIGHT = 20;
const leafIndex = 3; // todo: 選択できるようにする

// const bigInt = require("big-integer");
// ----------------
// https://github.com/tornadocash/snarkjs/blob/master/src/bigint.js
let wBigInt;
const leBuff2int = (buff) => {
  wBigInt = BigInt;
  wBigInt.zero = wBigInt(0);

  let res = wBigInt.zero;
  for (let i=0; i<buff.length; i++) {
      const n = wBigInt(buff[i]);
      res = res.add(n.shl(i*8));
  }
  return res;
};

const leInt2Buff = (n, len) => {
  wBigInt = BigInt;
  wBigInt.zero = wBigInt(0);

  let r = n;
  let o =0;
  const buff = Buffer.alloc(len);
  while ((r.greater(wBigInt.zero))&&(o<buff.length)) {
      let c = Number(r.and(wBigInt("255")));
      buff[o] = c;
      o++;
      r = r.shr(8);
  }
  if (r.greater(wBigInt.zero)) throw new Error("Number does not feed in buffer");
  return buff;
};
// -----------------

const generateMerkleProof = async () => {

  console.log("-> Creating random secret....")
  const secrets = [];
  const leaves = [];
  for (let i = 0; i < 20; i++) {
    const secret = rbigint(31);
    const hash = pedersenHash(leInt2Buff(secret, 31));
    secrets.push(secret);
    leaves.push(hash);
  }
  console.log("Secret :", secrets[leafIndex]);
  console.log("Secret hash :", leaves[leafIndex]);

  console.log("-> Creating merkle proof... Your path is", leafIndex);
  const tree = new merkleTree(MERKLE_TREE_HEIGHT, leaves);
  const root = tree.root();
  const { pathElements, pathIndices } = tree.path(leafIndex);

  console.log("-> Creating proof...")
  const { proof, publicSignals } = await snarkjs.groth16.fullProve(
    {
      "root": root,
      "secretHash": leaves[leafIndex],
      "secret": secrets[leafIndex],
      "pathElements": pathElements,
      "pathIndices": pathIndices
    },
    "../circom/circuit_js/circuit.wasm",
    "../circom/circuit_final.zkey"
  );

  console.log("-> Verifying proof...")
  const vKey = JSON.parse(fs.readFileSync("verification_key.json"));
  const res = await snarkjs.groth16.verify(vKey, publicSignals, proof);
  if (res === true) {
    console.log("-> Verification OK !!!!!!!");
  } else {
    console.log("-> Invalid proof");
    process.exit(0);
  }

  const solidityCallData = await snarkjs.groth16.exportSolidityCallData(
    proof,
    publicSignals
  );

  console.log("If you want to verify on-chain. Please use this calldata :", solidityCallData);
  console.log("Happy zk life.")
}

generateMerkleProof().then(() => {
  process.exit(0);
});