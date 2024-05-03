$(document).ready(function() {
    $('#loginForm').submit(function(event) { //in loc de getelementbyid
        event.preventDefault();
        let formData = $(this).serialize(); //primeste mail si parola

        $.ajax({  //trimite prin ajax datele catre php
            url: "../php/loginUser.php", // PHP file to handle the POST request
            type: 'POST',
            data: formData,
            success: function(response) {
                    if(response !== '401')  //php returneaza ori 401 ori idUser si il stocam in localStorage
                    {
                        localStorage.setItem("sessionId", response); //localstorage obiect global din javascript
                        window.location.href = "../Project__ToDoList/dashboard.html";
                    }
                    else
                    {
                        alert("User Not Found")
                    }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("AJAX Error:", textStatus, errorThrown); // Detailed error logging

            }
        });
    });
});