
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

