<?php 
require "db_connection.php";
$get_all_users = "SELECT * FROM kund";
$result = mysqli_query($db_conn, $get_all_users);

//Loops through $result and displays name + address + city
while($row = mysqli_fetch_assoc($result)) {
    $name = $row["kundName"];
    $address = $row["kundAddress"];
    $city = $row["kundCity"];
    echo $name . " " . $address . " " . $city . "<br>";
}
?>