# 20230715 メタトランザクション

## 登壇資料
https://speakerdeck.com/aramaki/meta-transaction

## EIP3009の実行

script/eip3009.jsの以下を記載
```
//ガス代がないけど送信したいアドレスの秘密鍵
const userPrivateKey = ""
//ガス代を負担するアドレスの秘密鍵
const privateKey = ""
const rpcUrl = ""
//JPYCの送信先
const to = ""
```

eip3009をスクリプトで実行
```
cd script
npm install
node eip3009.js
```


# メモ

## JPYC
- JPYCv2
  - centreに準拠
  - Blocklist
  - Upgradeability
  - EIP2612 / 3009 （メタトランザクション）
  - Pause
  - Rescuable
  - Minter

- ERC20とは
  - 共通の規格
  - balanceとtransferのコードの説明

## メタトランザクション
- txの仕組み
  - JSONでそれを署名してtxを実行
  - 署名者はmsg.senderになる
  - 具体的にtransferの関数を元に説明

- スマートコントラクトの実行
  - toにコントラクトアドレス
  - dataに実行内容が入る
    - dataはMethodId
  - このtxを送る人がガス代を払う

- メタトランザクションとは
  - 署名と実行の分離

- EIP2612 / 3009
  - EIP3009を元にせつめい
  - EIP3009の関数の説明
    - 特に署名からアドレスの算出
    - transferの実行部分
  - 実際にプログラムを動かしてみる
    - 署名者=送信者、実行者、受信者が違うことの確認

## スマートコントラクト
- ブロックチェーン = Ethereumはstate machine ≒ DB
- スマートコントラクト = stateの書き込みと読み込みの定義 ≒ API
  - お金を払えば誰でも書き込みができる、読み込みはタダでできる
  - その書き込まれたデータは恣意的に変更できない（セキュリティー）
- スマートコントラクトの強み
  - 価値がつかなかったものに価値をつける
  -  流動性の低かった（市場に出てなかった）資産の流動性を向上させる