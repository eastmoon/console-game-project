// Library
import nodemon from "nodemon";
import chalk from "chalk";

// default options for config.options
export function configureNodemon() {
    nodemon({
        restartable: "rs",
        verbose: true,
        exec: "eslint  src/**/* --ext .json --ext .js",
        watch: ["src"],
        ext: "js json",
        env: {
            "NODE_ENV": "development"
        }
    });

    nodemon
        .on("start", function () {
            console.log(`${chalk.black.bgCyan("[NODEMON]")} ESLint checking start.`);
        })
        .on("quit", function () {
            console.log(`${chalk.black.bgRed("[NODEMON]")} ESLint checking has quit.`);
            process.exit();
        })
        .on("restart", function (file) {
            console.log(`${chalk.black.bgRed("[NODEMON]")} Modify : ${file}`);
        });
}
