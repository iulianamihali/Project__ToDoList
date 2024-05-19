<?php

$conn = new mysqli('localhost', 'root', '', 'ToDoList'); // face conexiunea cu baza de date creata ToDoList
if (mysqli_connect_errno()) {
    exit('Error: Could not connect to database.' . mysqli_connect_error());
}
if (isset($_POST['Id'])) {

    $stmt = $conn->prepare("UPDATE tasks SET Done = 1 WHERE Id = ?");
    $stmt->bind_param('s',  $_POST['Id']);


// Execute the statement
    if ($stmt->execute()) {
        echo "Task updated successfully.";
    } else
        echo "Error updating record.";


} else {
    echo 'Error no id provided';
}


