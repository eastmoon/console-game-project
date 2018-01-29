/*
    Application, main application system, using singleton-facade pattern.
    use it to retrieve Views, Models, Controllers.

    author: jacky.chen
*/
import Singleton from "utils/patterns/singleton";
import Views from "./views";
import Controllers from "./controllers";
import Models from "./models";

// Singleton class
export default class Application extends Singleton {
    // Static attribute, Class static name.
    static get appName() {
        return "System.Application";
    }

    install() {
        console.log("MVC initial");
        // If re-new class, constructor will duplicate call.
        // This issue have two solution.
        // 1. never use new class to retrieve instance
        // 2. re-new class, and when first time call canstructor, will use install function.
        // declared member variable
        this.views = {
            layers: new Views(),
            modules: new Views()
        };
        this.controllers = new Controllers();
        this.models = {
            services: new Models(),
            proxy: new Models(),
            data: new Models()

        }
    }

    // Static attribute, retrieve Views object.
    static get views() {
        return Application.instance.views;
    }
    // Static attribute, retrieve controllers object.
    static get controllers() {
        return Application.instance.controllers;
    }
    // Static attribute, retrieve models object.
    static get models() {
        return Application.instance.models;
    }
}
