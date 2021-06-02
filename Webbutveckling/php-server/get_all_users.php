<?php 
require "db_connection.php";
$response = array();
$get_all_recepies = "SELECT * FROM Foody_user";
$result = mysqli_query($db_conn, $get_all_recepies);
if($result) {
    header("Content-type:application/json");
    $i = 0;
    while($row = mysqli_fetch_assoc($result)) {
        $response[$i]["username"] = $row["username"];
        $response[$i]["userPassword"] = $row["userPassword"];
        $response[$i]["email"] = $row["email"];
        $i++;
    }
    echo json_encode($response, JSON_PRETTY_PRINT);
}
?>