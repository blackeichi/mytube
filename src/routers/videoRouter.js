import express from "express";
import {editVideo, watch, upload, deleteVideo,postEditVideo,postUpload} from "../controllers/videoController";

const videoRouter = express.Router();
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/upload").get(upload).post(postUpload);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(editVideo).post(postEditVideo);
videoRouter.get("/:id([0-9a-f]{24})/delete", deleteVideo);

export default videoRouter;