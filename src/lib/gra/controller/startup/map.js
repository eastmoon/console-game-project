// project framework
import GRAFilter from "lib/gra/controller/common/filter";

// Library
import glob from "glob";
import Lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

// utils
import {infoToString} from "lib/gra/utils/format";

//
export default class StartupSave extends GRAFilter {
    // Constructor
    constructor(name, path, container, log) {
        super(name);
        this._path = path;
        this._container = container;
        this._log = log;
    }
    // Execute method
    execute($progress = null, $resolve = null, $reject = null) {
        console.log(`${this._log}`, ...infoToString($progress, $resolve, $reject));
        // Loading map
        glob(`**/${this._path}/**/*.json`, {}, (err, matches) => {
            if (!err) {
                matches.forEach((dbPath) => {
                    console.debug(dbPath);
                    const adapter = new FileSync(dbPath);
                    const temp = Lowdb(adapter);
                    const path = dbPath.split(`${this._path}/`)[1].split(".json")[0];
                    if (this._container !== null && typeof this._container.register === "function") {
                        this._container.register(path, temp);
                    }
                    // db[path] = temp;
                });
            } else {
                console.debug(`[PLUGIN] Database ${this._path} loading fail.`);
            }
            // console.debug(db["asia/taiwan"].value());
            // console.debug(db["asia/taiwan"].get("command").value());
            // console.debug(db["asia/taiwan"].get("description").get("short").value());
            //
            $resolve($progress);
        });
    }
}
