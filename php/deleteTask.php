<?php
$conn = new mysqli('localhost', 'root', '', 'ToDoList'); // face conexiunea cu baza de date creata ToDoList
if(mysqli_connect_errno())
{
    exit('Error: Could not connect to database.' .mysqli_connect_error());
}

if (isset($_POST['Id'])) {
    $taskId = $_POST['Id'];

    $stmt = $conn->prepare("DELETE FROM tasks WHERE Id = ?");
    $stmt->bind_param("s", $taskId);

    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo true;
        } else {
            echo false;
        }
    } else {
        echo 'Error query executing';
    }
    $stmt->close();
} else {
    echo 'Error no id provided';
}

$conn->close();
