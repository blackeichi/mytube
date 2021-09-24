import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { async } from "regenerator-runtime";
const thumbform = document.getElementById("thumbform");


let videoFile;

const handlethumb = async(event) =>{
    event.preventDefault();
    console.log("hi");
    const makethumb = thumbform.getElementById("makethumb");
    //const thumbvideo = event.data;
    console.log(thumbvideo);
};

thumbform.addEventListener("submit",handlethumb);