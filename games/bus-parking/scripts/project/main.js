window.addEventListener("keydown", function(e) {
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
// Import any other script files here, e.g.:
// import * as myModule from "./mymodule.js";