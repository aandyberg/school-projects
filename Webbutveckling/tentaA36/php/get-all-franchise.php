<?php 
require "db_connection.php";
$response = array();
$get_franchise = "SELECT * FROM Franchise";
$result = mysqli_query($db_conn, $get_franchise);
if($result) {
    $i = 0;
    while($row = mysqli_fetch_assoc($result)) {
        $response[$i]["franName"] = $row["franName"];
        $response[$i]["franNbr"] = $row["franNbr"];
        $response[$i]["franEmail"] = $row["franEmail"];
        $response[$i]["timeInfo"] = $row["timeInfo"];
        $i++;
    }
    echo json_encode($response, JSON_PRETTY_PRINT);
}
?>