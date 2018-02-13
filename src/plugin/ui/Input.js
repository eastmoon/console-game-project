// project framework
import UI from "lib/gra/controller/plugin/ui";

// Library
import inquirer from "inquirer";
import chalk from "chalk";

export default class Input extends UI {
    // Constructor
    constructor() {
        super("input")
    }
    // Method
    filterCommand(list, input) {
        return list.filter((name) => {
            return input ? name.includes(input) : true;
        });
    }
    deepCompare(map, parser) {
        /*
        if parser is string or array, return it.
        if parser isn't, and map is object, mean it have next object node, deep compare with it.
        */
        let list = [];
        if (parser instanceof Array) {
            return parser;
        } else if (typeof parser === "string") {
            return [parser];
        } else if (map instanceof Object) {
            Object.keys(map).forEach((key) => {
                if (typeof parser[key] !== "undefined") {
                    list = list.concat(this.deepCompare(map[key], parser[key]));
                }
            });
        }
        return list;
    }
    // Execute method
    execute($progress, $resolve) {
        // Retrieve command which could use because map structure is exist.
        let mappingCommand = this.deepCompare(
            $progress.data,
            this.application.models.data.config.plugin.parser);

        // Defined question.
        const inputfilename = {
            type: "autocomplete",
            name: "command",
            message: chalk.blue.bold("Command :"),
            source: (answer, input) => {
                const inputParser = input === null ? [""] : input.split(" ");
                const inputCommand = inputParser[0];
                return new Promise((resolve) => {
                    // Create command list.
                    let command = this.filterCommand(mappingCommand, inputCommand);
                    let system = this.filterCommand(this.application.models.data.config.plugin.system, inputCommand);
                    let common = this.filterCommand(this.application.models.data.config.plugin.common, inputCommand);
                    let special = this.filterCommand($progress.data.command, inputCommand);
                    command = command
                        .concat(special)
                        .concat(system)
                        .concat(common)
                        .sort();
                    //
                    // Show command help, if only have one command.
                    if (command.length === 1) {
                        // retrieve command help describe, and add to command
                        let plugin = this.application.controllers.command.retrieve(command[0]);
                        if (plugin !== null) {
                            command[0] += `\n${plugin.help}`;
                        } else {
                            command[0] += `\nCommand isn't exist.`;
                        }
                        // parser command parameter
                        answer.param = inputParser.length > 1 ? inputParser.slice(1) : [];
                    }
                    resolve(command);
                });
            }
        };
        // Execute question
        inquirer
            .prompt([inputfilename])
            .then((answers) => {
                // remove command help describe.
                answers.command = answers.command.split('\n')[0];
                console.debug(JSON.stringify(answers, null, '  '));
                $progress.status.command.cmd = answers.command;
                $progress.status.command.param = answers.param;
                $resolve($progress);
            });
    }
}
