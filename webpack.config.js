const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
module.exports = {
    entry : "./src/client/js/main.js",
    mode : "development",
    plugins : [new MiniCssExtractPlugin({
        filename : "css/style.css",
    })],
    output : {
        path : path.resolve(__dirname, "assets"),
        filename : "js/main.js",
    },
    module:{
        rules : [
            {
                test : /\.js$/,
                use : {
                    loader : "babel-loader",
                    options :{
                        presets : [["@babel/preset-env", {targets:"defaults"}]],
                    }
                }
            },
            {
                test : /\.scss$/,
                use : [MiniCssExtractPlugin.loader,"css-loader","sass-loader"],
            }
        ]
    }
}