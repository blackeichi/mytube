import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/mytube",{
    useNewUrlParser : true,
    useUnifiedTopology : true,
});
const db = mongoose.connection;

const handleOpen = () => console.log("✔ Connected to DB");
const handleError = () => console.log("💥 Failed DB");
db.on("error" , handleError);
db.once("open", handleOpen);