const nodemon = require("nodemon");
const chalk = require("chalk");

// default options for config.options
nodemon({
    restartable: "rs",
    verbose: true,
    exec: "eslint src/app/main.js",
    watch: ["src"],
    ext: "js json",
    env: {
      "NODE_ENV": "development"
    }
});

nodemon.on("start", function () {
    console.log(chalk.black.bgCyan("[NODEMON]") + " Application development model start.");
}).on("quit", function () {
    console.log(chalk.black.bgRed("[NODEMON]") + " Application has quit.");
    process.exit();
}).on("restart", function (file) {
    console.log(chalk.black.bgRed("[NODEMON]") + " Modify : ", file);
});
