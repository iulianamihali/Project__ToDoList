let id = localStorage.getItem("sessionId");
if(id === null)
{
    window.location.href = "../Project__ToDoList/signIn.html";
}