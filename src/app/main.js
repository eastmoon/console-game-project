// Library, execute module polyfill before start application.
import "./polyfill";
// Library, startup application.
import Startup from "lib/gra/controller/startup";

// 應用程式啟動配置
module.exports = () => {
    // 遊戲設定
    const conf = {
        status: {
            command: {
                cmd: "goto",
                param: ["asia/taiwan"]
            },
            view: "input"
        },
        plugin: {
            system: ["exit"],
            common: ["goto", "source", "equip", "123", "456", "789"],
            parser: {
                description: ["look", "time"],
                "description.long": ["llook"]
            }
        }
    };
    return new Startup(conf);
}

// 執行應用程式
module.exports();
