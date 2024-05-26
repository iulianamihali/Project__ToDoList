<?php
$conn = new mysqli('localhost', 'root', '', 'ToDoList'); // face conexiunea cu baza de date creata ToDoList
if(mysqli_connect_errno())
{
    exit('Error: Could not connect to database.' .mysqli_connect_error());
}

if (isset($_POST['Id']) && isset($_POST['Title']) && isset($_POST['Description']) && isset($_POST['Work']) && isset($_POST['Entertainment']) && isset($_POST['Study'])) {
    $stmt = $conn->prepare("UPDATE tasks SET Title = ?, Description = ?, Work = ?, Entertainment = ?, Study = ? WHERE Id = ?");

    $stmt->bind_param('ssiiis', $_POST['Title'], $_POST['Description'], $_POST['Work'], $_POST['Entertainment'], $_POST['Study'], $_POST['Id']);


    if ($stmt->execute()) {
        echo "Task updated successfully.";
    } else {
        echo "Error updating record.";
    }
} else {
    echo "All fields are required.";
}


