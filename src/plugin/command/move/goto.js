// Library
import Pipe from "lib/gra/command/pipe";

// Command plugin
import Look from "../action/look";

export default class Goto extends Pipe {
    // Constructor
    constructor() {
        super("goto");

        this.register(this.goto.bind(this), "S1");
        this.register(Look, "S2");
    }
    // Medthod
    goto($progress = null, $resolve = null) {
        const place = $progress.status.command.param;
        if (this.application.models.data.map.has(place)) {
            $progress.data = this.application.models.data.map.retrieve(place).value();
        } else {
            console.log("前往的目標不存在");
        }
        $resolve($progress);
    }
    // Accessor
    get help() {
        return "移動到目標地區，請使用 goto <目標>"
    }
}
