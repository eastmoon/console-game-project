// Library
// Create save file and folder.
import fs from "fs";

function mkdirrecur(list, cur, callback) {
    if (list.length >= cur) {
        let path = list.slice(0, cur).toString().replace(/[,]/g, "/");
        // 1. checking folder is exist or not.
        if (fs.existsSync(path)) {
            // 1.1 exist folder, go to next sub folder.
            // console.log("pass ", folderDir);
            mkdirrecur(list, cur + 1, callback);
        } else {
            // 1.2 not exist, create folder.
            fs.mkdir(path, 777, () => {
                mkdirrecur(list, cur + 1, callback);
            });
        }
    } else {
        // 2. folder create complete, execute callback
        callback();
    }
}

export function mkdir(path) {
    return new Promise((resolve) => {
        // 1. 解析路徑
        let list = path.split("/");
        // 2. 若最後一個為檔案，移除內容
        if (list[list.length - 1].includes(".")) {
            list = list.slice(0, list.length - 1);
        }
        // 3. 以遞迴方式建立路徑
        mkdirrecur(list, 0, () => {
            resolve(path);
        });
    });
}
