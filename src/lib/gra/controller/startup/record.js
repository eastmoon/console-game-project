// project framework
import GRAFilter from "lib/gra/controller/common/filter";
import GRAPipe from "lib/gra/controller/common/pipe";
import RecordProxy from "lib/gra/model/proxy/record";

// Library
import glob from "glob";
import Moment from "moment";
import SHA256 from "crypto-js/sha256";
import fs from "fs";

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
    showInfo($progress = null, $resolve = null, $reject = null) {
        console.log(`${this._log}`, ...infoToString($progress, $resolve, $reject));
        $resolve($progress);
    }
    checkfile($progress = null, $resolve = null, $reject = null) {
        console.debug("[STARTUP] Record S1, check record file exist, if not exist create folder and file.");
        glob(this._file, {}, (err, matches) => {
            if (err) {
                console.error(err);
                $reject(err);
            }
            if (matches.length === 0) {
                // 1.1 若檔案不存在，建立目錄與檔案
                mkdir(`${this._file}`).then(() => {
                    // 1.3 建立新檔案並產生金鑰與初始文件內容
                    // 1.3.1 產生密鑰
                    const time = Moment().format("x");
                    const secKey = SHA256(time).toString();
                    let defaultData = {
                        key: secKey,
                        data: ""
                    };
                    fs.writeFile(`${this._file}`, JSON.stringify(defaultData), (writeErr) => {
                        writeErr ? console.error(writeErr) : console.debug("Default record file complete.");
                        $resolve($progress);
                    });
                });
            } else {
                console.debug("[STARTUP] Record S1, file exist, pass.")
                $resolve($progress);
            }
        });
    }
    initialfile($progress = null, $resolve = null) {
        console.debug("[STARTUP] Record S2, loading save file.");
        let proxy = new RecordProxy("GameRecord", this.application.models.proxy);
        proxy.load(this._file, () => {
            // if record is initial state, write initial state in file.
            if (Object.keys(proxy.data).length === 0)  {
                console.debug("[STARTUP] Record S2, Record is initial state, saving empty data.")
                proxy.save({url: "local"});
            }
            $resolve($progress);
        });
    }
    // Execute method
    execute($progress = null, $resolve = null) {
        let pipe = new GRAPipe();
        pipe.register(this.showInfo.bind(this), "S1");
        pipe.register(this.checkfile.bind(this), "S2");
        pipe.register(this.initialfile.bind(this), "S3");
        pipe.onComplete = () => {
            $resolve($progress);
        };
        pipe.execute($progress);
    }
}
