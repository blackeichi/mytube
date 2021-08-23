import express from "express";
import {editVideo, watch, upload, deleteVideo,postEditVideo} from "../controllers/videoController";

const videoRouter = express.Router();
videoRouter.get("/upload", upload);
videoRouter.get("/:id(\\d+)", watch);
videoRouter.route("/:id(\\d+)/edit").get(editVideo).post(postEditVideo);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);

export default videoRouter;