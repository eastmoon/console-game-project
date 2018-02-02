/*

*/

import MacroCommand from "lib/mvc/command/macro";
import Filter from "./filter";

export default class Pipe extends MacroCommand {
    constructor($name) {
        super($name);

        // Private variable
        // Default is asynchronous modol.
        this.async(true);

        // Initial variables
        this.parentPromise = null;
    }
    async($isAsync = true) {
        this.isAsync = $isAsync;
        return this;
    }
    register($filter, $name = "") {
        // console.log("Filter Object : ", typeof $filter === "object" && typeof $filter.execute === "function");
        // console.log("Filter Class : ", typeof $filter === "function" && typeof $filter.prototype === "object" && typeof $filter.prototype.execute === "function");
        // console.log("Function : ", typeof $filter === "function" && typeof $filter.prototype === "object" && typeof $filter.prototype.execute === "undefined");
        // console.log("Function 2 : ", typeof $filter === "function", " : ", typeof $filter.prototype === "undefined");
        // detected input filter is object / class / function
        let filter = $filter;
        if (typeof $filter === "function") {
            // detected command class.
            if (typeof $filter.prototype === "object" && typeof $filter.prototype.execute === "function") {
                filter = new $filter($name);
            }
            // detected execute function.
            if (typeof $filter.prototype === "object" && typeof $filter.prototype.execute === "undefined" ||
                typeof $filter.prototype === "undefined") {
                filter = new Filter($name);
                filter.execute = $filter;
            }
        }
        // detected filter is an command object.
        if (typeof filter !== "undefined" && filter !== null && typeof filter === "object" && typeof filter.execute === "function") {
            // replact name, when input name isn't empty.
            super.register(filter);
        }
    }
    execute($progress = null) {
        if (this.isAsync) {
            // Asynchronous process by promise object.
            if (this.commands !== null) {
                return this.asyncExecute($progress);
            }
        }
        // Synchronous process by progress object.
        return super.execute($progress);
    }
    asyncExecute($progress = null) {
        // Create pipe state filter
        const filters = this.createPipeState(this.commands.concat());
        // Create generator function
        const generator = this.createGenerator(filters, $progress);
        // decalre generator runnable
        const self = this;
        function go(step) {
            // check step object have yield object property.
            if ((!Object.hasOwnProperty.call(step, "done") && !Object.hasOwnProperty.call(step, "value")) || step.done) {
                return null;
            }
            // run next, if generator still not done.
            return step.value.then(() => {
                go(generator.next());
            }, (error) => {
                // Any filters error, pipe will call state onError handler.
                console.error("[Pipe] error", error);
                if (typeof self.onError === "function") {
                    self.onError($progress, error);
                }
            });
        }
        // execute generator
        return go(generator.next());
    }
    createPipeState($filters) {
        const self = this;
        if (typeof this.onStart === "function") {
            const start = new Filter("onStart");
            start.execute = ($progress = null, $resolve = null) => {
                self.onStart($progress);
                $resolve($progress);
            };
            $filters.splice(0, 0, start);
        }
        if (typeof this.onComplete === "function") {
            const complete = new Filter("onComplete");
            complete.execute = ($progress = null, $resolve = null) => {
                self.onComplete($progress);
                $resolve($progress);
            };
            $filters.push(complete);
        }
        return $filters;
    }
    *createGenerator($filters, $progress) {
        for (let count = 0; count < $filters.length; count += 1) {
            yield $filters[count].asyncExecute($progress);
        }
    }
}
