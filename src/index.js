import "dotenv/config";
import "regenerator-runtime";
import "./db";
import MongoStore from "connect-mongo";
import Video from "./model/Video";
import User from "./model/User";
import Comment from "./model/Comment";
import Opinion from "./model/Opinion";
import Makethumb from "./model/Makethumb";
import flash from "express-flash";
import express from "express";
import morgan from "morgan";
import session from "express-session";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import apiRouter from "./routers/apiRouter";
import { localsMiddleware } from "./middlewares";

const PORT = process.env.PORT || 4000;
const app = express();
const logger = morgan("dev");
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(flash());
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(
    session({
        secret : process.env.COOKIE_SECRET,
        resave : true,
        saveUninitialized : true,
    })
);
app.use((req, res, next) => { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
    next();
});
app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"),express.static("node_modules/@ffmpeg/core/dist"));
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
app.use("/api", apiRouter);

const handleListening = () => console.log("❤ 서버가 포트"+PORT+"으로 Listening 하고 있다. http://localhost:" + PORT);
console.log("hi");
app.listen(PORT, handleListening);