const snarkjs = require('snarkjs');
const crypto = require('crypto');
const circomlib = require('circomlib');

/** Generate random number of specified byte length */
const rbigint = (nbytes) => snarkjs.bigInt.leBuff2int(crypto.randomBytes(nbytes));

/** Compute pedersen hash */
const pedersenHash = (data) => circomlib.babyJub.unpackPoint(circomlib.pedersenHash.hash(data))[0];


const main = () => {
  const secret = rbigint(31);
  // const secret = snarkjs.bigInt.leBuff2int(Buffer.from("aaa", 'utf8'));;
  const hash = pedersenHash(secret.leInt2Buff(31));

  console.log({secret, hash})
}

main();