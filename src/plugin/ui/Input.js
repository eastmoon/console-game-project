// project framework
import Filter from "lib/mvc/progress/filter";

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
                return new Promise((resolve) => {
                    let command = $progress.data.command.filter((name) => {
                        return input ? name.includes(input) : true;
                    });
                    resolve(command);
                });
            }
        };
        // Execute question
        inquirer
            .prompt([inputfilename])
            .then((answers) => {
                // console.log(JSON.stringify(answers, null, '  '));
                $progress.status.command = answers.command;
                $resolve($progress);
            });
    }
}
