<?php
require "db_connection.php";

//Queries
$sql = "CREATE TABLE kund (kundName VARCHAR(255), 
    kundStreet VARCHAR(255), kundCity VARCHAR(255), PRIMARY KEY (kundName))";
$user1 = "INSERT INTO kund (kundName,kundStreet,kundCity) 
    VALUES ('Kund Kundssson', 'Kundgatan 3', 'Kundby')";
$user2 = "INSERT INTO kund (kundName,kundStreet,kundCity) 
    VALUES ('Jon Doe', 'Jongatan 2', 'Jonsby')";
$user3 = "INSERT INTO kund (kundName,kundStreet,kundCity) 
    VALUES ('Pelle', 'Magistratsgatan 3', 'Lund')";

//Create table
if (mysqli_query($db_conn, $sql)) {
    echo "Table created";
}
else {
    echo "Table creation failed <br>". mysqli_error($sql);
}
//Create user1
if (mysqli_query($db_conn, $user1)) {
    echo "User inserted";
}
else {
    echo "Insertion failed <br>". mysqli_error($user1);
}
//Create user2
if (mysqli_query($db_conn, $user2)) {
    echo "User inserted";
}
else {
    echo "Insertion failed <br>". mysqli_error($user2);
}
//Create user3
if (mysqli_query($db_conn, $user3)) {
    echo "User inserted";
}
else {
    echo "Insertion failed <br>". mysqli_error($user3);
}

 ?>
