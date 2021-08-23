import express from "express";
import {search, home} from "../controllers/videoController";
import { join, login } from "../controllers/userController";

const globalRouter = express.Router();
globalRouter.get("/", home);
globalRouter.get("/join", join);
globalRouter.get("/search", search);
export default globalRouter;
