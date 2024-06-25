# AWS Summit ファイルダウンローダー

このプロジェクトは、AWSサミットのウェブサイトにログインし、指定されたページに移動して、そのページにリンクされているすべてのPDFおよびZIPファイルをダウンロードするスクリプトを提供します。このスクリプトは、ブラウザ操作の自動化にSelenium WebDriverを使用し、ファイルのダウンロードにAxiosを使用します。

## 機能

- AWSサミットのウェブサイトに自動ログインします。
- 指定されたページに移動して、すべてのPDFおよびZIPファイルを検索してダウンロードします。
- ダウンロードしたファイルをローカルディレクトリに保存します。

## 前提条件

- [Node.js](https://nodejs.org/) (バージョン20.12.2以上)
- [Chrome WebDriver](https://sites.google.com/a/chromium.org/chromedriver/downloads)

## インストール

1. リポジトリをクローン
```bash
git clone https://github.com/Kei-Ta/aws-summit-download.git
cd aws-summit-download
```
2. 依存関係をインストール
```bash
npm install
```
3. 設定

.envファイルを作成しのログイン資格情報を更新します
```
touch .env
```
ログイン資格情報を記述します
```bash
USERNAME=your_username
PASSWORD=your_password
```
## 使用方法
Node.jsを使用してスクリプトを実行します
```bash
node app.js
```
このスクリプトは以下の操作を行います

AWSサミットのログインページを開きます。
提供された資格情報を使用してログインします。
指定されたページに移動します。
すべてのPDFおよびZIPファイルのリンクを検索し、それらをdownloadsディレクトリにダウンロードします。

## 注意事項
- login_idとlogin_passwordは各自のものを利用すること
- オーナーのローカル環境でしか確認していないのでどの環境でも実行できることを保証したものではありません。downloadPageUrlが各々変わるかもしれないと考えてます。
- DLは各自の責任でお願いします。
- 運営等に注意された場合はリポジトリを閉じます。

## 拡張願望
- LLMに資料投げて要約を作成したい
- 資料と要約をまとめ公開したい
