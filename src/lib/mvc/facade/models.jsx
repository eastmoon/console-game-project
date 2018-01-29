/*
    Modles, an application sub system, focus on Model which is a data model, proxy, which is using at store application data and connection to remote web service.
    use it to register, retrieve, remove, check Models.

    author: jacky.chen
*/

// Singleton class
export default class Models {
    constructor() {
        // declared member variable
        this.container = {};
    }

    // Model register,
    register($name, $model) {
        // 1. check model is duplicate or not
        if (typeof $model !== "undefined" &&
            typeof $name !== "undefined" &&
            (typeof this.container[$name] === "undefined" || this.container[$name] === null)
        ) {
            // 2. saving non-duplicate model.
            this.container[$name] = $model;
        } else {
            // 3. throw error message for duplicate register.
            return false;
        }
        return true;
    }

    // Model remove,
    remove($name) {
        // 1. retrieve model, if exist, remove it.
        const obj = this.retrieve($name);
        if (obj !== null) {
            // remove target object in mapping.
            this.container[$name] = null;
        }
        // return target object.
        return obj;
    }

    // Model retrieve,
    retrieve($name) {
        // using mapping to check, if exist return object, then return null
        if (this.has($name)) {
            return this.container[$name];
        }
        return null;
    }

    // Model check,
    has($name) {
        // retireve object, if null then dosn't exist.
        if (typeof this.container[$name] === "undefined" || this.container[$name] === null) {
            return false;
        }
        return true;
    }
}
