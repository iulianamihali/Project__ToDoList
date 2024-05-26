<?php
$userId = isset($_GET['userId']) ? $_GET['userId'] : 0; // Obține userId din GET, sau 0 dacă nu există

$conn = new mysqli('localhost', 'root', '', 'ToDoList'); // face conexiunea cu baza de date creata ToDoList
if(mysqli_connect_errno())
{
    exit('Error: Could not connect to database.' .mysqli_connect_error());
}

$stmt = $conn->prepare("SELECT * FROM tasks WHERE UserId = ? ORDER BY TimeStamp DESC");
$stmt->bind_param("s", $userId);
$stmt->execute();
$result = $stmt->get_result();

$tasks = [];
while ($row = $result->fetch_assoc()) {
    $tasks[] = $row;
}


echo json_encode($tasks); // Transformă array-ul PHP în JSON și îl trimite ca răspuns la solicitarea AJAX

