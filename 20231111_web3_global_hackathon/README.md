# Web3 Global Hackathon

## 登壇資料
- Speackerdeck : https://speakerdeck.com/aramaki/web3-global-hackathon-how-to-use-zkp-and-usecases
- Gamma : https://gamma.app/public/how-to-use-zkp-and-usecases-cmylhjwr4oxjnm3

## 登壇原稿

#### タイトル
- Web3 Global Hackathon : ZKP (zk-SNARKS)の使い方と活用事例

#### 目標
- ZKPの概要を理解する
- ZKPの活用方法を理解する
- ()ZKPを使ったおもしろいアプリケーションを見たい！！
#### ZKP（ゼロ知識証明）とは
- ある命題が真であることを、命題が真であるという情報以外を伝えずに証明できること
- C(x, w) = z
  - x : public input
  - w : private input (witness)
  - prover : wを公開することなくC(x,w) = trueがなりたつ「proof」を作成する
  - varifier : 「proof」の検証を行う
  - secret number lamdaを利用して、proving key(pk) and a verification key(vk) を生成
  - P(Prover):  proof (pr=P(pk,x,w)) の生成
  - V(Verifier): V(vk,x,pr) でproofがあっていたらtrueを返す
- trusted setup
  - the secret parameter lambda を知っている人は、V(vk,x,pr)がtrueになる虚偽のproofを生成することが可能
  - fake proofを作成できるだけで、private inputはわからない
  - the secret parameter lambdaはtrusted setupと呼ばれ、この問題のことをtoxic wasteという
#### ZKPの種類
- zkSNARKs (Groth16, PLONK)
- zkSTARK
  - https://medium.com/blockapex/a-primer-for-the-zero-knowledge-cryptography-part-ii-ecc0199d0a56
  - https://blog.pantherprotocol.io/zk-snarks-vs-zk-starks-differences-in-zero-knowledge-technologies/
- proofのサイズ、検証コスト（ガス代）、量子耐性
  - Snarkはproofが小さく検証が早い、Starkはproofは大きいがより多くのデータを証明することができる
    - [* 各プロジェクトどのZKPが使われてるかのリストアップ]
#### zkSNARKS = Succint Non interactive ARgument of Knowledge
- Succint
- Non Interactive
- ARguement of Knowledge
#### ZKSnarksの流れ
- Circomで回路の作成
- trusted setupの作成
- 回路をSolidityで検証できるコントラクトに変換
- Proofの生成
- Proofの検証

#### Snark.js と circom
- circomでcurcitを書いてcompile
- snarkjsを使ってzksnarkのproofを作成（ある情報を持っているということの証明）
- そのproofをsmart contractでproofの検証

#### ZKP が使えるとブロックチェーンで何ができるようなるのか
- データ量/計算量の圧縮 : 全て情報を渡すことなく情報の検証ができる
  - ユースケース：zk rollup,
- データの秘匿化 : オープンが前提のブロックチェーンにプライベートの概念を持ち込むことができる
  - ユースケース：tornado cash
#### zk rollup
- txの情報を全て渡すことなくtxの検証ができる
- 証明者はproofを作成するために計算コストを払う必要があるが、検証者は生成されたproofを回路で検証するだけですむ
- ORは全てのtxを保存して検証してるので、効率性が桁違いに違う
#### Tornado cash
- 暗号資産のミキシングサービス
- 解決した課題
  - 全く新しいアドレスにしたい場合オンチェーンとトランザクションは全て追跡可能なのでアドレスの関係性を断ち切ることができなかった
- tornado cashの仕組み
  - シークレット値の生成
  - nulifier + secret を pedersen hash 関数でハッシュ化する
  - deposit
    - ハッシュ値を資産とともtxを実行し登録（commitment）
  - zk-snarkを利用してproofを作成
    - commitmentの元となったnullifierとsecretを所有していることを証明するproof
    - https://github.com/tornadocash/tornado-cli/blob/378ddf8b8b92a4924037d7b64a94dbfd5a7dd6e8/cli.js#L328-L365
  - withdraw
    - proofを提出することでロックされている資産を引き出す
#### まとめ
- ZKPとはある命題が真であることを、命題が真であるという情報以外を伝えずに証明できること
- ZKPを使うとデータ量/計算量の圧縮と秘匿化ができる

#### アイデアの考え方
- ユーザーヒアリングは必要ない
- 事業者へのヒアリング
- 仮説検証を徹底的に繰り返すリサーチ
  - まだ市場が成り立っていないので、足りないもの、必要なものを作るのでもいい
  - じいさんが会社の立てたのは、「自分にはそれしかできないし、社会に需要があったから」と言っていたのに近い
- 事業者へのヒアリング = 事業者がよさそうと思っているサービス
  - Web3スタートアップのアイデアを11個考えてみた & （パート２）
    - https://open.spotify.com/episode/71dUcF4RAravxc0Tl4N7uP
    - https://open.spotify.com/episode/1OedngYUj8lSslhFEv8IsU
  - 今クリプト領域で起業するならどのようなテーマを選ぶか？ 10のアイデア
    - https://hashhub-research.com/articles/2023-10-02-startup-idea
  - Web3 Startup Ideas
    - https://alliance.xyz/ideas
  - A List of Open Problems in Crypto - II
    - https://crypto.mirror.xyz/hl284jc3A2MI_QeTE39nRsTPihOigNuLKIWjiU2pFzw
  - STATE OF CRYPTO 2023
    - https://api.a16zcrypto.com/wp-content/uploads/2023/04/State-of-Crypto.pdf
  - 業界のまとめレポート
    - https://twitter.com/arisatoyo_jp/status/1610203005474996224

