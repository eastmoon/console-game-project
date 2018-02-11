// Add root path into project env by module app-module-path.
// It will have bug if root path setting in main.js.
// Maybe it will happen, because import and require execution flow difference.
import {addPath} from "app-module-path";
import path from "path";
// Add root path.
addPath(path.join(process.cwd(), "src"));
// Delete paths cache.
delete require.cache[__filename];

// Add console information output function.
// error, warn, debug.
// ref : https://www.npmjs.com/package/chalk
import Chalk from "chalk";
import {argv} from "yargs";
console.error = (str) => {
    if (argv.error) {
        console.log(`${Chalk.black.bgRed("[ERROR]")} ${Chalk.redBright(typeof str === "object" ? JSON.stringify(str) : str)}`);
    }
}
console.warn = (str) => {
    if (argv.warn) {
        console.log(`${Chalk.black.bgYellow("[WARN]")} ${Chalk.yellowBright(typeof str === "object" ? JSON.stringify(str) : str)}`);
    }
}
console.debug = (str) => {
    if (argv.dev) {
        console.log(`${Chalk.black.bgCyan("[DEBUG]")} ${Chalk.cyanBright(typeof str === "object" ? JSON.stringify(str) : str)}`);
    }
}
console.error("Error information will showing.");
console.warn("Warn information will showing.");
console.debug("Debug information will showing.");
