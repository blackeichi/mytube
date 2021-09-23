import express from "express";
import {editVideo, watch, upload, deleteVideo,postEditVideo,postUpload, makeThumbnail,postmakeThumbnail} from "../controllers/videoController";
import { protectorMiddleware, videoUpload,thumbnailDowunload } from "../middlewares";

const videoRouter = express.Router();
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").all(protectorMiddleware).get(editVideo).post(postEditVideo);
videoRouter.get("/:id([0-9a-f]{24})/delete", deleteVideo);
videoRouter.route("/upload").all(protectorMiddleware).get(upload).post(videoUpload.fields([{name:"video"},{name:"thumb"}]),postUpload);
//파일이 두개 이므로 single->fields로 videoController에 req.file -> req.files로 변경한다.
videoRouter.route("/CreateVideoThumb").get(makeThumbnail).post(thumbnailDowunload.single("makethumb"),postmakeThumbnail);

export default videoRouter;