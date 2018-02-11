// Library
import {emptyVariable} from "./verifity";
//
export function infoToString($progress, $resolve, $reject) {
    return {
        "progress": !emptyVariable($progress),
        "resolve": !emptyVariable($resolve),
        "reject": !emptyVariable($reject)
    };
}
