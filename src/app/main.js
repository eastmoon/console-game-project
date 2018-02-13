// Library, execute module polyfill before start application.
import "./polyfill";
// Library, startup application.
import Startup from "lib/gra/controller/startup";
//
import i18n from "i18n";

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
            system: ["exit", "create", "describe"],
            common: ["goto", "state", "equip", "say"],
            parser: {
                description: ["look"],
                direction: {
                    west: "west",
                    east: "east",
                    north: "north",
                    south: "south",
                    up: "up",
                    down: "down",
                },
                items: ["drop", "take"],
                npcs: ["kill"]
            }
        }
    };
    return new Startup(conf);
}

// 執行應用程式
module.exports();
