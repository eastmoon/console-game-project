// project framework
import GRAFilter from "lib/gra/controller/common/filter";

// Library
import glob from "glob";
import Lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

// utils
import {infoToString} from "lib/gra/utils/format";

//
export default class StartupMap extends GRAFilter {
    // Constructor
    constructor(name, log) {
        super(name);
        this._log = log;
    }
    // Execute method
    execute($progress = null, $resolve = null, $reject = null) {
        console.log(`${this._log}`, ...infoToString($progress, $resolve, $reject));
        glob(`db/save/save.json`, {}, (err, matches) => {
            if (err) {
                // 1. 若資料檔不存在，建立新檔案並產生金鑰與初始文件內容
                console.debug(err);
            } else {
                // 2. 若檔案存在，開起當按並將內容儲存於框架
                console.debug(matches);
            }

            $resolve($progress);

        });
    }
}
