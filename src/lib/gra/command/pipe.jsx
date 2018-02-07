/*

*/
import Pipe from "lib/mvc/progress/pipe";
import Application from "lib/gra";

export default class GRAPipe extends Pipe {
    // Accessor
    get application() {
        return Application.instance;
    }
    get help() {
        return "";
    }
}
