const navBar = document.querySelector("nav"),
    menuBTN = document.querySelectorAll(".menu-btn"),
    Overlay = document.querySelector(".overlay");

menuBTN.forEach((menuBTN)=>
{
    menuBTN.addEventListener("click", ()=>{
        navBar.classList.toggle("display");
    });
});
Overlay.addEventListener("click", ()=>{
    navBar.classList.remove("display");
});