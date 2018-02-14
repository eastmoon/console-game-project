// Library
import Macro from "lib/gra/controller/plugin/macro";

// Command plugin
import Goto from "./goto";

export default class West extends Macro {
    // Constructor
    constructor() {
        super("west");

        this.register(this.goto.bind(this), "S1");
        this.register(Goto, "S2");
    }
    // Medthod
    goto($progress = null, $resolve = null) {
        if (typeof $progress.data.direction !== "undefined" && typeof $progress.data.direction.west !== "undefined") {
            const place = $progress.data.direction.west;
            console.debug(`Goto : ${place}`);
            $progress.status.command.param = [place];
        }
        $resolve($progress);
    }
    // Accessor
    get help() {
        return "往西方移動一格"
    }
}
