const path = require("path");
module.exports = {
    entry : "./src/client/js/main.js",
    mode : "development",
    output : {
        path : path.resolve(__dirname, "assets"),
        filename : "js/main.js",
    }
};