/*

*/
import SimpleCommand from "lib/mvc/command/simple";

export default class Filter extends SimpleCommand {
    asyncExecute($progress = null) {
        return new Promise((resolve, reject) => {
            this.execute($progress, resolve, reject);
        }).catch((error) => {
            this.fail(error);
            throw error;
        });
    }
    execute($progress = null, $resolve = null, $reject = null) {
        console.log("[Filter] execute", $progress, $resolve, $reject);
        return $progress;
    }
    fail($error = null) {
        console.error("[Filter] error", $error);
    }
}
