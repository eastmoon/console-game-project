// Library, execute module polyfill before start application.
import "./polyfill";

// Library, startup application.
import Startup from "./commands/startup";
const startup = new Startup();
startup.execute();
