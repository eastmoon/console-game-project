# Command-Line interface

## § Install project library

```
// 前往專案目錄
cd <project folder>
// 使用 npm 套件
npm install
// 使用 yarn 套件
yarn install
```
> 安專案內容請在專案夾下職行

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
