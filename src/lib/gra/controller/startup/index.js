// project framework
import GRAPipe from "lib/gra/controller/common/pipe";

// Library
import clear from "clear";
import inquirer from "inquirer";

// utils
import {infoToString} from "lib/gra/utils/format";

// filter
import StartupConfiguration from "./configuration";
import StartupPlugin from "./plugin";
import StartupMap from "./map";
import StartupRecord from "./record";

// views
import ViewComponent from "lib/gra/views";

// Library, execute CLI param translate.
import "lib/gra/utils/variable";

// Startup pipe
export default class Startup extends GRAPipe {
    constructor(config) {
        super("Startup");
        // Setting which filter need to run.
        this.register(($progress = null, $resolve = null, $reject = null) => {
            inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));
            console.log("[STARTUP] S1, Console UI initial", ...infoToString($progress, $resolve, $reject));
            $resolve($progress);
        }, "S1");
        this.register(new StartupPlugin(
            "S2",
            "plugin/macro",
            this.application.controllers.command,
            "[STARTUP] S2, Command plugin loading."));
        this.register(new StartupPlugin(
            "S3",
            "plugin/update",
            this.application.controllers.update,
            "[STARTUP] S3, Update plugin loading."));
        this.register(new StartupPlugin(
            "S4",
            "plugin/ui",
            this.application.controllers.ui,
            "[STARTUP] S4, Command plugin loading."));
        this.register(new StartupMap(
            "S5",
            "db/map",
            this.application.models.data.map,
            "[STARTUP] S5, Map database loading."));
        this.register(new StartupConfiguration(
            "S6",
            config,
            "[STARTUP] S6, Configuration application."));
        this.register(new StartupRecord("S7", "[STARTUP] S7, Game data loading"));
        this.register(($progress = null, $resolve = null) => {
            console.log("[STARTUP] S8, wait filter");
            $resolve($progress);
        }, "S8");
        this.onComplete = ($progress = null) => {
            console.log("[STARTUP] Complete, Game start.", ...infoToString($progress));
            // clear view
            // clear();
            // start view component
            let com = new ViewComponent();
            com.execute();
        }
        this.execute({});
    }
}
