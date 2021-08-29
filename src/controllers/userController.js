import User from "../model/User";
import Video from "../model/Video";
import bcrypt from "bcrypt";

export const getJoin = (req,res) =>res.render("join", {pageTitle : "Join"});
export const postJoin =async(req,res) =>{
    const {name,username,email,password,confirmPW,location} = req.body;
    const pageTitle = "Join";
    if(password !==confirmPW){
        return res.render("join", {
            pageTitle,
            errorMessage : "Password confirmation does not match",
        });
    };
    const usernameExists = await User.exists({username:username});
    if(usernameExists){
        return res.render("join",{
            pageTitle,
            errorMessage : "This email is already taken",
        });
    };
    const emailExists = await User.exists({email:email});
    if(emailExists){
        return res.render("join",{
            pageTitle,
            errorMessage : "This email is already taken",
        });
    };
    try{
        await User.create({
            name,
            username,
            email,
            password,
            location,
        });
        return res.redirect("/login");
    }catch(error){
        return res.status(400).render("join",{pageTitle:"Upload video", errorMessage:error._message,});
    }
};
export const getLogin = (req,res) =>res.render("login",{pageTitle:"Login"});
export const postLogin = async(req, res)=>{
    const {username,password} = req.body;
    const pageTitle = "Login";
    const user = await User.findOne({username : username});
    if(!user){
        return res.status(400).render("login",{
            pageTitle,
            errorMessage : "An account with this username does not exists."
        });
    }
    const ok = await bcrypt.compare(password, user.password);
    if(!ok){
        return res.status(400).render("login",{
            pageTitle,
            errorMessage : "Wrong password",
        });
    }
    req.session.loggedIn=true;
    req.session.user = user;
    return res.redirect("/");
};
export const getEdit = (req,res) => {
    return res.render("edit-profile", {pageTitle : "Edit profile"});
};
export const postEdit = async(req,res) =>{
    const{
        session : {user:{_id, avatarUrl},},
        body : {name, email, username,location},
        file,
    } = req;
    await User.findByIdAndUpdate(_id,{
        avatarUrl : file ? file.path : avatarUrl,
        name,
        email,
        username,
        location
    });
    req.session.user = {
        ...req.session.user,
        name,
        email,
        username,
        location,
    };
    return res.redirect("/users/edit-profile");
};
export const getChangePassword = (req,res) =>{
    return res.render("users/changepassword", {pageTitle : "Change Password"});
};
export const postChangePassword =async (req, res) =>{
    const{
        session:{
            user:{_id}
        },
        body:{oldPassword, newPassword, confirmPassword},
        }=req;
    const user = await User.findById(_id);
    const ok = await bcrypt.compare(oldPassword, user.password);
    if(!ok){
        return res.status(400).render("users/changepassword",{
            pageTitle : "Change Password",
            errorMessage : "The current password is incorrect"
        });
    }
    if(newPassword !== confirmPassword){
        return res.status(400).render("users/changepassword", {
            pageTitle : "Change Password",
            errorMessage : "The password does not match the confirmation"
        });
    }
    user.password = newPassword;
    await user.save();
    return res.redirect("/users/logout");
};
export const logout = (req,res) =>{
    console.log(req.session);
    req.session.destroy();
    return res.redirect("/");
};
export const profile = async(req,res) =>{
    const {id} = req.params;
    const user = await User.findById(id);
    if(!user){
        return res.status(400).render("404", {pageTitle : "User not found."});
    };
    const videos = await Video.find({owner : user._id});
    return res.render("users/profile", {pageTitle : user.name + " profile", user:user, videos});
};
export const removeProfile = (req,res) =>res.send("removeProfile");