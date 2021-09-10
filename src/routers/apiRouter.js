import express from "express";
import { registerView, hateVideo, likeVideo, createComment } from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView);
apiRouter.post("/videos/:id([0-9a-f]{24})/like", likeVideo);
apiRouter.post("/videos/:id([0-9a-f]{24})/hate", hateVideo);
apiRouter.post("/videos/:id([0-9a-f]{24})/comment",createComment);

export default apiRouter;