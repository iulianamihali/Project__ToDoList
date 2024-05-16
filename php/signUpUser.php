<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST')
{
    $username = isset($_POST['valueUsername']) ? $_POST['valueUsername'] : 'default_username';
    $email = isset($_POST['valueEmail']) ? $_POST['valueEmail'] : 'default_email';
    $password = isset($_POST['valuePassword']) ? $_POST['valuePassword'] : 'default_password';

    $conn = new mysqli('localhost', 'root', '', 'ToDoList');
    if(mysqli_connect_errno())
    {
        exit('Error: Could not connect to database.' .mysqli_connect_error());
    }

    $scl = $conn->prepare("INSERT INTO Users (Id, UserName, Email, Password) VALUES (UUID(), ?, ?, ?)");
    $scl->bind_param("sss", $username, $email, $password);

    if($scl->execute())
    {
        $idSearch = "SELECT * FROM Users WHERE UserName = '$username' and Email = '$email' and Password = '$password'";
        if(!$idSearch)
            exit('Error: Could not execute query' .mysqli_connect_error());
        $result = $conn->query($idSearch);   //se executa query pe baza (se cauta usename si parola, in result retine ce a gasit)
        if($result->num_rows > 0)
        {
            $idUser = '';
            while($row = $result->fetch_assoc())
            {
                if(strcmp($row["UserName"], $username) == 0 && strcmp($row["Email"], $email) == 0 && strcmp($row["Password"], $password) == 0)
                {
                    $idUser = $row["Id"];
                    break;
                }
            }
            if($idUser != '')
            {
                echo $idUser; //returneaza catre ajax id
            }
            else
            {
                echo 401;
            }
        }
        else
            echo 401;

    }

}