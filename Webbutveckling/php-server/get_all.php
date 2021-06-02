<?php 
require "db_connection.php";
$response = array();
$get_all_recepies = "SELECT * FROM Recipe";
$result = mysqli_query($db_conn, $get_all_recepies);
if($result) {
    header("Content-type:application/json");
    $i = 0;
    while($row = mysqli_fetch_assoc($result)) {
        $response[$i]["recipeId"] = $row["recipeId"];
        $response[$i]["recipeName"] = $row["recipeName"];
        $response[$i]["instruction"] = $row["instruction"];
        $response[$i]["uploader"] = $row["uploader"];
        $i++;
    }
    echo json_encode($response, JSON_PRETTY_PRINT);
}
?>