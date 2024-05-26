<?php
$conn = new mysqli('localhost', 'root', '', 'ToDoList');
if (mysqli_connect_errno()) {
    exit('Error: Could not connect to database. ' . mysqli_connect_error());
}

if (isset($_POST['Id'])) {
    $Id = $_POST['Id'];

    //query pt informatii
    $stmt = $conn->prepare("SELECT UserName, Email FROM users WHERE Id = ?");
    $stmt->bind_param("s", $Id);
    if ($stmt->execute()) {
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $user_info = $result->fetch_assoc();

            // contor nr taskuri user
            $taskStmt = $conn->prepare("SELECT COUNT(*) AS TaskCount FROM tasks WHERE UserId = ?");
            $taskStmt->bind_param("s", $Id);
            $taskStmt->execute();
            $taskResult = $taskStmt->get_result();
            $totalTasks = $taskResult->fetch_assoc()['TaskCount'];

            // Contor taskuri completate
            $completedTaskStmt = $conn->prepare("SELECT COUNT(*) AS CompletedTaskCount FROM tasks WHERE UserId = ? AND Done = 1");
            $completedTaskStmt->bind_param("s", $Id);
            $completedTaskStmt->execute();
            $completedTaskResult = $completedTaskStmt->get_result();
            $completedTasks = $completedTaskResult->fetch_assoc()['CompletedTaskCount'];

            // Contor taskuri in asteptare
            $pendingTaskStmt = $conn->prepare("SELECT COUNT(*) AS PendingTaskCount FROM tasks WHERE UserId = ? AND Done = 0");
            $pendingTaskStmt->bind_param("s", $Id);
            $pendingTaskStmt->execute();
            $pendingTaskResult = $pendingTaskStmt->get_result();
            $pendingTasks = $pendingTaskResult->fetch_assoc()['PendingTaskCount'];


            $response = [
                'UserInfo' => $user_info,
                'TotalTasks' => $totalTasks,
                'CompletedTasks' => $completedTasks,
                'PendingTasks' => $pendingTasks
            ];
            echo json_encode($response);
        } else {
            echo json_encode(['message' => 'No user found']);
        }
    } else {
        echo json_encode(['message' => 'Error executing user query']);
    }
} else {
    echo 'Error: no Id provided';
}

