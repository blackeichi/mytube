import express from "express";
import { registerView, hateVideo, likeVideo, createComment,makeThumbnail } from "../controllers/videoController";
import {uploadFiles} from "../middlewares";

const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView);
apiRouter.post("/videos/:id([0-9a-f]{24})/like", likeVideo);
apiRouter.post("/videos/:id([0-9a-f]{24})/hate", hateVideo);
apiRouter.post("/videos/:id([0-9a-f]{24})/comment",createComment);
apiRouter.route("/uploads/makethumb").post(uploadFiles.single("makethumb"),makeThumbnail);
export default apiRouter;