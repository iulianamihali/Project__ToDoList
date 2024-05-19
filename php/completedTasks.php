<?php
$userId = isset($_GET['userId']) ? $_GET['userId'] : 0; // Obține userId din GET, sau 0 dacă nu există

$conn = new mysqli('localhost', 'root', '', 'ToDoList'); // face conexiunea cu baza de date creata ToDoList
if(mysqli_connect_errno())
{
    exit('Error: Could not connect to database.' .mysqli_connect_error());
}

$result = $conn->query("SELECT * FROM tasks WHERE Done = 1 AND UserId = " . intval($userId) . " ORDER BY TimeStamp DESC"); // Folosirea intval pentru securitate
$tasks = [];
while($row = $result->fetch_assoc()) {
    $tasks[] = $row;
}


echo json_encode($tasks); // Transformă array-ul PHP în JSON și îl trimite ca răspuns la solicitarea AJAX

