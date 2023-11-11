const snarkjs = require("snarkjs");
const fs = require("fs");

async function run() {
    const { proof, publicSignals } = await snarkjs.groth16.fullProve(
      {
        "secretHash": "6652720879077241532616383128614021269153945618627832693739893997014067042416",
        "secret": "47147923612045898161641070995147120065030130353900809301484784528935861854"
      },
      "circuit_js/circuit.wasm",
      "circuit_final.zkey"
    );

    console.log("Proof: ");
    console.log(JSON.stringify(proof, null, 1));

    const vKey = JSON.parse(fs.readFileSync("verification_key.json"));

    const res = await snarkjs.groth16.verify(vKey, publicSignals, proof);

    if (res === true) {
        console.log("Verification OK");
    } else {
        console.log("Invalid proof");
    }

    const solidityCallData = await snarkjs.groth16.exportSolidityCallData(
      proof,
      publicSignals
    )
    console.log("Call data for solidity verification:", solidityCallData);
}

run().then(() => {
    process.exit(0);
});