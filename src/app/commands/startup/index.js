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
          console.log("[STARTUP] S2, Command plugin loading.", ...infoToString($progress, $resolve, $reject));
            // Loading command PLUGIN
            const path = "plugin/command";
            glob(`**/*/${path}**/*.js`, {}, (err, matches) => {
                if (!err) {
                    matches.forEach((pluginPath) => {
                        let paths = pluginPath.split("src/");
                        if (paths.length >= 2) {
                            const module = require(paths[1]);
                            const obj = new module.default();
                            this.application.controllers.command.register(obj.name, obj);
                        }
                    });
                } else {
                    console.log("[PLUGIN] Plugin loading fail.");
                }
                $resolve();
            });
        }, "S2");
        this.register(($progress = null, $resolve = null, $reject = null) => {
          console.log("[STARTUP] S3, Update plugin loading.", ...infoToString($progress, $resolve, $reject));
            // Loading command PLUGIN
            const path = "plugin/update";
            glob(`**/*/${path}**/*.js`, {}, (err, matches) => {
                if (!err) {
                    matches.forEach((pluginPath) => {
                        let paths = pluginPath.split("src/");
                        if (paths.length >= 2) {
                            const module = require(paths[1]);
                            const obj = new module.default();
                            this.application.controllers.update.register(obj.name, obj);
                        }
                    });
                } else {
                    console.log("[PLUGIN] Plugin loading fail.");
                }
                $resolve();
            });
        }, "S3");
        this.register(($progress = null, $resolve = null, $reject = null) => {
          console.log("[STARTUP] S4, View plugin loading.", ...infoToString($progress, $resolve, $reject));
            // Loading command PLUGIN
            const path = "plugin/ui";
            glob(`**/*/${path}**/*.js`, {}, (err, matches) => {
                if (!err) {
                    matches.forEach((pluginPath) => {
                        let paths = pluginPath.split("src/");
                        if (paths.length >= 2) {
                            const module = require(paths[1]);
                            const obj = new module.default();
                            this.application.controllers.ui.register(obj.name, obj);
                        }
                    });
                } else {
                    console.log("[PLUGIN] Plugin loading fail.");
                }
                $resolve();
            });
        }, "S4");
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
