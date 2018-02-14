// Library
import Macro from "lib/gra/controller/plugin/macro";

// Command plugin
import Goto from "./goto";

export default class South extends Macro {
    // Constructor
    constructor() {
        super("south");

        this.register(this.goto.bind(this), "S1");
        this.register(Goto, "S2");
    }
    // Medthod
    goto($progress = null, $resolve = null) {
        if (typeof $progress.data.direction !== "undefined" && typeof $progress.data.direction.south !== "undefined") {
            const place = $progress.data.direction.south;
            console.debug(`Goto : ${place}`);
            $progress.status.command.param = [place];
        }
        $resolve($progress);
    }
    // Accessor
    get help() {
        return "往下方移動一格"
    }
}
