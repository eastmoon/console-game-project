// project framework
import GRAFilter from "lib/gra/controller/common/filter";

// Library
import glob from "glob";

// utils
import {infoToString} from "lib/gra/utils/format";

export default class StartupPlugin extends GRAFilter {
    // Constructor
    constructor(name, path, container, log = "") {
        super(name);
        this._path = path;
        this._container = container;
        this._log = log;
    }
    // Execute method
    execute($progress = null, $resolve = null, $reject = null) {
        console.log(`${this._log}`, ...infoToString($progress, $resolve, $reject));
        // Loading plugin
        glob(`**/${this._path}/**/*.js`, {}, (err, matches) => {
            if (!err) {
                matches.forEach((pluginPath) => {
                    console.debug(pluginPath);
                    let paths = pluginPath.split("src/");
                    if (paths.length >= 2) {
                        const module = require(paths[1]);
                        const obj = new module.default();
                        if (this._container !== null && typeof this._container.register === "function") {
                            this._container.register(obj.name, obj);
                        }
                    }
                });
            } else {
                console.debug(`[PLUGIN] Plugin ${this._path} loading fail.`);
            }
            $resolve($progress);
        });
    }
}
