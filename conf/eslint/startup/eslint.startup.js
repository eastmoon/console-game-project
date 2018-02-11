// Library
//
import {configureLint} from "./eslint.startup.lint";
//
import {configureNodemon} from "./eslint.startup.nodemon";
// Project build tools
import {resolve} from "./eslint.util";

// 編譯模組輸出
module.exports = (config) => {
    // Config eslint rules.
    configureLint(config);

    // Config nodemon, watcher folder and checking file style.
    configureNodemon(config);
}
