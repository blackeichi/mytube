import mongoose from "mongoose";

const opinionSchema = new mongoose.Schema({
    owner : { type : mongoose.Schema.Types.ObjectId, required:true, ref : "User"},
    video : { type : mongoose.Schema.Types.ObjectId, required:true, ref : "Video"},
});
const Opinion = mongoose.model("Opinion", opinionSchema);

export default Opinion;
