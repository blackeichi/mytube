let videos = [
    {
        title : "Video one",
        views : 10,
        id : 1
    },
    {
        title : "Video two",
        views : 10,
        id : 2
    },
    {
        title : "Video three",
        views : 10,
        id : 3
    },
    {
        title : "Video four",
        views : 10,
        id : 4
    },
    {
        title : "Video five",
        views : 10,
        id : 5
    }
]

export const home = (req, res) => {
    return res.render("home", {pageTitle : "Homepage", videos})
};
export const watch = (req, res) => {
    const id = req.params.id;
    const video = videos[id-1];
    return res.render("watch", {pageTitle : "Watching Video", video})
};
export const editVideo = (req, res) =>{
    const id = req.params.id;
    const video = videos[id-1];
     return res.render("edit", {pageTitle : "Editing " + video.title, video})
};
export const postEditVideo = (req, res) =>{
    const id = req.params.id;
    console.log(req.body);
    const video = req.body.video;
    videos[id-1].title = video;
    return res.redirect("/videos/" + id);
};
export const upload = (req, res) => res.send("upload");
export const search = (req, res) => res.send("search");
export const deleteVideo = (req, res) => res.send("deleteVideo");