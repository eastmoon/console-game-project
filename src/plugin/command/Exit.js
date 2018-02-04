import Filter from "lib/mvc/progress/filter";

export default class Exit extends Filter {
    // Constructor
    constructor() {
        super("exit")
    }
    // Execute method
    execute($progress, $resolve) {
        console.log("Exit application");
        // close all status
        $progress.status.update = "";
        $progress.status.command = "";
        $progress.status.view = "";
        $resolve($progress);
    }
}
