import {reset} from "nodemon";
import Video, {formatHashtags} from "../model/Video";
import User from "../model/User";

export const home = async (req, res) => {
    const videos = await Video.find({}).sort({createdAt : "asc"}).populate("owner");
    return res.render("home", {pageTitle : "Homepage", videos});
};
export const watch = async(req, res) => {
    const {id} = req.params;
    const video = await Video.findById(id).populate("owner");
    const videos = await Video.find({owner : video.owner}).populate("owner");
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
    const file = req.file;
    const {title, description, hashtags} = req.body;
    try{
        const video = new Video({
            title, description,
            fileUrl : file.path,
            owner : _id, 
            hashtags, meta :{
                views : 0,
                like : 0, 
                hate : 0,
            }
        });
    await video.save();
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