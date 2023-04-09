
## zk rollup

## zkEVM

### type of zkEVM
- Ethereum compatibility <--> Prover performance : type1 <--> type4
  - changes gas cost operation and hash function
    - security, gas cost, blockhash, battle tested Keccak
      - https://taiko.mirror.xyz/w7NSKDeKfJoEy0p89I9feixKfdK-20JgWF9HZzxfeBo

### type of zkEVM

- Type 1 (fully Ethereum-equivalent)
- Type 2 (fully EVM-equivalent)
- Type 2.5 (EVM-equivalent, except for gas costs)
- Type 3 (almost EVM-equivalent)
- Type 4 (high-level-language equivalent)
  - https://vitalik.ca/general/2022/08/04/zkevm.html

#### taiko (type1)
- proposerとproverは分散されている
- txの順番 : proposed -> proved -> verified
  - proveは平行処理される、verifiedはblockの順番ごとに処理される
  - https://taiko.xyz/docs/concepts/proving-taiko-blocks/verified-blocks-and-parallel-proving
- Loopringのfounder

#### scroll (type 1~2)
- architecture
  - Scroll Node
    - Sequencer : txの実行、blockの生成 based on the geth
    - Coordinator : Rollerを無作為に抽出しproofを生成する
    - Relayer : L1のrollup contractとL2を監視、bridgeの監視
  - Roller network
    - 各zkEVM circuitsでvalidity proofを作成する役割
  - https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k
- EFのメンバーが多数在籍
- community 主導で開発
  - https://twitter.com/Scroll_ZKP/status/1632813697251803140
- bytecode compatible
  - https://twitter.com/pseudotheos/status/1643961572723765250

#### Polygon zkEVM (type 2~3)
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

#### zkSync (type 4)
- Alex Vlasov(co-founder) : former EF researcher, ENS, ConsenSys
- zkSync 1.0 : ERC20送信に特化してた
- zkSync 2.0 = zkSync Era (zkEVM)
- zk rollup transaction process (zkSync Era)
  - Pending: The transaction was received by the operator, but it has not been processed yet.
  - Processed: The transaction is processed by the operator and is confirmed to be included in the next block.
  - Committed: This indicates that the transaction data of this block has been posted on Ethereum. It does not prove that it has been executed in a valid way, but it ensures the availability of the block data.
  - Finalized: This indicates that the SNARK validity proof for the transaction has been submitted and verified by the smart contract. After this step, the transaction is considered to be final.
    - https://era.zksync.io/docs/dev/fundamentals/zkSync.html#zksync-overview

- 見解
  - ドキュメント・アーキテクチャー・人などをみていると、ArbitrumとzkSync、Optimismとscrollで同じ雰囲気を感じる
  - sequencerがEVMとして動いている

## 参考

- ZERO-KNOWLEDGE ROLLUPS
  - https://ethereum.org/en/developers/docs/scaling/zk-rollups/
- Top 6 zkEVM Projects: The Key to Ethereum’s Scalable Future
  - https://medium.datadriveninvestor.com/6-zkevm-projects-the-key-to-ethereums-scalable-future-12af0bab4f1d
