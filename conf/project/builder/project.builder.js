// Library
import {execSync} from "child_process";

// Project build tools
// Project build tools
import {resolve} from "./project.util";
import {configureLint} from "./project.builder.lint";

// 編譯模組輸出
module.exports = (config) => {
    // Config eslint rules.
    configureLint(config);

    // Sync execute OS command, or Node.js script which defined in package.json.
    // Execute nodemon and watch project folder, and to development modal with eslint.
    const cmd = execSync("babel-node conf/project/nodemon/default.conf.js", {
        cwd: process.cwd(),
        stdio: [process.stdin, process.stdout, process.stderr]
    });
}
