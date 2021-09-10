import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    text : { type : String , required : true},
    owner : { type : mongoose.Schema.Types.ObjectId, required:true, ref : "User"}, //댓글의 소유자
    video : { type : mongoose.Schema.Types.ObjectId, required:true, ref : "Video"}, //댓글이 달린 비디오
    createdAt : {type :Date, required : true, trim:true, default : Date.now},
});
const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
