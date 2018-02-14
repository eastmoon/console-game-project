//
import Action from "lib/gra/controller/plugin/action";

export default class Exit extends Action {
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
    // Accessor
    get help() {
        return "離開遊戲"
    }
}
