const sidebar = document.getElementById("sidebar");
const sidebar2 = document.getElementById("sidebar_extend");
const sidebarBtn = document.getElementById("sidebarBtn");
const sidebarCloseBtn = document.getElementById("sidebarCloseBtn");
const basemenu = document.getElementById("basemenu");


const handleClick = () =>{
    sidebar2.style.display = "flex";
    sidebar.style.display = "none";
    //sidebarBtn.style.display = "none";
}
const handleClose = () =>{
    sidebar2.style.display = "none";
    sidebar.style.display = "flex";
}


sidebarBtn.addEventListener("click", handleClick);
sidebarCloseBtn.addEventListener("click", handleClose);