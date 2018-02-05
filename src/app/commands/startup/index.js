// project framework
import Pipe from "lib/gra/command/pipe";

// Library
import clear from "clear";
import inquirer from "inquirer";

// utils
import {infoToString} from "app/utils/format";

// filter
import StartupPlugin from "./plugin";
import StartupMap from "./map";

// views
import ViewComponent from "app/views/component";

// Startup pipe
export default class Startup extends Pipe {
    constructor() {
        super("Startup");
        // Setting which filter need to run.
        this.register(($progress = null, $resolve = null, $reject = null) => {
            inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));
            console.log("[STARTUP] S1, Console UI initial", ...infoToString($progress, $resolve, $reject));
            $resolve($progress);
        }, "S1");
        this.register(new StartupPlugin(
            "S2",
            "plugin/command",
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
        this.onComplete = ($progress = null) => {
            console.log("[STARTUP] Complete, Game start.", ...infoToString($progress));
            // clear view
            clear();
            // start view component
            let com = new ViewComponent();
            com.execute();
        }
    }
}
