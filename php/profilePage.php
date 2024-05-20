<?php
$conn = new mysqli('localhost', 'root', '', 'ToDoList'); // face conexiunea cu baza de date creata ToDoList
if (mysqli_connect_errno()) {
    exit('Error: Could not connect to database.' . mysqli_connect_error());
}
if (isset($_POST['Id']))
{
    $Id = $_POST['Id'];

    $stmt = $conn->prepare("SELECT UserName, Email FROM users WHERE Id = ?");
    $stmt->bind_param("i", $Id);
    if($stmt->execute())
    {
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            echo json_encode($result->fetch_assoc());
        } else {
            echo json_encode(['message' => 'No user found']);
        }
    }

}
else
    echo 'Error no Id provided';
