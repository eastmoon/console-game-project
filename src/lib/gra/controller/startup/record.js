// project framework
import GRAFilter from "lib/gra/controller/common/filter";
import GRAPipe from "lib/gra/controller/common/pipe";
import RecordProxy from "lib/gra/model/proxy/record";

// Library
import glob from "glob";
import Moment from "moment";
import SHA256 from "crypto-js/sha256";
import fs from "fs";
import path from "path";

// utils
import {infoToString} from "lib/gra/utils/format";
import {mkdir} from "lib/gra/utils/operate";

//
export default class StartupRecord extends GRAFilter {
    // Constructor
    constructor(name, log) {
        super(name);
        this._log = log;
        this._file = "src/db/save/save.json";
    }
    // Method
    checkfile($progress = null, $resolve = null, $reject = null) {
        console.debug("[STARTUP] Record S1, check record file exist, if not exist create folder and file.");
        glob(this._file, {}, (err, matches) => {
            if (err) {
                console.error(err);
                $reject(err);
            }
            if (matches.length === 0) {
                // 1.1 若檔案不存在，建立目錄與檔案
                mkdir(`${this._file}`).then((response) => {
                    // 1.3 建立新檔案並產生金鑰與初始文件內容
                    // 1.3.1 產生密鑰
                    const time = Moment().format("x");
                    const secKey = SHA256(time).toString();
                    let defaultData = {
                        key: secKey,
                        data: ""
                    };
                    fs.writeFile(`${this._file}`, JSON.stringify(defaultData), (err) => {
                        err ? console.error(err) : console.debug("Default record file complete.");
                        $resolve($progress);
                    });
                });
            } else {
                console.debug("[STARTUP] Record S1, file exist, pass.")
                $resolve($progress);
            }
        });
    }
    initialfile($progress = null, $resolve = null, $reject = null) {
        console.debug("[STARTUP] Record S2, loading save file.");
        let proxy = new RecordProxy("GameRecord", this.application.models.proxy);
        proxy.load(this._file, () => {
            $resolve($progress);
        });
    }
    // Execute method
    execute($progress = null, $resolve = null, $reject = null) {

        let pipe = new GRAPipe();
        pipe.register(($progress = null, $resolve = null, $reject = null) => {
            console.log(`${this._log}`, ...infoToString($progress, $resolve, $reject));
            $resolve($progress);
        }, "S1");
        pipe.register(this.checkfile.bind(this), "S2");
        pipe.register(this.initialfile.bind(this), "S3");
        pipe.onComplete = ($progress = null) => {
            $resolve($progress);
        };
        pipe.execute($progress);


        /*
            if (matches.length === 0) {
                // 1. 若資料檔不存在
                defaultRecord.data = AES.encrypt(JSON.stringify(defaultRecord.data), defaultRecord.key).toString();
                console.debug(defaultRecord);
            } else {
                // 2. 若檔案存在，開起當按並將內容儲存於框架
                console.debug(matches);
            }
        });
        */
    }
}
