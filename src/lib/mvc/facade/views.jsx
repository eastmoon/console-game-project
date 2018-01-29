/*
    Views, an application sub system, focus on View which is a react.component render with ReactDOM.
    use it to register, retrieve, remove, check Views.

    Views have two category, layers and modules.
    - Layers is a top react.component, which will render using ReactDOM.render.
    - Modules is a normal react.component, which will render by other react.component render function.

    author: jacky.chen
*/

// Singleton class
export default class Views {
    constructor() {
        // declared member variable
        this.container = {};
    }

    // View register,
    register($name, $view) {
        // 1. check view is duplicate or not
        // view could be duplicate register by same name.
        if (typeof $view !== "undefined" &&
            typeof $name !== "undefined"
        ) {
            // 2. saving duplicate view.
            this.container[$name] = $view;
        } else {
            // 3. throw error message for duplicate register.
            return false;
        }
        return true;
    }

    // View remove,
    remove($name) {
        // 1. retrieve view, if exist, remove it.
        const obj = this.retrieve($name);
        if (obj !== null) {
            // remove target object in mapping.
            this.container[$name] = null;
        }
        // return target object.
        return obj;
    }

    // View retrieve,
    retrieve($name) {
        // using mapping to check, if exist return object, then return undefined
        if (this.has($name)) {
            return this.container[$name];
        }
        return null;
    }

    // View check,
    has($name) {
        // retireve object, if undefined then dosn't exist.
        if (typeof this.container[$name] === "undefined" || this.container[$name] === null) {
            return false;
        }
        return true;
    }

    // View execute action
    // This function is use at react-redux system.
    on(...$args) {
        // retrieve view object, first assign variable must be view name.
        if ($args.length > 0) {
            const name = $args[0];
            const param = $args.slice(1, $args.length);
            // retrieve object, if object have store, then dispatch action.
            const view = this.retrieve(name);
            if (view !== null && typeof view.store !== "undefined" && view.store !== null && typeof view.store.on === "function") {
                view.store.on(...param);
            }
        }
    }

    // update and draw all component in view
    // This function is use at react component.
    update($name = null) {
        // 1.check target view is all container or specify view in container.
        let targetView = this.container;
        if (this.has($name)) {
            targetView = [this.retrieve($name)];
        }

        // 2.update and draw target view
        for (const key in targetView) {
            if (Object.prototype.hasOwnProperty.call(targetView, key)) {
                const view = targetView[key];
                // check target view have "forceUpdate" function, it also mean this object is React.component.
                if (typeof view.forceUpdate === "function" && typeof view.deepForceUpdate === "function") {
                    view.deepForceUpdate();
                    // const obj = {_application_update_: new Date().getTime()};
                    // console.log(obj);
                }
            }
        }
    }
}
