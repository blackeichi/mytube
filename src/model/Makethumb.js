import mongoose from "mongoose";

const makethumbSchema = new mongoose.Schema({
    fileUrl : [{type : String, required : true}],
});
const makethumb = mongoose.model("makethumb", makethumbSchema);

export default makethumb;
