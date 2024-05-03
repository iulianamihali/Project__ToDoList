function add()
{
    console.log("intru");
    let modal = document.getElementById("myModal");
    let close = document.getElementById("close");
    /*let modalHeader = document.getElementById("modalHeader");
    let modalBody = document.getElementById("textarea");

    let modalData = {
        title: "Task 1",
        content: "Here is some dynamic content for the modal. Modify this based on your application's needs."
    };

    // When the user clicks the button, open the modal with dynamic content

    modalHeader.textContent = modalData.title;  // Set the title
    modalBody.textContent = modalData.content;  // Set the body*/
    modal.style.display = "block";
    close.onclick = function() {
        modal.style.display = "none";
    }

}