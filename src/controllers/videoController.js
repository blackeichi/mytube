import {reset} from "nodemon";
import Video, {formatHashtags} from "../model/Video";
import User from "../model/User";
import Comment from "../model/Comment";
import Opinion from "../model/Opinion";
import Makethumb from "../model/Makethumb";
import { async } from "regenerator-runtime";

export const home = async (req, res) => {
    const videos = await Video.find({}).sort({createdAt : "asc"}).populate("owner");
    return res.render("home", {pageTitle : "Homepage", videos});
};
export const watch = async(req, res) => {
    const {id} = req.params;
    const {user} = req.session;
    const video = await Video.findById(id).populate("owner").populate("comments").populate("opinions");
    const videos = await Video.find({owner : video.owner}).populate("owner").populate("comments");
    if(video){
        return res.render("watch", {pageTitle : "Play "+ video.title, video,videos});
    }
    return res.status(404).render("404", {pageTitle : "Video not found."});
};
export const editVideo = async(req, res) =>{
    const id = req.params.id;
    const video = await Video.findById(id);
    if(!video){
        return res.render("404", {pageTitle : "Video not found."});
    }
    return res.render("edit", {pageTitle : "Editing " + video.title, video})
};
export const postEditVideo = async(req, res) =>{
    const id = req.params.id;
    const {title, description, hashtags} = req.body;
    const video = await Video.findById(id);
    if(!video){
        return res.render("404", {pageTitle : "Video not found"});
    }
    await Video.findByIdAndUpdate(id,{
        title : title,
        description : description,
        hashtags : formatHashtags(hashtags),
    });
    return res.redirect("/videos/" + id);
};
export const upload = (req, res) => {
    return res.render("upload", {pageTitle : "Upload Video"});
};
export const postUpload = async(req, res) =>{
    const {user:{_id}} = req.session;
    const {video , thumb} = req.files;
    const {title, description, hashtags} = req.body;
    try{
        const newVideo = await Video.create({
            title, description,
            fileUrl : video[0].location,
            thumbUrl : thumb[0].location,
            owner : _id, 
            hashtags, meta :{
                views : 0,
                like : 0, 
                hate : 0,
            }
        });
    const user = await User.findById(_id);
    user.save();
    return res.redirect("/");
    }catch(error){
        console.log(error);
        return res.render("upload", {pageTitle : "Upload Video", errorMessage : error._message});
    };
};
export const deleteVideo = async(req, res) => {
    const id = req.params.id;
    await Video.findByIdAndDelete(id);
    return res.redirect("/");
};
export const search = async(req, res) => {
    const keyword = req.query.keyword;
    let videos =[];
    if(keyword){
        videos = await Video.find({
            title : {$regex : new RegExp(keyword, "i"),}
        });
    };
    return res.render("search",{pageTitle : "Search page", videos});
};

export const registerView = async(req,res) =>{
    const {id} = req.params;
    const video = await Video.findById(id);
    if(!video){
        return res.sendStatus(200);
    }
    video.meta.views = video.meta.views +1;
    await video.save();
    return res.sendStatus(200);
}

export const likeVideo = async(req,res) =>{
    const{
        session : {user},
        params : {id},
    } = req;
    const video = await Video.findById(id);
    if(!video){
        return res.sendStatus(404);
    }
    const opinionId = video.opinions[video.opinions.length-1]
    const opinion = await Opinion.create({
        owner : user._id,
        video : id,
    });
    console.log(opinionId);
    console.log(opinion.owner);
    if(JSON.stringify(opinionId) == JSON.stringify(opinion.owner)){        
        return res.sendStatus(401);
    }else{
        video.opinions.push(opinion.owner);
        video.meta.like = video.meta.like +1;
        await video.save();
        return res.sendStatus(200);
    }
}
export const hateVideo = async(req,res) =>{
    const{
        session : {user},
        params : {id},
    } = req;
    const video = await Video.findById(id);
    if(!video){
        return res.sendStatus(404);
    }
    const opinionId = video.opinions[video.opinions.length-1]
    const opinion = await Opinion.create({
        owner : user._id,
        video : id,
    });
    console.log(opinionId);
    console.log(opinion.owner);
    if(JSON.stringify(opinionId) == JSON.stringify(opinion.owner)){        
        return res.sendStatus(401);
    }else{
        video.opinions.push(opinion.owner);
        video.meta.hate = video.meta.hate +1;
        await video.save();
        return res.sendStatus(200);
    }
}

export const createComment = async(req, res) =>{
    const{
        session : {user},
        body : {text},
        params : {id},
    } = req;
    //fatch??? JS?????? object??? ????????? ????????? ???????????? ???????????????, user session?????? ????????? ??? ??????.
    //params = video??? ?????????
    const video = await Video.findById(id);
    if(!video){
        return res.sendStatus(404);
    }
    const comment = await Comment.create({
        text,
        owner : user._id,
        video : id,
    });
    video.comments.push(comment._id);
    //watch ????????? comments??? populate ?????? ??????, comment??? id??? video??? ??????
    video.save();
    return res.status(201).json({newCommentId : comment._id});
}
export const makeThumbnail = (req, res) =>{
    return res.render("CreateThumb", {pageTitle : "Create Video Thumb"});
};

export const deleteComment = async(req, res) => {
    const {id} = req.params;
    console.log(id);
    const comment = await Comment.findById(id);
    console.log(comment);

    if(!comment){
        return res.sendStatus(404);
    }

    if(String(req.session.user._id) !== String(comment.owner)){
        return res.sendStatus(404);
    }
    await Comment.findByIdAndDelete(id);
    return res.sendStatus(201);
}
