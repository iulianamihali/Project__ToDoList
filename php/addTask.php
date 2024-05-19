<?php
$conn = new mysqli('localhost', 'root', '', 'ToDoList'); // face conexiunea cu baza de date creata ToDoList
if(mysqli_connect_errno())
{
    exit('Error: Could not connect to database.' .mysqli_connect_error());
}

// Verificarea dacă toate datele necesare sunt prezente
if (isset($_POST['Title']) && isset($_POST['Description']) && isset($_POST['Work']) && isset($_POST['Entertainment']) && isset($_POST['Study'])) {
    // Pregătirea și executarea interogării SQL
    $stmt = $conn->prepare("INSERT INTO tasks (Id, UserId, Title, Description, Work, Entertainment, Study, Done, TimeStamp) VALUES (UUID(),?,?,?, ?, ?, ?, ?, NOW())");
    $stmt->bind_param("sssiiii", $_POST['UserId'], $_POST['Title'], $_POST['Description'], $_POST['Work'], $_POST['Entertainment'], $_POST['Study'], $_POST['Done']);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Task-ul a fost adăugat cu succes!"]);
    } else {
        echo json_encode(["error" => "Eroare la adăugarea cardului: " . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Date incomplete!"]);
}

$conn->close();