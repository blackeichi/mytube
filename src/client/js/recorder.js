const startBtn = document.getElementById("startBtn");
const cancleBtn = document.getElementById("cancleBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const handlereset = () =>{
    window.location.reload();
}
const handleDownload = () =>{
    const a = document.createElement("a");
    a.href = videoFile;
    a.download = "MyRecording.webm";
    document.body.appendChild(a);
    a.click();
};

const handleStop = () =>{
    startBtn.innerText = "Download Recording";
    startBtn.removeEventListener("click", handleStop);
    startBtn.addEventListener("click", handleDownload);
    cancleBtn.addEventListener("click", handlereset);
    recorder.stop();
}

const handleStart = () =>{
    startBtn.innerText = "Stop Recording";
    startBtn.removeEventListener("click", handleStart);
    startBtn.addEventListener("click", handleStop);
    recorder = new MediaRecorder(stream, {mimeType : "video/webm"});
    recorder.ondataavailable = (event) =>{
        videoFile = URL.createObjectURL(event.data);
        video.srcObject = null;
        video.src = videoFile;
        video.loop = true;
        video.play();
    };
    recorder.start();
}
const init = async () =>{
    stream = await navigator.mediaDevices.getUserMedia({
        audio : true,
        video : true,
    });
    video.srcObject = stream;
    video.play();
    console.log("video");
};

init();

startBtn.addEventListener("click", handleStart);
cancleBtn.addEventListener("click", handlereset);