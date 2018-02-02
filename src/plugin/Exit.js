import Filter from "lib/mvc/progress/filter";

export default class Exit extends Filter {
    // Constructor
    constructor() {
        super("exit")
    }
    // Execute method
    execute($progress, $resolve) {
        console.log("Execute Command 1");
        $progress.next = null;
        $resolve($progress);
    }
}
