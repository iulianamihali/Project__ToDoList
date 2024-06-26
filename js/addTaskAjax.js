$(document).ready(function() {
    $(".editTextSave").click(function() {
        let modalHeader = $("#modalHeader").val();
        let message = $("#textarea1").val();
        let checkBut1 = $("#checkBut1").is(':checked');
        let checkBut2 = $("#checkBut2").is(':checked');
        let checkBut3 = $("#checkBut3").is(':checked');
        let userId = localStorage.getItem('sessionId');
        let Data = {
            UserId: userId,
            Title: modalHeader,
            Description: message,
            Work: checkBut1 ? 1 : 0,
            Entertainment: checkBut2 ? 1 : 0,
            Study: checkBut3 ? 1 : 0,
            Done: 0
        };
        $.ajax({
            url: "../php/addTask.php",
            type: 'POST',
            data: Data,
            success: (response) => {
                console.log('Success:', response);
                $("#myModal").hide();
                location.reload();
            },
            error: (xhr, status, error) => {
                console.error('Error saving data:', status, error);
            }
        });
    });

    $("#close").click(function() {
        $("#myModal").hide();
    });

    $(window).click(function(event) {
        if (event.target.id === "myModal") {
            $("#myModal").hide();
        }
    });
});
