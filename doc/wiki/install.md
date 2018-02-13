# Install execution environment

## 1、Install nvm

+ [for Linux / Mac](https://github.com/creationix/nvm)
+ [for Windows](https://github.com/coreybutler/nvm-windows/releases)

```
nvm version
```
> 執行此命令確保 nvm 安裝成功

## 2、node

利用 nvm 安裝 node

```
// 安裝
nvm install <version>
// 執行
nvm use <version>
```
> 注意，在 windows 環境下 npm 套件可能因為路敬字串過長而安裝失敗，需將 nvm 重新安裝到不同位置，或更改環境路徑。

## 3、yarn

```
npm install -g yarn
```
> 透過此方式取得最新版本的 yarn 管理套件，原則上 npm 亦可使用；兩者在安裝套件、編譯過成各有優劣，使用習慣端看個人。

## § Install & Execute project

專案內容相關執行動作請在專案夾下處理；詳細執行命令參考 [CLI](./cli.md)
