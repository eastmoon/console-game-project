// Library
import Macro from "lib/gra/controller/plugin/macro";

// Command plugin
import Goto from "./goto";

export default class Up extends Macro {
    // Constructor
    constructor() {
        super("up");

        this.register(this.goto.bind(this), "S1");
        this.register(Goto, "S2");
    }
    // Medthod
    goto($progress = null, $resolve = null) {
        if (typeof $progress.data.direction !== "undefined" && typeof $progress.data.direction.up !== "undefined") {
            const place = $progress.data.direction.up;
            console.debug(`Goto : ${place}`);
            $progress.status.command.param = [place];
        }
        $resolve($progress);
    }
    // Accessor
    get help() {
        return "往上方移動一格"
    }
}
