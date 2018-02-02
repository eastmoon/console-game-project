// Library

//
export function emptyVariable($variable) {
    return typeof $variable === "undefined" || $variable === null;
}

//
export function isClass($variable) {
    return typeof $variable === "function" && typeof $variable.prototype === "object" && typeof $variable.prototype.execute === "function";
}
