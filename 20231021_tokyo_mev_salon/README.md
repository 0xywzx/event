# Tokyo MEV Salon

## MEV-BoostとPBSについて

### イベントの目的
- MEV/PBSについて概要を理解し、どのように今後の情報を追えばいいかわかる
- MEVに関わる人を増やす

### MEV とは
> Maximal extractable value (MEV) refers to the maximum value that can be extracted from block production in excess of the standard block reward and gas fees by including, excluding, and changing the order of transactions in a block.
> https://ethereum.org/en/developers/docs/mev/
- 広義 : MEV ≒ block構築

### Ethereumのblock構築の仕組み
- MEVの文脈においてPoWとPoSで変わったのは、Proposerが事前にわかるようになったこと
- 1 epoch = 32 slot
  - validatorから32のproposerが選出され、各slotのcommitteeにattesterとして配置される
  - 広義の意味でProposer ≒　Validator ≒ Miner

### PBS = Proposer Builder Separation
- Validatorの収益機会を均等にし、より多くの主体がvalidatorになるのを促すための仕組み
  - 収益機会が平等でないと価値の高いblockを構築できる力を持った主体だけしかvalidatorになりたがらない
- blockの構築のアウトソース先としてのMEV-boost

### MEVの種類
- Arbitrage
  - onchain, DEX-CEX, CrossChain
- front running / Sandwich
- Liquidation

### MEV-Boostについて
- 概要
  - Searcher-Builder-Relayerが協力しあって収益性の高いblockを構築している
- Searcher ≒ botter
  - 収益機会を見つけてbundleをbuilderに渡す
- Builder
  - bundleとMempoolから収益性の高いblockを構築する
- Relayer
  - builderからblockを受け取り、proposerに渡す
  - blockのDA Layer

- Searcher → Builder
  -
- Builder → Relayer
  - builderの特徴
    - subsidyを多く使いblock構築率をあげる薄利多売型
    - subsidyと独自のsorting algorithmsで勝負する効率型
    - subsidyなしでsorting algorithmsとその他付加価値で勝負する王道型
    - 収益機会があるのきのみ参加する利益重視型
  - builderの収益の高いblockを構築するためには、より多くのorder flowが必要
    - order flowを獲得する戦略
      - 補助金をproposerに渡し、block構築率を高める
      - searcherを優遇する
      - searcherをintegrateする
  - auctionでの２つの競走
    - builder間でblock構築の権利を競争
    - builder - proposer間でどこまで収益を分配できるかを競争
- Relayer → Proposer
  - getHeaderしてheaderの署名をrelayerに送信し、relayerがp2pネットワークに送信する
    - proposerにblinded blockを渡すのでproposerにblockを盗まれる心配はない
    - relayerからp2pに送信されるので、もし不正が行われたらproposerのETHがslashされる

### MEV-Boostの課題
- 悪いMEVが存在していること
- Searcherの立場が弱いこと
- Builderの集権化していること
- Relayerの検閲性・インセンティブがないこと

### 他のPBSの概要
- 基本的にMEV-Boostの仕組みに似ている = MEV-Boostを理解していれば他のPBSも理解できる
- out-of-protocol
  - Optimistic Relay
    - V1 : Execution Clientでのblock検証をなくす
    - V2 : blockの送信をまたない
    - Endgame (in-protocol) : bidをp2pに送信し、Relayerは監視する
- in-protocol
  - 前提
    - 詳細が決まっているものはない。実装までに時間がかかる。
  - Two-Slot PBS
    - Slotを２つに分ける：Consensus slotとExecution slot
      - Consensus slotではbidとheaderを受け取る
      - Execution slotでpayloadを受け取る
  - PTC (Payload-Timeliness Committee)
    - CL blockを関係者で構築する
      - Execution Payload Header
      - Builder bid
      - Execution Payload
  - PEPC (Proposer-Enforced Protocol Commitments)
    - 今まではfull blockのcommitmentしかできなかったけど、さまざまなcommitmentが可能になる
  - MEV-burn
    - MEVの収益をburnする
- その他
  - SUAVE
    - 「Mempool」と「Decentralized Block Builder」をどのチェーンにも提供するのも
  - MEV-Boost using Eigen Layer
  - Two-Block HeadLock (TBHL)

- PBSの主な議論
  - わるいMEVをどうするか
  - block構築をどのくらい柔軟にするか
  - MEV-boostにおけるRelayerをどうするか

### MEVを考える上で念頭においていること
- 有事の際にtrustlessにblock構築を行えるか
  - 全てのtrustlessにしようとすると無駄が出るので
- ePBSになるとは限らない。out-of-protocolで試行錯誤すること
  - Ethereumのscalingのためのshardingも結局rollupにとって変わった
- MEVの市場はまだ小さい ($300M - $900M)
  - https://www.galaxy.com/insights/perspectives/distribution-of-mev-surplus/

### MEVの今後
- 悪いMEVはなくなる方向に動いている
- protocolの回収により価格のslippageが小さくなっている
- UniswapXなどのIntentにより、on-off chainの価格差が少なくなる可能性がある
- CrossChainMEVもそこまで大きくないかも
- なので、クリプトの市場が伸びないとMEVの市場も伸びない


