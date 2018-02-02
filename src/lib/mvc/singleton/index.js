/*
Singleton pattern.

author: jacky.chen

*/

/*
class type name retrieve and check
- Class name : Class.name
- Object class name : obj.constructor.name
- Object type check : [objact] instanceof [class]
Ref : http://stackoverflow.com/questions/1249531
*/

// Export variable
export const instances = {};

// Singleton class
export default class Singleton {
    constructor() {
        // Set object isn't first create
        // Make sure every time new object will be the same instance
        // Ref : http://amanvirk.me/singleton-classes-in-es6/
        // In here, this is instance object.
        if (typeof instances[this.constructor.appName] === "undefined" || instances[this.constructor.appName] === null) {
            instances[this.constructor.appName] = this;
            this.install();
        }
        return instances[this.constructor.appName];
    }

    install() {
        this._firstInitial = true;
    }

    // singleton pattern class static method
    static get instance() {
        // Class.instance, use static attribute to retrieve instance
        // In here, this is class defined.
        if (typeof instances[this.appName] === "undefined" || instances[this.appName] === null) {
            instances[this.appName] = new this();
        }
        return instances[this.appName];
    }

    // Accessor
}
