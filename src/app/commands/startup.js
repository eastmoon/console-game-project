// project framework
import Pipe from "lib/mvc/progress/pipe";

// Library
import inquirer from "inquirer";
import chalk from "chalk";
import glob from "glob";

// utils
import {infoToString} from "app/utils/format";

// Application framework
const pluginList = {};

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
                        pluginList[obj.name] = obj;
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
            console.log("[STARTUP] Complete, GOTO Main menu.", ...infoToString($progress));
            // Defined question.
            const inputfilename = {
                type: "autocomplete",
                name: "command",
                message: chalk.blue.bold("Command :"),
                source: () => {
                    return new Promise((resolve) => {
                        resolve(Object.keys(pluginList));
                    });
                }
            };
            // Execute question
            inquirer
                .prompt([inputfilename])
                .then((answers) => {
                    console.log(JSON.stringify(answers, null, '  '));
                    // execute next command
                    const obj = pluginList[answers.command];
                    if (obj !== null && typeof obj.execute === "function") {
                        obj.execute();
                    }
                });
            //
        }
    }
    //
    execute($progress = null) {
        console.log("[STARTUP] execute.");
        return super.execute($progress);
    }
}
