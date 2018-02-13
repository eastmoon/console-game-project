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
        // Remove doesn't exist plugin command
        this._config.plugin = this._filterPlugin(this._config.plugin);
        // Configuration filter over.
        $resolve($progress);
    }

    // Filter plugin
    _filterPlugin(plugin) {
        if (typeof plugin === "object") {
            if (plugin instanceof Array) {
                // check the string in array that is an effect key with plugin command .
                return plugin.filter((item) => {
                    if (this.application.controllers.command.has(item)) {
                        console.debug(`${item} exist.`);
                    } else {
                        console.debug(`${item} doesn't exist, remove it`);
                        return false;
                    }
                    return true;
                });
            } else {
                // if plugin is an object, it mean object content has multi array.
                Object.keys(plugin).forEach((key) => {
                    plugin[key] = this._filterPlugin(plugin[key]);
                });
            }
        } else {
            if (typeof plugin !== "string" || !this.application.controllers.command.has(plugin)) {
                console.debug(`${plugin} doesn't exist, remove it`);
                return [];
            } else {
                console.debug(`${plugin} exist.`);
            }
        }
        return plugin;
    }
}
