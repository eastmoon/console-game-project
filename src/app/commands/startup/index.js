// project framework
import Pipe from "lib/gra/command/pipe";

// Library
import clear from "clear";
import inquirer from "inquirer";
import glob from "glob";

// utils
import {infoToString} from "app/utils/format";

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
            $resolve();
        }, "S1");
        this.register(($progress = null, $resolve = null, $reject = null) => {
            glob("**/*/plugin/**/*.js", {}, (err, matches) => {
                if (!err) {
                    matches.forEach((item) => {
                        const module = require(`plugin/${item.split("plugin/")[1]}`);
                        const obj = new module.default();
                        console.log(obj.name);
                        this.application.controllers.register(obj.name, obj);
                    });
                    $resolve();
                } else {
                    console.log("[PLUGIN] Not plugin.");
                    $reject();
                }
            });
            console.log("[STARTUP] S2, Plugin initial.", ...infoToString($progress, $resolve, $reject));
        }, "S2");
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
