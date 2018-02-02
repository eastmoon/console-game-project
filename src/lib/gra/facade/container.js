import BasicObject from "lib/mvc/basic/object";

export default class ContanierFacade extends BasicObject {
    // Constructor

    // Method
    register($name, $object) {
        return $object instanceof BasicObject;
    }

    remove($name) {
        return typeof $name === "string" && $name !== null;
    }

    retrieve($name) {
        return typeof $name === "string" && $name !== null;
    }

    has($name) {
        return typeof $name === "string" && $name !== null;
    }

    // Accessor
}
