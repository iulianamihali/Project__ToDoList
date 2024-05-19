function add()
{
    let modal = document.getElementById("myModal");
    let close = document.getElementById("close");
    modal.style.display = "block";
    close.onclick = function() {
        modal.style.display = "none";
    }

}