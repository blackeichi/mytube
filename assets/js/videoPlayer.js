(()=>{function e(e,t,n,a,u,r,i){try{var o=e[r](i),d=o.value}catch(e){return void n(e)}o.done?t(d):Promise.resolve(d).then(a,u)}var t=document.querySelector("video"),n=document.getElementById("play"),a=n.querySelector("i"),u=document.getElementById("mute"),r=u.querySelector("i"),i=document.getElementById("volume"),o=document.getElementById("currenTime"),d=document.getElementById("totalTime"),s=document.getElementById("timeline"),c=document.getElementById("fullScreen"),l=c.querySelector("i"),m=document.getElementById("videobox"),v=document.getElementById("playcontrols__timeline"),f=document.getElementById("Like"),p=document.getElementById("Hate"),E=null,y=null,g=.5;t.volume=g;var h=function(e){return new Date(1e3*e).toISOString().substr(11,8)},L=function(){return v.classList.remove("showing")},T=function(){var t,n=(t=regeneratorRuntime.mark((function e(){var t,n,a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=document.getElementById("likenumber"),n=t.innerText,a=m.dataset.id,e.next=5,fetch("/api/videos/"+a+"/like",{method:"POST"});case 5:200===e.sent.status&&(t.innerText=parseInt(n)+1);case 8:case"end":return e.stop()}}),e)})),function(){var n=this,a=arguments;return new Promise((function(u,r){var i=t.apply(n,a);function o(t){e(i,u,r,o,d,"next",t)}function d(t){e(i,u,r,o,d,"throw",t)}o(void 0)}))});return function(){return n.apply(this,arguments)}}();n.addEventListener("click",(function(e){t.paused?t.play():t.pause(),a.classList=t.paused?"fas fa-play":"fas fa-pause"})),u.addEventListener("click",(function(e){t.muted?t.muted=!1:t.muted=!0,r.classList=t.muted?"fas fa-volume-mute":"fas fa-volume-up",i.value=t.muted?0:g})),i.addEventListener("input",(function(e){var n=e.target.value;t.muted&&(t.muted=!1,r.classList="fas.fa-volume-mute"),g=n,t.volume=n})),t.addEventListener("loadedmetadata",(function(){d.innerText=h(Math.floor(t.duration)),s.max=Math.floor(t.duration)})),t.addEventListener("timeupdate",(function(){o.innerText=h(Math.floor(t.currentTime)),s.value=Math.floor(t.currentTime)})),s.addEventListener("input",(function(e){var n=e.target.value;t.currentTime=n})),c.addEventListener("click",(function(){document.fullscreenElement?(document.exitFullscreen(),l.classList="fas fa-expand-arrows-alt"):(m.requestFullscreen(),l.classList="fas fa-compress-arrows-alt")})),t.addEventListener("mousemove",(function(){E&&(clearTimeout(E),E=null),y&&(clearTimeout(y),y=null),v.classList.add("showing"),y=setTimeout(L,3e3)})),t.addEventListener("mouseleave",(function(){E=setTimeout(L,3e3)})),t.addEventListener("ended",(function(){var e=m.dataset.id;fetch("/api/videos/"+e+"/view",{method:"POST"})})),f.addEventListener("click",T),p.addEventListener("click",(function(){var e=document.getElementById("hatenumber"),t=(e.innerText,m.dataset.id);200===fetch("/api/videos/"+t+"/hate",{method:"POST"}).status&&(e.innerText=parseInt(like)+1)}))})();