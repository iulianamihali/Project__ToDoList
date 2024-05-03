<?php
$connection = mysqli_connect("localhost", "root", "")
or die("Eoare la conectare cu MySQL");

$createdb = mysqli_query($connection, "CREATE DATABASE ToDoList");
mysqli_close($connection);