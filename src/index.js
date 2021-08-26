import "./db";

import Video from "./model/Video";
import User from "./model/User";
import express from "express";
import morgan from "morgan";
import session from "express-session";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";

const PORT = "4000";
const app = express();
const logger = morgan("dev");
app.use(logger);
app.use(express.urlencoded({extended : true}));
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(
    session({
        secret : "Hello",
        resave : true,
        saveUninitialized : true,
    })
);
app.use(localsMiddleware);
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

const handleListening = () => console.log("❤ 서버가 포트 4000으로 Listening 하고 있다. http://localhost:" + PORT);
console.log("hi");
app.listen(PORT, handleListening);