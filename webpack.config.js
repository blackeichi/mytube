const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
module.exports = {
    entry : {
        videoPlayer : "./src/client/js/videoPlayer.js",
        main: "./src/client/js/main.js",
        recorder : "./src/client/js/recorder.js",
        commentSection : "./src/client/js/commentSection.js",
        makethumb : "./src/client/js/makethumb.js",
        sidebar : "./src/client/js/sidebar.js"
    },
    //mode : "development", 이제 서버로 만들거기에 삭제
    plugins : [new MiniCssExtractPlugin({
        filename : "css/style.css",
    })],
    output : {
        path : path.resolve(__dirname, "assets"),
        filename : "js/[name].js",
        clean :true,
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