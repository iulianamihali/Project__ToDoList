function removeLocalStorage()
{
    localStorage.removeItem("sessionId");
    window.location.href = "../index.html";
}