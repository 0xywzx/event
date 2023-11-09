const chai = require("chai");
const path = require("path");
const snarkjs = require("snarkjs");
const compiler = require("circom");

const poseidon = require("../src/poseidon.js");

const assert = chai.assert;

describe("Poseidon Circuit test", function () {
    let circuit2;
    let circuit4;

    this.timeout(100000);

    before( async () => {
        const cirDef2 = await compiler(path.join(__dirname, "circuits", "poseidon2_test.circom"));
        const cirDef4 = await compiler(path.join(__dirname, "circuits", "poseidon4_test.circom"));

        circuit2 = new snarkjs.Circuit(cirDef2);
        circuit4 = new snarkjs.Circuit(cirDef4);
    });

    it("Should check constrain of hash([1, 2])", async () => {
        const hash = poseidon([1, 2]);
        assert.equal("0x11ad302b36a2d7e09653c8e90618f00c06cd0a7348e52cdf2ccced3c3abec679", "0x" + hash.toString(16));
        const w = await circuit2.calculateWitness({inputs: [1, 2]}, true);
        const res = w[circuit2.getSignalIdx("main.out")];
        assert.equal(res.toString(), hash.toString());
        await circuit2.checkWitness(w);
    });

    it("Should check constrain of hash([3, 4])", async () => {
        const hash = poseidon([3, 4]);
        assert.equal("0x23939f0972e764d6e252060279aabaca8ec650ab30b17d2c13551bec2a66bcef", "0x" + hash.toString(16));
        const w = await circuit2.calculateWitness({inputs: [3, 4]});
        const res = w[circuit2.getSignalIdx("main.out")];
        assert.equal(res.toString(), hash.toString());
        await circuit2.checkWitness(w);
    });


    it("Should check constrain of hash([1, 2, 3, 4])", async () => {
        const hash = poseidon([1, 2, 3, 4]);
        assert.equal("0x2e4fb80ce74868b0d33f4acb22071d8d8f8da7d30ebf972e6e4f72a64bb0633f", "0x" + hash.toString(16));
        const w = await circuit4.calculateWitness({inputs: [1, 2, 3, 4]});
        const res = w[circuit4.getSignalIdx("main.out")];
        assert.equal(res.toString(), hash.toString());
        await circuit4.checkWitness(w);
    });

    it("Should check constrain of hash([5, 6, 7, 8])", async () => {
        const hash = poseidon([5, 6, 7, 8]);
        assert.equal("0x2a3fc67aa97766917ee06e927f35fd70f4655ad6c1f2e7bcd5c5c85aa3a8a974", "0x" + hash.toString(16));
        const w = await circuit4.calculateWitness({inputs: [5, 6, 7, 8]});
        const res = w[circuit4.getSignalIdx("main.out")];
        assert.equal(res.toString(), hash.toString());
        await circuit4.checkWitness(w);
    });
});
