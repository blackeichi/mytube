const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const volumeRange = document.getElementById("volume");
const currenTime = document.getElementById("currenTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenBtnIcon = fullScreenBtn.querySelector("i");
const videobox = document.getElementById("videobox");
const playcontrols__timeline = document.getElementById("playcontrols__timeline");
const likeBtn = document.getElementById("Like");
const hateBtn = document.getElementById("Hate");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const handleMuteClick = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtnIcon.classList = video.muted ? "fas fa-volume-mute" : "fas fa-volume-up";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    muteBtnIcon.classList = "fas.fa-volume-mute";
  }
  volumeValue = value;
  video.volume = value;
};

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(11, 8);

const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  currenTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

const handleTimelineChange = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};

const handleFullscreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullScreenBtnIcon.classList = "fas fa-expand-arrows-alt";
  } else {
    videobox.requestFullscreen();
    fullScreenBtnIcon.classList = "fas fa-compress-arrows-alt";
  }
};

const hideControls = () => playcontrols__timeline.classList.remove("showing");

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  playcontrols__timeline.classList.add("showing");
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 3000);
};
const handleEnded = () =>{
  const {id} = videobox.dataset;
  fetch("/api/videos/"+id+"/view", {method : "POST"})
}
const handleLikeBtn = async() =>{
  const span = document.getElementById("likenumber");
  const like = span.innerText;
  const {id} = videobox.dataset;
  const {status} = await fetch("/api/videos/"+id+"/like", {method : "POST"});
  if(status === 200){
    span.innerText =  parseInt(like) + 1;
  }else if(status === 401){
    
  }
}
const handleHateBtn = () =>{
  const span = document.getElementById("hatenumber");
  const hate = span.innerText;
  const {id} = videobox.dataset;
  const {status} = fetch("/api/videos/"+id+"/hate", {method : "POST"});
  if(status === 200){
    span.innerText =  parseInt(like) + 1;
  }else if(status === 401){
    
  }
}
playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullscreen);
video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);
video.addEventListener("ended", handleEnded);
likeBtn.addEventListener("click", handleLikeBtn);
hateBtn.addEventListener("click", handleHateBtn);