<?php
include "php/createDataBase.php";
$connection = mysqli_connect("localhost", "root", "") //conectare la server
or die("Eroare la conectare cu MySQL");
$contor = 0;
$selectdb = mysqli_select_db($connection, 'ToDoList');
if(!$selectdb)
    echo "Baza de date nu a putut fi selectata  " . mysqli_errno($connection);
$first_table = "CREATE TABLE `tasks` (
  `Id` binary(16) NOT NULL,
  `UserId` binary(16) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Description` varchar(500) NOT NULL,
  `Work` bit(4) DEFAULT NULL,
  `Entertainment` bit(4) DEFAULT NULL,
  `Study` bit(4) DEFAULT NULL,
  `Done` bit(4) DEFAULT NULL,
  `Timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ";


$second_table = "CREATE TABLE `users` (
  `Id` binary(16) NOT NULL,
  `UserName` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  PRIMARY KEY (`Id`)
) ";

if(!mysqli_query($connection, $first_table))
    $contor++;

if(!mysqli_query($connection, $second_table))
    $contor++;

mysqli_close($connection);