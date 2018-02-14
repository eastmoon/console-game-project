// Library
import Macro from "lib/gra/controller/plugin/macro";

// Command plugin
import Goto from "./goto";

export default class East extends Macro {
    // Constructor
    constructor() {
        super("east");

        this.register(this.goto.bind(this), "S1");
        this.register(Goto, "S2");
    }
    // Medthod
    goto($progress = null, $resolve = null) {
        if (typeof $progress.data.direction !== "undefined" && typeof $progress.data.direction.east !== "undefined") {
            const place = $progress.data.direction.east;
            console.debug(`Goto : ${place}`);
            $progress.status.command.param = [place];
        }
        $resolve($progress);
    }
    // Accessor
    get help() {
        return "往東方移動一格"
    }
}
