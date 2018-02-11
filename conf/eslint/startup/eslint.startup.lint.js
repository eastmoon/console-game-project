// Library
import fs from "fs";
import path from "path";
import merge from "merge";

// Project build tools
import {resolve} from "./eslint.util";

// 合併不同階段的 eslint 設定檔，並動態產生 .eslintrc。
// .eslintrc 檔可提供給編輯器進行語法效正。
function mergeESLintRules(stage) {
    let json = {};
    stage.forEach((obj) => {
        // create target file name.
        const file = path.resolve(__dirname, `../stage/eslint.stage.${obj}.json`);
        // if file exist, read file and merge to result.
        if (fs.existsSync(file)) {
            var data = JSON.parse(fs.readFileSync(file,"UTF-8"));
            // merge array
            Object.keys(json).forEach((key) => {
                if (typeof data.hasOwnProperty(key) && data[key] instanceof Array && json[key] instanceof Array) {
                    data[key] = data[key].concat(json[key]).unique();
                }
            });
            // merge object
            json = merge.recursive(true, json, data);
        }
    });
    // write rules in stage.all.
    fs.writeFileSync(resolve(".eslintrc"), JSON.stringify(json), 'utf8');
}

export function configureLint(config) {
    // 1. 設定模組，使 js、jsx 受 ESlint 檢查，以確保程式編寫風格正確
    mergeESLintRules(config.stage);
}
