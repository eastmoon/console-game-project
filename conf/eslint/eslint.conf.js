import eslint from "./startup/eslint.startup";

// 編譯配置
module.exports = () => {
    const conf = {
        stage: ["config", 0, 1, 2, 3]
    };
    eslint(conf);
}

// 執行編譯
module.exports();
