const message = ethers.utils.hexlify(ethers.utils.randomBytes(32));

const signature = await signer.signMessage(
  ethers.utils.arrayify(message)
);

const recoverdAddress = ethers.utils.verifyMessage(
  ethers.utils.arrayify(message),
  signature.hexlifysignature
);
