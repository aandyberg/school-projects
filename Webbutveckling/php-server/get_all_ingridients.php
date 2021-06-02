<?php 
require "db_connection.php";
$response = array();
$get_all_recepies = "SELECT * FROM Ingridient";
$result = mysqli_query($db_conn, $get_all_recepies);
if($result) {
    header("Content-type:application/json");
    $i = 0;
    while($row = mysqli_fetch_assoc($result)) {
        $response[$i]["ingridientId"] = $row["ingridientId"];
        $response[$i]["ingridientName"] = $row["ingridientName"];
        $response[$i]["amount"] = $row["amount"];
        $response[$i]["unit"] = $row["unit"];
        $response[$i]["recipeId"] = $row["recipeId"];
        $i++;
    }
    echo json_encode($response, JSON_PRETTY_PRINT);
}
?>