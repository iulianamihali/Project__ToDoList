$(document).ready(function () {
    $(document).on('click', '.delete-popup', function() {
        let taskId = $(this).data('task-id');
        const data = {
            Id: taskId
        };

        $.ajax({
            url: "../php/deleteTask.php",
            type: 'POST',
            data: data,
            success: function (result) {
                location.reload();
            },
            error: function (xhr, status, error) {
                console.error('Eroare AJAX:', error);
            }
        });
    });
});

