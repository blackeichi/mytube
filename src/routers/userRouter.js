import express from "express";
import {editProfile, removeProfile, logout, profile} from "../controllers/userController";

const userRouter = express.Router();
userRouter.get("/logout", logout);
userRouter.get("/edit-profile", editProfile);
userRouter.get("/deleteProfile", removeProfile);
userRouter.get(":id", profile);

export default userRouter;

