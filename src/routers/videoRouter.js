import express from "express";
import {editVideo, watch, upload, deleteVideo,postEditVideo,postUpload} from "../controllers/videoController";
import { protectorMiddleware, videoUpload } from "../middlewares";

const videoRouter = express.Router();
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").all(protectorMiddleware).get(editVideo).post(postEditVideo);
videoRouter.get("/:id([0-9a-f]{24})/delete", deleteVideo);
videoRouter.route("/upload").all(protectorMiddleware).get(upload).post(videoUpload.single("video"),postUpload);

export default videoRouter;