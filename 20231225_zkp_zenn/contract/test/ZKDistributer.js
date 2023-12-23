const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Lock", function () {

  async function deployContractFixture() {

    // Contracts are deployed using the first signer/account by default
    const [
      owner,
      account1,
      account2,
      account3,
      operator
    ] = await ethers.getSigners();

    const VerifierContractFactory = await ethers.getContractFactory("Groth16Verifier");
    const verifierContract = await VerifierContractFactory.connect(owner).deploy();

    const ContractFactory = await ethers.getContractFactory("ZKDistributer");

    const contract = await ContractFactory.connect(owner).deploy(
      await verifierContract.getAddress(),
      "0x02098005fb891614c331c714899f2ef041a044186f6051436a17dfdc7c50f8ae"
    );

    return { contract, owner, account1, account2, account3, operator };
  }

  describe("Deployment", function () {
  });

  describe("SafeMint", function () {
    describe("Validation", function () {

    });

    describe("Mint", function () {
      it("should mint NFT", async function() {
        const { contract, account1 } = await loadFixture(deployContractFixture);

        // mint nft
        await contract.connect(account1).safeMint(
          [
            "0x2d68539e84d80f05f3f05438aeaaa3cf8af02605b3b97ca1102a86e8a27bc33c",
            "0x2b30d0057302accb865810697172283611546ee328243c06b44aeb54cf18a20d"
          ],
          [
            [
              "0x1e33120eae34adeabe0b159624addc1c27440873be29edd795666de9b8d08a3c",
              "0x168339172128000e9637b70216311b5980e542ceb2e9761bbb04bbefad567745"
            ],
            [
              "0x07ad197427594dd4bf905297f3f3fe431a19edfb6e62bb50ec4150c08c30311c",
              "0x112a759949f0ba2363843ea75bfa9285f82995f8ca8f6fe89f7791375d38971e"
            ]
          ],
          [
            "0x10f9beb2c7091f4d316913c7e46c9b7541b44cc77f06a7b4e4e15efd7f92afd9",
            "0x1ec369538df704555966bb3b901566c313140273ec002b17702c273e044903d6"
          ],
          [
            "0x02098005fb891614c331c714899f2ef041a044186f6051436a17dfdc7c50f8ae",
            "0x18851c5e2d1968b7d84273cda635ef6f8613f9f8f72109051144d672963f7a66"
          ]
        );

        expect(await contract.balanceOf(account1.address)).to.be.equal(
          1
        );
      });
    });
  });
});