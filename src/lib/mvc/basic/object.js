export default class BasicObject {
    // Constructor
    constructor($name = "") {
        // private variable, not safe way.
        this._name = $name;
    }
    // Static method

    // Method

    // Accessor
    // if name is empty, rutun class name
    get name() {
        if (this._name === "") {
            return this.constructor.name;
        }
        return this._name;
    }
}
