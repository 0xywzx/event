# BUILD UP for Web3エンジニア


## 開発者として押さえておくべきイーサリアムアコシステムの現状とこれから

### Ethereumの課題
- ガス代が高いので単純に使われない、使われたとしてもwalletやガス代などハードルが高い
  - [Ethereum Network Utilization Chart](https://etherscan.io/chart/networkutilization)
    - The merge までは 3年くらい80%以上だった
  - walletも広く使われるためにはまだ選択肢が揃っていないのが問題
    - 私個人としてはEOAが好きではあるが、大衆には普及しない

### Ethereumの現状
- もっぱらscalabilityに注力
- Scalabilityの一つとしてのLayer2
- L2の実態はスマートコントラクト
  - ORのトランザクションをまとめてL1に書き込んでいる、その情報を元にL2のnode/sequencerを構築
    - ex) OPの実態：[CanonicalTransactionChain (CTC)](https://etherscan.io/address/0x5E4e65926BA27467555EB562121fac00D24E9dD2)
   - ZKRの場合はstate diffのみを書き込んでる
     - [This means that ZK-rollups only need to provide validity proofs to finalize transactions on Ethereum instead of posting all transaction data on-chain like optimistic rollups.](https://ethereum.org/en/developers/docs/scaling/zk-rollups/)
- L2の分類
  - Optimistic rollup
    - Arbitrum (derivative)
    - Optimism (DeFi : Velodromeのみ)
  - ZK Rollup
    - [zkEVM](https://vitalik.ca/general/2022/08/04/zkevm.html)
      - type 1 : scroll, taiko
      - type 2 : zkSync, zkEVM
      - type 3 :
      - type 4 : starknet with Nethermind
    - zkEVm以外
      - starknet : ゲームとstarkEXでapp specific
  - modular chain
    - Celestia
    - mantle
    - ORとの違い
      - 今のORはExecution Layerのみを外に出して、Data Availability layer/Consensus Layer/Settlement LayerをEthereumにしている
      - modular chainは４つのLayerを様々なサービスを組み合わせて組成し、最終の結果のみをEthereumに書き込む
  - L2の現状
    - L2全体でL1のトランザクションを超えた
    - [Scaling factorは3.78x at 20230325](https://l2beat.com/scaling/activity)

### Ethereum現状をどう捉えるか

- 23年はOR、それ以降はZKR
  - zkSync, Polygon zkEVMが2023年3月末にリリース、scroll, taikoが2023年末~2024年にリリース
- ORのいいところはEtherumのアップデートに対応しやすく、zkとevmを合わせる難しい実装をしなくていいとこを
  - つまり、他の開発に時間を時間をさくことが出来る
  - ex) Arbitrum : [AnyTrust](https://medium.com/offchainlabs/introducing-anytrust-chains-cheaper-faster-l2-chains-with-minimal-trust-assumptions-31def59eb8d7), [Stylus](https://offchain.medium.com/hello-stylus-6b18fecc3a22) / Optimism : [Op Stack](https://optimism.mirror.xyz/fLk5UGjZDiXFuvQh6R_HscMQuuY9ABYNF7PI76-qJYs)
- ZKRの中でもStarkNetは無理にEVMに対応しようとぜず、独自路線を進んでいて長期でみると面白い。vitalikもよく言及する。
  - EVMの限界を理解している。ZKRの中では一番進んでいて利用ケースも出てきている。（Visa, CBDC）
- Polygonがどこまで伸びるか
  - Polygonは現状考えられうるソリューションを全てやろうとしており、PoSで捌けなかった利用者や提携先を流し込むことが予想される
    - [Supernets](https://wiki.polygon.technology/docs/supernets/get-started/what-are-supernets/) : Application-specific chain / [Avail](https://www.alchemy.com/dapps/polygon-avail) : DA / Nightfall : プライバシーソリューション / [Miden](https://wiki.polygon.technology/docs/miden/intro/main/) : zkvm
  - 各L2がL1L2のみのbridgeを実装しなかった中、Polygonのみが[LX-LY bridge](https://wiki.polygon.technology/docs/category/zkevm-bridge)を実装したので、他のL2からの流動性移行を狙ってそう
- L3が増えるか or modular chainが台頭するかは要観察
  - 自分の中でのL3の定義：L2が提供するツールを活用したチェーン
    - Optimism op stack / Arbitrum AnyTrust / Polygon Avail / zkSync zkPorter / StarkNet starkWare
  - ただ競合ではなく選択肢が増えるだけ

### Ethereumの今後
- Roadmap
  - The merge : PoS (55% complete)
    - PoSへの移行
  - The Surge : Sharding
    - EIP4844
  - The Scourge
  - The Verge : [Verkle tree](https://blog.ethereum.org/2021/12/02/verkle-tree-structure) / [Article from John Kuszmaul](https://math.mit.edu/research/highschool/primes/materials/2018/Kuszmaul.pdf)
    - Snarked Ethereum
      - 検証がかなり楽になる
  - The Purge
    - [EIP-4444](https://eips.ethereum.org/EIPS/eip-4444)
      - State/History expiry
  - The Splurge
    - [PBS](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)
    - all the other
- update
  - [Shanghai](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)
    - ETHの引き出しが可能
    - [Selfdestructの廃止](https://hackmd.io/@vbuterin/selfdestruct)
  - [Cancun](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)
    - [EIP-4844: Shard Blob Transactions](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)
    - [EOF](https://notes.ethereum.org/@ipsilon/eof1-unified-specification)

### Ethereumの今後をどう捉えるか

- Ethereumはよりセキュリティーを担うレイヤーになる
  - Polkadotの[Relay Chainによるshared security](https://wiki.polkadot.network/docs/learn-parachains)やCosmosHubの[Interchain security](https://blog.cosmos.network/interchain-security-is-coming-to-the-cosmos-hub-f144c45fb035), [mesh security](https://medium.com/@MultichainMedia/mesh-security-is-coming-to-cosmos-74c401da28ff)に比べると、Ethereumはスマートコントラクトに記載する（将来的にはBlob or shard）のみで、セキュリティー提供に柔軟性がない
    - EigenLayerなど
- Aptos/Sui, Avalancheなど一つのチェーンのみで完結するチェーンが台頭している中、L2の足並みが揃ってないので個別のL2にロックされており、Ethereum全体としての成長が鈍化しそう
  - それぞれの進化を楽しんでいる様子はある
  - "it's okay if no single person can understand the whole protocol, because we can specialize" by vitalik
- 開発者へのアップデートが少ない
  - EOFくらいでeWASMなどはまだ先になりそう
- ただ、まず今求められている最低限のものを実装している、ゆえにシンプルで複雑なものを上に作りやすい
  - Ethereum界隈の開発スピードはかなり早い
  - "[We don't know exactly what the needs of 2032 will demand](https://www.youtube.com/live/kGjFTzRTH3Q?feature=share&t=2171)" by vitalik
  - あったらいいよねをめっちゃ開発しているチェーンはある

## ブロックチェーンをどう捉えるか

- Web2 : 情報革命 → 完成系としてのAI
- Web3 : 価値革命 →　??
  - これまでのwebは広告と小売（Facebook/Google/Amazon）を大きく変えた、web2はAIである程度完成された
  - **ブロックチェーンではそれ以外の分野（何かしらの価値がつくもの）も大きく変える**

- ブロックチェーン = Ethereumはstate machine ≒ DB
- スマートコントラクト = stateの書き込みと読み込みの定義 ≒ API
  - お金を払えば誰でも書き込みができる、読み込みはタダでできる
  - その書き込まれたデータは恣意的に変更できない（セキュリティー）
  - **価値がつかなかったものに価値をつける / 流動性の低かった資産の流動性を向上させる**

## ETH Tokyoに向けてサービスの事例紹介

- スマートコントラクトのアプリケーションは大きく分けると２つがメイン
  - EIP（特にERC20とERC721）によって生まれたアプリ
    - ERC20は保有量を管理したテーブル → DeFi
    - ERC721は保有者を管理したテーブル → NFT
  - コントラクトウォレット

### ERC20 / ERC721と魔改造

- EIPの規格にさえ準拠=関数名と引数さえあっていれば、関数のロジックはなんでもいい
- ERC20の例
  - AAVEのaToken : 利子分を追加して残高を返却
    - https://github.com/aave/protocol-v2/blob/1.0/contracts/protocol/tokenization/AToken.sol#L177-L189
  - Compoundのcomp : comp tokenの移転と同時にgovernanceのdelegateも移転
    - https://github.com/compound-finance/compound-protocol/blob/master/contracts/Governance/Comp.sol#L233-L260
  - Ampleforth : MoneySupplyの増減で価格を維持
    - balanceOf : https://github.com/ampleforth/ampleforth-contracts/blob/master/contracts/UFragments.sol#L166-L172
    - rebase : https://github.com/ampleforth/ampleforth-contracts/blob/master/contracts/UFragments.sol#L108-L143
- ERC721
  - Uniswap V3 LP : SVGとparamでNFTを型から生成
    - https://github.com/Uniswap/v3-periphery/blob/main/contracts/libraries/NFTSVG.sol#L46-L74

#### まとめ
- EIPはInterfaceの定義のみなので、それさえ守ればその先の可能性は無限大
- 規格を作ることができる
  - ブロックチェーンを利用したLGBTカップル調印式 by [famiee](https://www.famiee.com/top/)

### コントラクトウォレットとメタトランザクション
- アカウントは２つ：EOA / Contract Account
- Contract Accountはスマートコントラクトなので拡張性は様々
- Multisig : Gnosis Safe
  - コアはexecuteのみ。call() or delegateCall()で叩き先を指定するので、全てのtxに柔軟に対応できる
    - https://github.com/safe-global/safe-contracts/blob/main/contracts/base/Executor.sol#L21-L39
- AA : Patch wallet
  - txの実行をbundlerに移譲
- メタトランザクション : txの署名と実行の分離
  - EIP2612(permit) : https://github.com/centrehq/centre-tokens/blob/master/contracts/v2/EIP2612.sol#L61-L86
  - EIP3009 : https://github.com/centrehq/centre-tokens/blob/master/contracts/v2/EIP3009.sol#L89-L118

#### まとめ
- ブロックチェーンとの接続出来る選択肢を増やすのが重要

### 番外編 : tornado cashとzkp
- ZKP (zero knowledge proof)とは
  - ある情報を知っているということを伝えようとする者（証明者）が，その情報を知っているという事実以外の情報を，証明を検証しようとする者（検証者）に与えることなく，検証者に対して証明者がその情報を知っていると証明すること。
- SNARK（Succinct Non-Interactive Argument of Knowledge）
  - 簡潔に対話なしで知識の根拠を署名できる = コントラクトに対して一回の通信で証明できる

- tornado cash
  - 暗号資産のミキシングサービス
  - tornado cashの仕組み
    - シークレット値の生成
      - nulifier + secret を pedersen hash 関数でハッシュ化する
    - deposit
      - ハッシュ値を資産とともtxを実行し登録（commitment）
    - zk-snarkを利用してproofを作成
      - commitmentの元となったnullifierとsecretを所有していることを証明するproof
        - https://github.com/tornadocash/tornado-cli/blob/378ddf8b8b92a4924037d7b64a94dbfd5a7dd6e8/cli.js#L328-L365
    - withdraw
      - proofを提出することで
  - [Snark と circom](https://docs.circom.io/)
    - circomでcurcitを書いてcompile
    - snarkjsを使ってzksnarkのproofを作成（ある情報を持っているということの証明）
    - そのproofをsmart contractでproofの検証

#### まとめ
- zkpとはスマートコントラクトはオープンであるけど、情報を明かすことなく情報を持っていると証明できる
  - クイズ、抽選、private transactionなど
- ZKPがあると何がいいのか
  - データ量/計算量の圧縮：ZKRだとtxの情報を全て渡すことなくtxの検証ができる
    - 証明者はproofを作成するために計算コストを払う必要があるが、検証者は生成されたproofを回路で検証するだけですむ
    - ORは全てのtxを保存して検証してるので、効率性が桁違いに違う
  - データの秘匿化：オープンが前提のブロックチェーンにプライベートの概念を持ち込むことができる
  - プログラミングパラダイムシフト by 日置さん from intmax

## その他 : 情報収集方法
- ２次ソース受動&自動的に収集
  - メルマガ
  - 公式twitter
  - エコシステム系のtwitter
  - forum
  - 海外の長いスレッドで解説してる人系
  - カンファレンス
  - メインイベントのプログラムとサイドイベントリスト
- その中でもおもしろいものは１次ソースをみる
  - white paper
  - docs
  - ソースコード

## 参考
- Ethereum Execution Client Specifications (update list)
  - https://github.com/ethereum/execution-specs
- Updated roadmap diagram!
  - https://twitter.com/VitalikButerin/status/1588669782471368704
- proto
  - https://twitter.com/protolambda/status/1579588263580667904
- Rollups everywhere
  - https://ethresear.ch/t/rollups-everywhere/12530
- Ethereum All Core Developers Call #151 Writeup
  - https://www.galaxy.com/research/insights/ethereum-all-core-developers-call-151/
- Ethereum All Core Developers Call #152 Writeup
  - https://www.galaxy.com/research/insights/ethereum-all-core-developers-execution-call-152/
- “Mega EOF Endgame” Specification
  - https://notes.ethereum.org/@ipsilon/B1nnZ1fl3?utm_source=substack&utm_medium=email
- DATA AVAILABILITY
  - https://ethereum.org/en/developers/docs/data-availability/
- ETHCC5 VITALIK
  - https://www.youtube.com/live/kGjFTzRTH3Q?feature=share
- zk-SNARKsの原理
  - https://zenn.dev/qope/articles/f94b37ff2d9541
