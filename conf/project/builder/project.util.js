// Webpack 第三方函式庫引用宣告
import fs from "fs";
import path from "path";

// 路徑轉換
export function resolve(relativePath) {
    return path.resolve(process.cwd(), relativePath);
}

// 取回JSON檔案
export function readJSON(relativePath) {
    return JSON.parse(fs.readFileSync(resolve(relativePath)));
}

// 定義唯一值，確保矩陣中的值不會重覆
Object.defineProperty(Array.prototype, 'unique', {
    value: function() {
        var a = this.concat();
        for(var i = 0; i < a.length; ++i) {
            for(var j = i+1; j < a.length; ++j) {
                if(a[i] === a[j])
                    a.splice(j--, 1);
            }
        }
        return a;
    }
});
