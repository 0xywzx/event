const ganache = require("ganache-cli");
const Web3 = require("web3");
const chai = require("chai");
const poseidonGenContract = require("../src/poseidon_gencontract.js");
const poseidon = require("../src/poseidon.js");

const assert = chai.assert;
const log = (msg) => { if (process.env.MOCHA_VERBOSE) console.log(msg); };

describe("Poseidon Smart contract test", function () {
    let testrpc;
    let web3;
    let poseidon2;
    let poseidon4;
    let accounts;
    this.timeout(100000);
    let C2;
    let C4;

    before(async () => {
        web3 = new Web3(ganache.provider(), null, { transactionConfirmationBlocks: 1 });
        accounts = await web3.eth.getAccounts();
    });

    it("Should deploy the contract", async () => {
        
        C2 = new web3.eth.Contract(poseidonGenContract.generateABI(2));
        poseidon2 = await C2.deploy({
            data: poseidonGenContract.createCode(2)
        }).send({
            gas: 5000000,
            from: accounts[0]
        });
        
        C4 = new web3.eth.Contract(poseidonGenContract.generateABI(4));
        poseidon4 = await C4.deploy({
            data: poseidonGenContract.createCode(4)
        }).send({
            gas: 5000000,
            from: accounts[0]
        });
    });

    it("Should calculate the poseidon correctly for 2 inputs", async () => {
        const res = await poseidon2.methods.poseidon([1, 2]).call();

        // console.log("Cir: " + bigInt(res.toString(16)).toString(16));

        const res2 = poseidon([1, 2]);
        // console.log("Ref: " + bigInt(res2).toString(16));

        assert.equal(res.toString(), res2.toString());
    });
    it("Should calculate the poseidon correctly for 4 inputs", async () => {

        const res = await poseidon4.methods.poseidon([1, 2, 3, 4]).call();

        // console.log("Cir: " + bigInt(res.toString(16)).toString(16));

        const res2 = poseidon([1, 2, 3, 4]);
        // console.log("Ref: " + bigInt(res2).toString(16));

        assert.equal(res.toString(), res2.toString());
    });

});

