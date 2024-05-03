<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') { //din ajax datele si seteaza 2 variabile
    $username = isset($_POST['loginInput']) ? $_POST['loginInput'] : 'default_username';  //ia  datele din js trimise prin "data"
    $password = isset($_POST['valuePassword']) ? $_POST['valuePassword'] : 'default_password';


    $conn = new mysqli('localhost', 'root', '', 'ToDoList'); // face conexiunea cu baza de date creata ToDoList
    if(mysqli_connect_errno())
    {
        exit('Error: Could not connect to database.' .mysqli_connect_error());
    }

    $scl = "SELECT * FROM Users WHERE (UserName = '$username' or Email = '$username') and Password = '$password'"; //creaza doar un string de SELECT, inca nu il executa
    if(!$scl)
        exit('Error: Could not execute query' .mysqli_connect_error());
    $result = $conn->query($scl);   //se executa query pe baza (se cauta usename si parola, in result retine ce a gasit)
    if($result->num_rows > 0)
    {
        $idUser = '';
        while($row = $result->fetch_assoc())
        {
            if((strcmp($row["UserName"], $username) == 0 || strcmp($row["Email"], $username) == 0) && strcmp($row["Password"], $password) == 0)
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

