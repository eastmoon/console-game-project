/*
    Controlers, an application sub system, focus on Controller which is an application common command, when executing it will affect multiple view, model..
    use it to register, remove, check, execute controller.

    author: jacky.chen
*/

// Singleton class
export default class Controllers {
    constructor() {
        // declared member variable
        this.container = {};
    }

    // Command register,
    register($name, $command) {
        // 1. check command is duplicate or not
        if (typeof $command !== "undefined" &&
            typeof $name !== "undefined" &&
            (typeof this.container[$name] === "undefined" || this.container[$name] === null)
        ) {
            // 2. saving non-duplicate command.
            this.container[$name] = $command;
        } else {
            // 3. throw error message for duplicate register.
            return false;
        }
        return true;
    }

    // Command remove,
    remove($name) {
        // 1. check command, if exist, remove it.
        if (this.has($name)) {
            // retrieve command
            const obj = this.container[$name];
            // remove target object in mapping.
            this.container[$name] = null;
            // return target object.
            return obj;
        }
        // return null, it mean no command remove.
        return null;
    }

    // Command check,
    has($name) {
        // retireve object, if null then dosn't exist.
        if (typeof this.container[$name] === "undefined" || this.container[$name] === null) {
            return false;
        }
        return true;
    }

    // Command execute,
    execute($name, $param) {
        if (this.has($name)) {
            const cmd = this.container[$name];
            if (typeof cmd.execute !== "undefined") {
                cmd.execute($param);
            }
        }
    }
}
