// project framework
import Application from "lib/gra";
import BasicObject from "lib/mvc/basic/object";
import Pipe from "lib/mvc/progress/pipe";

// Library
import clear from "clear";
import inquirer from "inquirer";
import chalk from "chalk";

// utils
import {isClass} from "app/utils/verifity";

// Startup pipe
export default class ViewComponent extends BasicObject {
    //
    constructor($name) {
        super($name);
        this._command = ["look", "exit"];
        this._description = {
            short: "short description",
            long: "long description"
        };
        // bind function
    }
    //
    execute() {
        let pipe = new Pipe();
        pipe.register(this.update.bind(this), "S1");
        pipe.register(this.render.bind(this), "S2");
        // pipe.onComplete = this.renderComplete.bind(this);
        pipe.execute();
    }
    // update
    update($progress = null, $resolve = null) {
        $resolve($progress);
    }
    // Render
    render($progress = null, $resolve = null) {
        // Render diescription
        this.renderDiscription($progress);
        // Defined question.
        const inputfilename = {
            type: "autocomplete",
            name: "command",
            message: chalk.blue.bold("Command :"),
            source: () => {
                return new Promise((resolve) => {
                    resolve(this._command);
                });
            }
        };
        // Execute question
        inquirer
            .prompt([inputfilename])
            .then((answers) => {
                // console.log(JSON.stringify(answers, null, '  '));
                // execute next command
                this.application.controllers.execute(answers.command, {next: ViewComponent})
                    .then((response) => {
                        // console.log(response);
                        if (Object.getOwnPropertyNames(response).includes("next") && typeof response.next !== "undefined" && response.next !== null && isClass(response.next)) {
                            let com = new response.next();
                            com.execute();
                        }
                        $resolve($progress);
                    });
            });
        //
    }
    renderDiscription() {
        console.log(`[${this._description.short}]`);
        console.log(this._description.long);
    }
    // Accessor
    get application() {
        return Application.instance;
    }
}
