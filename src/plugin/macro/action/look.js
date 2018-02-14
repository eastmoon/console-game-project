//
import Action from "lib/gra/controller/plugin/action";

export default class Look extends Action {
    // Constructor
    constructor() {
        super("look");
    }
    // Execute method
    execute($progress, $resolve) {
        console.log(`[${$progress.data.description.short}]`);
        console.log($progress.data.description.long);
        $resolve($progress);
    }
    // Accessor
    get help() {
        return "觀看，若要觀看特定目標，請使用 look <目標>"
    }
}
