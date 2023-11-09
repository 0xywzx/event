const poseidon = require("./poseidon");
const bigInt = require("snarkjs").bigInt;

exports.hash0 = function (left, right) {
    return poseidon([left, right]);
};

exports.hash1 = function(key, value) {
    return poseidon([key, value, bigInt.one]);
};
