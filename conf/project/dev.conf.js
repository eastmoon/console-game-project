const argv = require("yargs").argv;
const projectlib =  require("./builder/project.builder");

// 編譯配置
module.exports = () => {
    const conf = {
      app: "app/main.js",
      lint: {
          stage: ["config", 0, 1]
      },
      argv: argv
    };
    projectlib(conf);
}

// 執行編譯
module.exports();
