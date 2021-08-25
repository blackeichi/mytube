import mongoose from "mongoose";
export const formatHashtags = (hashtags) => hashtags.split(",").map((word) => (word.startsWith("#") ? word : "#" + word));
const videoSchema = new mongoose.Schema({
    title : {type :String, required : true, trim:true, uppercase : true, minlength : 3},
    description : {type :String, required : true, trim:true, maxLength : 140},
    createdAt : {type :Date, required : true, trim:true, default : Date.now},
    hashtags : [{type : String, trim : true}],
    meta : {
        views : {type : Number, default : 0, required : true},
        like : {type : Number, default : 0},
        hate : {type : Number, default : 0},
    }
});
videoSchema.pre("save", async function(){
    this.hashtags=this.hashtags[0].split(",").map((word) => (word.startsWith("#") ? word : "#" + word));
})
const movieModel = mongoose.model("Video", videoSchema);
export default movieModel;