import SimpleCommand from "./simple";

export default class MacroCommand extends SimpleCommand {
    // Constructor
    constructor($name = "") {
        // Call parent constructor
        super($name);
        // private variable, not safe way.
        this.commands = [];
    }

    // Static method

    // Method
    // register
    // @parame [command] :
    // @return : true, register success. false, register fail or parameter input wrong.
    register($command) {
        // declare variable.
        let command = null;
        // parameter type check.
        if ($command instanceof SimpleCommand) {
            command = $command;
        }
        // functional :
        // 1. Duplicate object could not register.
        if (command !== null && this.has(command.name) < 0) {
            // 2. Add in container
            this.commands.push(command);
            return true;
        }
        return false;
    }

    // remove
    // @parame [name] :
    // @return : true, remove success. false, remove fail or parameter input wrong.
    remove($name) {
        // declare variable.
        const index = this.has($name);
        // functional :
        // 1. Exist object than remove it.
        if (index >= 0) {
            // 2. Remove in container.
            this.commands.splice(index, 1);
            return true;
        }
        return false;
    }

    // retrieve
    // Take back Command object.
    // @parame [name] :
    // @return : Object, null is object not find in container.
    retrieve($name) {
        // declare variable.
        const index = this.has($name);
        // functional :
        // 1. Exist object than return it.
        if (index >= 0) {
            return this.commands[index];
        }
        return null;
    }

    // has
    // Check Command object is exist in container, and return index. if object isn"t Command type and exist in container, return -1. If exist return index in container.
    // @parame [name] :
    // @return : index, -1 is object not exist.
    has($name) {
        // declare variable
        let index = -1;
        // functional :
        // 1. Search object in container. If object is equal with source, than saving index and break for loop.
        for (let count = 0; count < this.commands.length; count += 1) {
            if (this.commands[count].name === $name) {
                index = count;
                break;
            }
        }
        return index;
    }

    // execute, override method.
    execute($args = null) {
        // Execute parent method.
        super.execute();
        // declare variable
        let command = null;
        let args = $args;
        // functional :
        for (let count = 0; count < this.commands.length; count += 1) {
            command = this.commands[count];
            if (command !== null && command instanceof SimpleCommand) {
                args = command.execute(args);
            }
        }
        return args;
    }

    // Accessor
    get count() {
        return this.commands.length;
    }
}
