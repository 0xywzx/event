import RLP from 'rlp';
import Web3 from 'web3';

const txhash = "0x2a2a493613533004e3d5e6aa33a280e766f65730ff10656a5213259f47d244dd";
const rpc = "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
const web3 = new Web3(
  new Web3.providers.HttpProvider(rpc)
);

const main = async () => {
  let i;
  let data;
  let encoded;

  console.log('--------------------------');
  console.log('> 0x00 ~ 0x7f : single byte data');
  data = ['0x1', '0x10', '0x7f'];
  for (i = 0; i < data.length; i++) {
    encoded = Buffer.from(RLP.encode(data[i])).toString('hex');
    console.log("data:", data[i], "-> encoded:", encoded);
  }

  console.log('--------------------------');
  console.log('> 0x80 ~ 0xb7 : 0-55 bytes long string');
  data = ['0x80', 'dog', 'doge', 'dogdogedogdoge'];
  for (i = 0; i < data.length; i++) {
    encoded = Buffer.from(RLP.encode(data[i])).toString('hex');
    console.log("data:", data[i], "-> encoded:", encoded);
  }

  console.log('--------------------------');
  console.log('> 0xb8 ~ 0xBf : more than 55 bytes long string');
  data = [
    'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
    'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz'
  ]
  for (i = 0; i < data.length; i++) {
    encoded = Buffer.from(RLP.encode(data[i])).toString('hex');
    console.log("data:", data[i], "-> encoded:", encoded);
  }

  console.log('--------------------------');
  console.log('> 0xc0 ~ 0xf7 : the total payload of a list is 0-55 bytes long');
  data = ['0x1', '0x7f', 'doge'];
  encoded = Buffer.from(RLP.encode(data)).toString('hex');
  console.log("data:", data, "-> encoded:", encoded);

  console.log('--------------------------');
  console.log('> 0xf8 ~ 0xff : the total payload of a list is more than 55 bytes long');
  data = ['0x1', '0x7f', 'doge', 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz'];
  encoded = Buffer.from(RLP.encode(data)).toString('hex');
  console.log("data:", data, "-> encoded:", encoded);
  const tt = await composeTx(txhash)
  console.log(tt)
  console.log(await web3.eth.getTransaction(txhash));

  console.log('--------------------------');
  console.log('Generate transaction hash from rlp endoded transaction data');
  const rawTx = {
    chainId: '0x05',
    nonce: '0x04',
    maxPriorityFeePerGas: '0x59682f00',
    maxFeePerGas: '0x59682f12',
    gasLimit: '0xbe12',
    to: '0xf5de760f2e916647fd766B4AD9E85ff943cE3A2b',
    value: '0x',
    data: '0x095ea7b3000000000000000000000000b31913136db41a06c316b8d19b86bca36a42a126000000000000000000000000000000000000000000000000000000000013be0d',
    accessList: [],
    v: '0x01',
    r: '0x35e3d3c8d16c485dd361acef0576f4667efc9f2ce023327f677ae2669099ed91',
    s: '0x2f5d90de7a9e49b9782787c768c6f1141b38c19d69925291c04f2a0ee8e94f60'
  }

  console.log('Raw transaction', rawTx);

  const encodedTx = Buffer.from(RLP.encode(Object.values(rawTx))).toString('hex');
  console.log("encoded tx", encodedTx);

  const txhashFronTx = web3.utils.soliditySha3(
    "0x02" + encodedTx
  );
  console.log("txhash:", txhashFronTx);
};

main()


