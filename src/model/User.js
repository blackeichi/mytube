import bcrypt from "bcrypt";
import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    avatarUrl : String,
    email : {type : String, required:true, unique:true},
    username : {type:String, required:true, unique:true},
    password : {type:String, required:true},
    name : {type:String, required:true},
    location:{type:String},
    opinions : [{type : mongoose.Schema.Types.ObjectId,ref:"Opinion"}],
    comments : [{type:mongoose.Schema.Types.ObjectId, ref : "Comment"}], //해당유저의 댓글과 비디오는 여러개일 수 있으므로 배열로 묶는다.
    videos : [{type:mongoose.Schema.Types.ObjectId, ref:"Video"}],
});
userSchema.pre("save", async function(){
    this.password = await bcrypt.hash(this.password, 5);
});
const User = mongoose.model("User", userSchema);
export default User;