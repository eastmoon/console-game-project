# Console Game Project

## § Library

此專案包括一下函式庫：

專案環境
* [Node.js](https://nodejs.org/en/)

專案語言規範：
* [ECMAScript 6.0 / Babel](https://babeljs.io/learn-es2015/)

## § Install nvm, node, yarn

#### 1、Install nvm

+ [for Linux / Mac](https://github.com/creationix/nvm)
+ [for Windows](https://github.com/coreybutler/nvm-windows/releases)

```
nvm version
```
> 執行此命令確保 nvm 安裝成功

#### 2、node

利用 nvm 安裝 node

```
// 安裝
nvm install <version>
// 執行
nvm use <version>
```
> 注意，在 windows 環境下 npm 套件可能因為路敬字串過長而安裝失敗，需將 nvm 重新安裝到不同位置，或更改環境路徑。

#### 3、yarn

```
npm install -g yarn
```
> 透過此方式取得最新版本的 yarn 管理套件，原則上 npm 亦可使用；兩者在安裝套件、編譯過成各有優劣，使用習慣端看個人。

## § Install project library

```
npm install
```

## § Execute project command

### 執行專案
```
// 使用 npm 套件
npm start
// 使用 yarn 套件
yarn start
```

##### CLI Option
+ --error=<true/false>
> 是否顯示錯誤資訊 (console.error)，預設為 false；輸入 --error ，視為 true

+ --warn=<true/false>
> 是否顯示警告資訊 (console.warn)，預設為 false；輸入 --warn ，視為 true

+ --dev=<true/false>
> 是否顯示開發資訊 (console.debug)，預設為 false；輸入 --dev ，視為 true

### 語法檢查
```
// 使用 npm 套件
npm run eslint
// 使用 yarn 套件
yarn eslint
```
> 執行 nodemon 來監視開發資料夾，並且經過 eslint 檢查專案語法正確性。

### 單元測試
```
// 使用 npm 套件
npm test
// 使用 yarn 套件
yarn test
```
> 執行 Macha 單元測試工具。
