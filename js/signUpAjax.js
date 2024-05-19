$(document).ready(function()
{
    $('#signUpForm').submit(function (event)
    {
        event.preventDefault();
        let formData = $(this).serialize();

        $.ajax(
            {
                url: "../php/signUpUser.php",
                type: 'POST',
                data:formData,
                success:  function(response)
                {
                    if(response !== '401')
                    {
                        localStorage.setItem("sessionId", response);
                        window.location.href = "../Project__ToDoList/dashboard.html";
                    }
                    else
                    {
                        alert("Try Again!")
                    }
                },
                 error: function(jqXHR, textStatus, errorThrown) {
                    console.log("AJAX Error:", textStatus, errorThrown); // Detailed error logging
                }
            });

    });
});