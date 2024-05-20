$(document).ready(function() {
    let Id = localStorage.getItem('sessionId');
    if (!Id) {
        return;
    }
    const data =
        {
            Id: Id
        }

    $.ajax({
        url: '../php/profilePage.php',
        type: 'POST',
        data: data,
        success: function(data) {
            // console.log(data);
            // console.log(data.UserName);
            const jsonObject = JSON.parse(data);
            document.getElementById("fullname").value = jsonObject.UserName;
            document.getElementById("email").value = jsonObject.Email;
            // document.getElementById("numTasks").value = jsonOb
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error:', textStatus, errorThrown);
        }
    });
});