<?php 
    header("Access-Control-Allow-Origin: *");
    require "db_connection.php";
    require "request_functions.php";

    //$returnData = [];

    // Decodes json "php://input" returns the raw data
    $_POST = json_decode(file_get_contents("php://input"),true);

    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $search = check_query($db_conn, $_POST["search"]);
        if(!isset($search)) {
            $returnData = message(0,"Empty search");
        }
        else {
            $response = array();
            $get_all_recepies = "SELECT * FROM Recipe WHERE recipeName LIKE '$search%'";
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
            }
            echo json_encode($response, JSON_PRETTY_PRINT);
        }
    }
?>