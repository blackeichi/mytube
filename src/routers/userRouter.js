import express from "express";
import {getChangePassword,postChangePassword,getEdit,postEdit, removeProfile, logout, profile} from "../controllers/userController";
import {protectorMiddleware, uploadFiles,thumbnailDowunload} from "../middlewares";

const userRouter = express.Router();

userRouter.get("/deleteProfile", removeProfile);
userRouter.get("/logout",protectorMiddleware, logout);
userRouter.route("/edit-profile").all(protectorMiddleware).get(getEdit).post(uploadFiles.single("avatar"),postEdit);
userRouter.route("/changepassword").all(protectorMiddleware).get(getChangePassword).post(postChangePassword);
userRouter.get("/:id", profile);

export default userRouter;

