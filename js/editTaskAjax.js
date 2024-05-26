$(document).ready(function() {

    $('.saveButtonEdit button').click(function() {
        let taskId = $(this).data('task-id');
        let title = $('#modalHeaderEdit').val(); // Get the value of the input field with ID 'modalHeader'
        let description = $('#textarea1Edit').val(); // Get the value from the textarea
        let checkBut1 = $('#checkBut1Edit').is(':checked') ? 1 : 0;
        let checkBut2 = $('#checkBut2Edit').is(':checked') ? 1 : 0;
        let checkBut3 = $('#checkBut3Edit').is(':checked') ? 1 : 0;

        const data = {
            Id: taskId,
            Title: title,
            Description: description,
            Work: checkBut1 ? 1 : 0,
            Entertainment: checkBut2 ? 1 : 0,
            Study: checkBut3 ? 1 : 0,
        }
        // AJAX request to send data to the server
        $.ajax({
            url: '../php/editTask.php',
            type: 'POST',
            data: data,
            success: function(response) {
                console.log('Task saved successfully!', response);
                $('#myModal').hide();
                location.reload();
            },
            error: function(xhr, status, error) {
                console.error('Error saving task:', error);
            }
        });
    });

    $('#close').click(function() {
        $('#myModal').hide();
    });
});