
## zk rollup

## zkEVM

### type of zkEVM
- Ethereum compatibility <--> Prover performance
  - changes gas cost operation and hash function
    - security, gas cost, blockhash, battle tested Keccak
-

### type of zkEVM
- Polygon zkEVM
  - Proof of Donation (PoD) → Proof of Efficiency
    - https://ethresear.ch/t/proof-of-efficiency-a-new-consensus-mechanism-for-zk-rollups/11988
  - On chain DA : hybrid model
    - あるトランザクションはtxのデータとvalidity proofをL1に登録し、あるデータはproofのみ
  - Sequencers
    - → propose transaction batches to the network, i.e. they roll-up the transaction requests in batches and add them to the Consensus Contract.​
  - Aggregators
    - → check the validity of the transaction batches and provide validity proofs. Any permissionless Aggregator can submit the proof to demonstrate the correctness of the state transition computation.
      - https://wiki.polygon.technology/docs/zkEVM/architecture#polygonzkevmsol
  - zkEVM protocol
    - https://wiki.polygon.technology/docs/category/zkevm-protocol
  - 現状はtype3,これからtype2に移行
    - https://wiki.polygon.technology/docs/zkEVM/faq/zkevm-eth-faq#when-will-we-get-type-2-evm-equivalence
  - EVMとの違いはある
    - https://wiki.polygon.technology/docs/zkEVM/protocol/evm-diff/
  - 実例：Immutable teams with Polygon to scale web3 gaming!
    - https://metaversal.banklesshq.com/p/immutable-zkevm
- scroll
  - EFのメンバーが多数在籍
  - community 主導で開発
    - https://twitter.com/Scroll_ZKP/status/1632813697251803140
  - bytecode compatible
    - https://twitter.com/pseudotheos/status/1643961572723765250
- taiko
  - proposerとproverは分散されている
  - txの順番 : proposed -> proved -> verified
    - proveは平行処理される、verifiedはblockの順番ごとに処理される
    - https://taiko.xyz/docs/concepts/proving-taiko-blocks/verified-blocks-and-parallel-proving
  - Loopringのfounder
  -
- zkSync
  - Alex Vlasov(co-founder) : EF, ENS, ConsenSys
  - zkSync 1.0 : ERC20送信に特化してた
  - zkSync 2.0 = zkSync Era (zkEVM)
  - zk rollup transaction process (zkSync Era)
    - Pending: The transaction was received by the operator, but it has not been processed yet.
    - Processed: The transaction is processed by the operator and is confirmed to be included in the next block.
    - Committed: This indicates that the transaction data of this block has been posted on Ethereum. It does not prove that it has been executed in a valid way, but it ensures the availability of the block data.
    - Finalized: This indicates that the SNARK validity proof for the transaction has been submitted and verified by the smart contract. After this step, the transaction is considered to be final.
      - https://era.zksync.io/docs/dev/fundamentals/zkSync.html#zksync-overview


- 個人できな見解
  - ドキュメント・アーキテクチャー・人などをみていると、ArbitrumとzkSync、Optimismとscrollで同じ雰囲気を感じる
  - starknetは全く別もの


## 参考
- zkRollup
  - ZERO-KNOWLEDGE ROLLUPS
    - https://ethereum.org/en/developers/docs/scaling/zk-rollups/
  -
  - Top 6 zkEVM Projects: The Key to Ethereum’s Scalable Future
    - https://medium.datadriveninvestor.com/6-zkevm-projects-the-key-to-ethereums-scalable-future-12af0bab4f1d
- zkSync
  - docs
    - https://era.zksync.io/docs/dev/fundamentals/zkSync.html#zksync-overview
- taiko
  - The Type 1 ZK-EVM
    - https://taiko.mirror.xyz/w7NSKDeKfJoEy0p89I9feixKfdK-20JgWF9HZzxfeBo