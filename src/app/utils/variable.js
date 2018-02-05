// yargs processing CLI param "--variable=x" and "variable=x".
// "--variable=x" will be argv.variable = 5
// "variable=x" will not processing, and push into argv._ = ["variable=x"]
import {argv} from "yargs";
Object.keys(argv).forEach((key) => {
    console.debug(`${key} : ${argv[key]}`);
});

// Bug fix for yarn doesn't give using npm_config_run_args.
// translate "variable=x" to npm_conifg_vairable=x.
// Method 1, using yargs package.
Object.keys(argv).forEach((key) => {
    if (key !== "_") {
        console.debug(`npm_config_${key} = ${argv[key]}`);
    } else {
        argv._.forEach((item) => {
            if (item.includes("=")) {
                var obj = item.split("=");
                console.debug(`npm_config_${obj[0]} = ${obj[1]}`);
            }
        });
    }
});
