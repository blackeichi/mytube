import { async } from "regenerator-runtime";

const videobox = document.getElementById("videobox");
const form = document.getElementById("commentForm");
const deletecomment = document.querySelectorAll(".deletecomment");

const addComment = (text ,newCommentId) => {
    //새로고침하지 않아도 바로 댓글내용이 보이도록 fake댓글 만들기
    const videoComments = document.querySelector(".video__comments ul");
    const newComment = document.createElement("li");
    newComment.dataset.id = newCommentId;
    newComment.className = "video__comment";
    const icon = document.createElement("i");
    icon.className = "fas fa-comment";
    const span = document.createElement("span");
    span.innerText = ` ${text}`;
    const span2 = document.createElement("span");
    span2.innerText = " 삭제";
    span2.className = "deletecomment";
    span2.style.cursor = "pointer";
    newComment.appendChild(icon);
    newComment.appendChild(span);
    newComment.appendChild(span2);
    videoComments.prepend(newComment);
    //appendChild = 순서대로, prepend = 역순으로

    span2.addEventListener("click", async()=>{
        const response = await fetch(`/api/videos/${newCommentId}/delete`,{
            method : "DELETE",
            
        });
        if(response.status === 201){
            newComment.remove();
        }
    })

}
const handleSubmit = async(event) =>{
    event.preventDefault();
    //이벤트 작동시 브라우저가 행동을 멈춤. 그렇게하지 않으면 폼을 제출하고 순식간에 초기화됌
    const input = form.querySelector("input");
    const text = input.value;
    const videoId = videobox.dataset.id;
    if(text === ""){
        return;
    }//작성된 text가 없으면 return
    const response = await fetch(`/api/videos/${videoId}/comment`,{
        //await로 status값을 응답받음.//JS 내용을 backend로 내보내는 역활
        method:"POST",
        headers:{
            "Content-Type" : "application/json",
            //express 미들웨어가 제대로 (변환)읽을 수 있도록, String 처럼 보이지만 Js object 임을 알림.
        },
        body : JSON.stringify({text}),
        //req.body 를 보냄. text를 string화 시키고, index.js에 app.use(express.json())를 추가하여 JS object로 변환;
    });
    input.value = "";
    //텍스트 입력칸 초기화
    if(response.status === 201) {
        const {newCommentId} = await response.json();
        addComment(text,newCommentId);
        //201status라면 댓글작성
    }
};

const handleDelete = async(event)=>{
    console.log("hi");
    const li = event.target.parentElement;
    const CommentId = event.target.dataset.id;
    console.log(CommentId);

    const response = await fetch(`/api/videos/${CommentId}/delete`,{
        method : "DELETE",
    });
    if(response.status === 201){
        li.remove();
    }
    
}

if(form){
    form.addEventListener("submit", handleSubmit);
};

for(let i = 0; i < deletecomment.length; i++){
    deletecomment[i].addEventListener("click", handleDelete);
}