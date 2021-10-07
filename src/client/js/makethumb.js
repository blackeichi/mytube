import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { async } from "regenerator-runtime";
//const thumbform = document.getElementById("thumbform");
const makethumb = document.getElementById("makethumb");
const button = document.getElementById("button");
const video = document.getElementById("video");

let videourl;

const thumbfile = {
    input : "video.webm",
    output : "thumbnail.jpg",
};

const downloadFile = (fileUrl, fileName) =>{
    //fielUrl 과 fielName을 입력받음.
    const a = document.createElement("a");
    a.href = fileUrl;
    //다운받을 수 있는 주소
    a.download = fileName;
    //다운로드 될 파일이름
    document.body.appendChild(a);
    a.click();
};


const handledownloadthumb = async() =>{
    event.preventDefault();
    button.removeEventListener("click",handledownloadthumb);
    button.innerText = "Creating Thumbnail...";
    button.disabled = true;

    const ffmpeg = createFFmpeg({log : true, corePath:"/static/ffmpeg-core.js"});
    await ffmpeg.load();
    ffmpeg.FS("writeFile", thumbfile.input, await fetchFile(videourl));
    await ffmpeg.run("-i", thumbfile.input, "-ss","00:00:01", "-frames:v","1",thumbfile.output);

    const thumbFile = ffmpeg.FS("readFile", thumbfile.output);
    const thumbBlob = new Blob([thumbFile.buffer], {type : "image/jpg"});
    const thumbUrl = URL.createObjectURL(thumbBlob);

    downloadFile(thumbUrl, "MyThumbnail.jpg");

    ffmpeg.FS("unlink", thumbfile.input);
    ffmpeg.FS("unlink", thumbfile.output);

    URL.revokeObjectURL(thumbUrl);

    button.disable = false;
    button.innerText = "Upload";
    button.addEventListener("click", handlethumb);
}

const handlethumb = (event) =>{
    event.preventDefault();
    button.innerText = "Download Thumb";
    button.removeEventListener("click", handlethumb);
    button.addEventListener("click",handledownloadthumb)
    const videoFile = makethumb.files[0];
    console.log(videoFile);
    const blobfile = new Blob([videoFile], {type: "video/mp4"});
    console.log(blobfile);
    videourl = URL.createObjectURL(blobfile); 
    console.log(videourl);
    video.srcObject = null;
    video.src = videourl;
    video.loop = true;
    video.play();
};

button.addEventListener("click",handlethumb);