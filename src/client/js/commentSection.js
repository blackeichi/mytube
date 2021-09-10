const videobox = document.getElementById("videobox");
const form = document.getElementById("commentForm");

const handleSubmit = (event) =>{
    event.preventDefault();
    //이벤트 작동시 브라우저가 행동을 멈춤. 그렇게하지 않으면 폼을 제출하고 순식간에 초기화됌
    const textarea = form.querySelector("textarea");
    const text = textarea.value;
    const videoId = videobox.dataset.id;
    if(text === ""){
        return;
    }//작성된 text가 없으면 return
    fetch(`/api/videos/${videoId}/comment`,{
        //JS 내용을 backend로 내보내는 역활
        method:"POST",
        headers:{
            "Content-Type" : "application/json",
            //express 미들웨어가 제대로 (변환)읽을 수 있도록, String 처럼 보이지만 Js object 임을 알림.
        },
        body : JSON.stringify({text}),
        //req.body 를 보냄. text를 string화 시키고, index.js에 app.use(express.json())를 추가하여 JS object로 변환;
    });
};
if(form){
    form.addEventListener("submit", handleSubmit);
}
