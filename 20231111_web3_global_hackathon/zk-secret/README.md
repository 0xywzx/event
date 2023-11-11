# zk-Secret

## 準備

1. circomでcircuit(回路)の作成
2. circuitのcompile
3. Trusted Setup* (Power Of Tau, phase2)
4. Solidity Verifierの作成
5. Proofの生成
6. Proofの検証

### 1. circomでcircuit(回路)の作成

```
pragma circom 2.0.0;

include "./node_modules/circomlib/circuits/bitify.circom";
include "./node_modules/circomlib/circuits/pedersen.circom";

template SecretHasher() {
    signal input secret;
    signal output secretHash;

    component secretHasher = Pedersen(248);
    component secretBits = Num2Bits(248);

    secretBits.in <== secret;

    for (var i = 0; i < 248; i++) {
        secretHasher.in[i] <== secretBits.out[i];
    }

    secretHash <== secretHasher.out[0];
}

template Main() {
    signal input secretHash;
    signal input secret;

    component hasher = SecretHasher();
    hasher.secret <== secret;

    secretHash === hasher.secretHash;
}

component main {public [secretHash]} = Main();

```
-　


### 2. circuitのcompile

```
circom circuit.circom --r1cs --wasm --sym
```

### 3. Trusted Setup* (Power Of Tau, phase2)

#### Power of tau

```
// ceremonyの開始
snarkjs powersoftau new bn128 14 pot14_0000.ptau -v

// first contribution
snarkjs powersoftau contribute pot14_0000.ptau pot14_0001.ptau --name="First contribution" -v -e "random text"

・・・・

// power of tau の完成
snarkjs powersoftau beacon pot14_0003.ptau pot14_beacon.ptau 0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f 10 -n="Final Beacon"

// phase2の準備
snarkjs powersoftau prepare phase2 pot14_beacon.ptau pot14_final.ptau -v
```

#### phase 2
```
// setup
snarkjs groth16 setup circuit.r1cs pot14_final.ptau circuit_0000.zkey

// first contribute
snarkjs zkey contribute circuit_0000.zkey circuit_0001.zkey --name="1st Contributor Name" -v

・・・

// apply random beacon
snarkjs zkey beacon circuit_0003.zkey circuit_final.zkey 0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f 10 -n="Final Beacon phase2"

// export verification key
snarkjs zkey export verificationkey circuit_final.zkey verification_key.json

```

### 4. Solidity Verifierの作成

```
// inputの作成
cat <<EOT > input.json
{
  "secretHash": "6652720879077241532616383128614021269153945618627832693739893997014067042416",
  "secret": "47147923612045898161641070995147120065030130353900809301484784528935861854"
}
EOT

// witnessの作成
cd circuit_js
node generate_witness.js circuit.wasm ../input.json ../witness.wtns
cd ..

// proofの生成
snarkjs zkey export solidityverifier circuit_final.zkey verifier.sol
```

### 5. Proofの生成

```
snarkjs groth16 prove circuit_final.zkey witness.wtns proof.json public.json
```

### 6. Proofの検証

```
snarkjs zkey export soliditycalldata public.json proof.json
```