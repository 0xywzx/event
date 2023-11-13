pragma circom 2.0.0;

include "./node_modules/circomlib/circuits/bitify.circom";
include "./node_modules/circomlib/circuits/pedersen.circom";
include "merkleTree.circom";

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

template Main(levels) {
    signal input root;
    signal input secretHash;
    signal input secret;
    signal input pathElements[levels];
    signal input pathIndices[levels];

    component hasher = SecretHasher();
    hasher.secret <== secret;
    secretHash === hasher.secretHash;

    component tree = MerkleTreeChecker(levels);
    tree.leaf <== hasher.secretHash;
    tree.root <== root;
    for (var i = 0; i < levels; i++) {
        tree.pathElements[i] <== pathElements[i];
        tree.pathIndices[i] <== pathIndices[i];
    }
}

component main {public [root, secretHash]} = Main(20);