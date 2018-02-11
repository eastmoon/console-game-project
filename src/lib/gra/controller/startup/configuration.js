// project framework
import GRAFilter from "lib/gra/controller/common/filter";

// Library

// utils
import {infoToString} from "lib/gra/utils/format";
import {defaultVariable} from "lib/gra/utils/verifity";

export default class StartupPlugin extends GRAFilter {
    // Constructor
    constructor(name, config, log) {
        super(name);
        this._config = config;
        this._log = log
    }
    // Execute method
    execute($progress = null, $resolve = null, $reject = null) {
        console.log(`${this._log}`, ...infoToString($progress, $resolve, $reject));
        // Make sure config object is not empty.
        this._config = defaultVariable(this._config, {});
        // Make sure all config attribute is exist.
        this._config.status = defaultVariable(this._config.status, {});
        this._config.plugin = defaultVariable(this._config.plugin, {});
        this._config.plugin.system = defaultVariable(this._config.plugin.system, []);
        this._config.plugin.common = defaultVariable(this._config.plugin.common, []);
        this._config.plugin.parser = defaultVariable(this._config.plugin.parser, {});
        this.application.models.data.config = this._config;
        //
        $resolve($progress);
    }
}
