// Add root path into project env by module app-module-path.
// It will have bug if root path setting in main.js.
// Maybe it will happen, because import and require execution flow difference.
import {addPath} from "app-module-path";
import path from "path";
// Add root path.
addPath(path.join(process.cwd(), "src"));
// Delete paths cache.
delete require.cache[__filename];
