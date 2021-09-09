import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const startBtn = document.getElementById("startBtn");
const cancleBtn = document.getElementById("cancleBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const files = {
    input : "recording.webm",
    output : "output.mp4",
    thumb : "thumbnail.jpg",
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

const handleDownload = async() =>{
    startBtn.removeEventListener("click", handleDownload);
    //버튼 클릭 이벤트 비활성화
    startBtn.innerText = "Transcoding...";
    startBtn.disabled= true;
    //버튼 비활성화

    const ffmpeg = createFFmpeg({log : true, corePath:"/static/ffmpeg-core.js"});
    //ffmpeg 활성화
    await ffmpeg.load();
    //프로그램을 실행하는데 시간이 걸리므로 await를 사용한다.
    ffmpeg.FS("writeFile", files.input, await fetchFile(videoFile));
    //write - run - read 과정을 거쳐야함. files.input = "recording.webm"에 videoFile 적기
    await ffmpeg.run("-i", files.input, "-r", "60", files.output);
    //"recording.webm"을 input하여 60rating으로 files.output = output.mp4로 출력
    await ffmpeg.run("-i", files.input, "-ss","00:00:01", "-frames:v","1",files.thumb);
    //"recording.webm"에서 비디오의 1초 대의 스크린샷을 1장만 files.thumb에 저장

    const mp4File = ffmpeg.FS("readFile", files.output);
    const thumbFile = ffmpeg.FS("readFile", files.thumb);

    const mp4Blob = new Blob([mp4File.buffer], {type: "video/mp4"});
    const thumbBlob = new Blob([thumbFile.buffer], {type : "image/jpg"});

    const mp4Url = URL.createObjectURL(mp4Blob);
    const thumbUrl = URL.createObjectURL(thumbBlob);

    downloadFile(mp4Url, "MyRecording.mp4");
    downloadFile(thumbUrl, "MyThumbnail.jpg");

    ffmpeg.FS("unlink", files.input);
    ffmpeg.FS("unlink", files.output);
    ffmpeg.FS("unlink", files.thumb);
    URL.revokeObjectURL(mp4Url);
    URL.revokeObjectURL(thumbUrl);
    URL.revokeObjectURL(videoFile);
    //사이트가 무거워지므로 리코딩관련 파일 삭제.
    startBtn.disabled = false;
    startBtn.innerText = "Record Again";
    startBtn.addEventListener("click", handleStart);
}
const handlereset = () =>{
    window.location.reload();
}

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
        video : {
            width : 1024,
            height : 576
        }
    });
    video.srcObject = stream;
    video.play();
    console.log("video");
};

init();

startBtn.addEventListener("click", handleStart);
cancleBtn.addEventListener("click", handlereset);