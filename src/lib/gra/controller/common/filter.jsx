/*

*/
import Filter from "lib/mvc/progress/filter";
import Application from "lib/gra";

export default class GRAFilter extends Filter {
    // Accessor
    get application() {
        return Application.instance;
    }
}
