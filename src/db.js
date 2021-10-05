import mongoose from "mongoose";

mongoose.connect("mongodb+srv://blackeichi:CNuvhQJGUlo8RIK2@cluster0.oe43k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    useNewUrlParser : true,
    useUnifiedTopology : true,
});
const db = mongoose.connection;

const handleOpen = () => console.log("✔ Connected to DB");
const handleError = () => console.log("💥 Failed DB");
db.on("error" , handleError);
db.once("open", handleOpen);