#### *時間があったら作成して解説
- ZKPを使ったアプリケーションを作ってみる
  - 本の購入者にNFTを配る
  - 基本構成はTornadoCashと同じ
  - ランダムな文字列（secret）を100個生成する
  - secretのハッシュ値からMerkleTreeを作成
  - ZKPでsecretを持っているか検証し、検証が通ったらmint


## 【ZKP】
- snarkjs - tutorial
  - https://github.com/iden3/snarkjs#guide
- circom tutorial
  - https://docs.circom.io
- Introduction to zk-SNARKs
  - https://consensys.io/blog/introduction-to-zk-snarks
- ZKのリソースまとめ：ここから飛べるリンクにほぼ全てまとまっている気がする
  - https://github.com/matter-labs/awesome-zero-knowledge-proofs
- https://github.com/matter-labs/awesome-zero-knowledge-proofs?ref=blog.pantherprotocol.io#comparison-of-the-most-popular-zkp-systems
- https://ethereum.stackexchange.com/questions/59145/zk-snarks-vs-zk-starks-vs-bulletproofs-updated
- https://blog.chain.link/zk-snarks-vs-zk-starks/

- Halo list : https://electriccoin.co/blog/halos-contribution-goes-beyond-efficiency/
- Plonk list : https://zeroknowledge.fm/news-2-on-optimization-plonk/
- Groth16 list : https://docs.gnark.consensys.net/Concepts/schemes_curves


## Tornado cash
- etherscan
	- https://etherscan.io/address/0xd90e2f925DA726b50C4Ed8D0Fb90Ad053324F31b
- ZKP
  - tornado cashのtrusted setup
    - Tornado.Cash Trusted Setup Community was launched in May 2020 & accounts for 1114 contributions.
      - https://github.com/tornadocash/docs#how-does-tornadocash-run
  - Tornado.cashはGroth16を利用
    - https://tornado-cash.medium.com/tornado-cash-trusted-setup-ceremony-b846e1e00be1
- deposit
  - deposit時のpublic input : commitment = PedersenHash(nullifier + secret)
    - https://github.com/tornadocash/tornado-core/blob/master/contracts/Tornado.sol#L55-L63
  - commitmentをtreeに追加
    - https://github.com/tornadocash/tornado-core/blob/master/contracts/MerkleTreeWithHistory.sol#L68-L94
- circom（proofまわり）
  - private inputのsecretとnulifierから(deposit時に利用した)commitmentを生成しproofに利用
    - https://github.com/tornadocash/tornado-core/blob/master/circuits/withdraw.circom#L21
  - front-runnigで資金を横取りされないように、computationでは利用してないが回路にrecipientなどを含めてる
    - https://github.com/tornadocash/tornado-core/blob/master/circuits/withdraw.circom#L54-L64
  - withdraw時に必要なrootはeventから全てのcommitmentを取得して作成
    - https://github.com/tornadocash/tornado-cli/blob/378ddf8b8b92a4924037d7b64a94dbfd5a7dd6e8/cli.js#L286-L300
  - proofの生成はwebsnarkUtilsを利用
    - https://github.com/tornadocash/tornado-cli/blob/378ddf8b8b92a4924037d7b64a94dbfd5a7dd6e8/cli.js#L351-L352
- withdraw
  - withdraw時のpublic input : proof, root, nullifierHash
    - https://github.com/tornadocash/tornado-core/blob/master/contracts/Tornado.sol#L76-L84
  - withdraw時にnulifierHashを登録することでdouble spendを対策
    - https://github.com/tornadocash/tornado-core/blob/master/contracts/Tornado.sol#L86

## ZK Rollup
- ZkRollup Tutorial :roller_coaster:
  - https://hackmd.io/@n2eVNsYdRe6KIM4PhI_2AQ/SJJ8QdxuB
- Ethworks Reports : Zero-Knowledge Blockchain Scalability
  - https://www.archblock.com/engineering/ethereum-scaling-report

## zkSync
- Batch # 303116
  - https://explorer.zksync.io/batch/303116
- commit : https://etherscan.io/tx/0x9731aa2e2b4c45244e43953c3435be5f62bd8275887b220ddb29e43088297eed
  - prove : https://etherscan.io/tx/0xf856dfcf84db1c3d3acad5c09c0436efe50811eb09aa14847708cf314374de23

## Optimism
- Optimismのtransaction flow
  - https://community.optimism.io/docs/protocol/txn-flow/#
  - https://community.optimism.io/docs/security-model/priv-roles/#
- Op-bacher : 0xFFFにtransaction dataを投げる
  - https://etherscan.io/address/0x6887246668a3b87F54DeB3b94Ba47a6f63F32985
- データ圧縮の方法
  - https://github.com/ethereum-optimism/optimism/blob/233ede59d16cb01bdd8e7ff662a153a4c3178bdd/specs/derivation.md

## その他
- zk voting
  - https://blog.aragon.org/technical-deep-dive-anonymous-voting-with-zk-snarks/
