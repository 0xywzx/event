const ethers = require('ethers')
const { fromRpcSig } = require('ethereumjs-util');
const implementation = require('./abi/Implementation.json');

//ガス代がないけど送信したいアドレスの秘密鍵
const userPrivateKey = ""
//ガス代を負担するアドレスの秘密鍵
const privateKey = ""
const rpcUrl = ""
const to = ""

const chainId = 5

// proxy contract : JPYCv2 contract address
const verifyingContract = "0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB"
// implementation contract : logic contract address
const implementationAddress = "0xf2fab05f26dc8da5a3f24d015fb043db7a8751cf"

async function app() {

  const userSigner = new ethers.Wallet(
    userPrivateKey, new ethers.providers.JsonRpcProvider(rpcUrl))
  const from = await userSigner.getAddress()


  const nonce = ethers.utils.hexlify(ethers.utils.randomBytes(32))
  console.log(nonce)
  const value = ethers.utils.parseEther('100')
  const validAfter = 0
  const validBefore = ethers.constants.MaxUint256

  // ガス代がないけど送信したいアドレスで署名を作成する
  const domain = {
    name: "JPY Coin",
    version: "1",
    chainId,
    verifyingContract
  }

  const types = {
    TransferWithAuthorization: [
      { name: 'from', type: 'address' },
      { name: 'to', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'validAfter', type: 'uint256' },
      { name: 'validBefore', type: 'uint256' },
      { name: 'nonce', type: 'bytes32' },
    ]
  }

  const message = {
    from,
    to,
    value,
    validAfter,
    validBefore,
    nonce,
  }

  const signature = await userSigner._signTypedData(domain, types, message)
  const { v, r, s } = fromRpcSig(signature);

  // ガス代を負担するアドレスで署名したトランザクションを送信する
  const wallet = new ethers.Wallet(
    privateKey, new ethers.providers.JsonRpcProvider(rpcUrl));

  const implementationContract = new ethers.Contract(
    implementationAddress,
    implementation.abi,
    wallet
  );

  const proxyContract = implementationContract.attach(
    verifyingContract
  );

  const tx = await proxyContract.transferWithAuthorization(
    from, to, value, validAfter, validBefore, nonce, v, r, s
  )

  console.log(tx)

}

app()