// project framework
import Filter from "lib/gra/command/filter";

// Library
import inquirer from "inquirer";
import chalk from "chalk";

export default class Input extends Filter {
    // Constructor
    constructor() {
        super("input")
    }
    // Execute method
    execute($progress, $resolve) {
        // Defined question.
        const inputfilename = {
            type: "autocomplete",
            name: "command",
            message: chalk.blue.bold("Command :"),
            source: (answer, input) => {
                const inputParser = input === null ? [""] : input.split(" ");
                const inputCommand = inputParser[0];
                return new Promise((resolve) => {
                    let command = $progress.data.command.filter((name) => {
                        return input ? name.includes(inputCommand) : true;
                    });
                    if (command.length === 1) {
                        // retrieve command help describe, and add to command
                        let plugin = this.application.controllers.command.retrieve(command[0]);
                        command[0] += `\n${plugin.help}`;
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
