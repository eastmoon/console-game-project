import Filter from "lib/mvc/progress/filter";

export default class Look extends Filter {
    // Constructor
    constructor() {
        super("look")
    }
    // Execute method
    execute($progress, $resolve) {
        console.log("Execute Command 2");
        $resolve($progress);
    }
}
