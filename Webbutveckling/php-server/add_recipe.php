<?php 
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Content-Type: application/json; charset=UTF-8");

    require "db_connection.php";
    require "request_functions.php";

    $returnData = [];
    $_POST = json_decode(file_get_contents("php://input"),true);

    if($_SERVER["REQUEST_METHOD"] == "POST"){
        //$returnData = msg(0, "Not found");

        $recipeName = check_query($db_conn, $_POST["recipeName"]);
        $instruction = check_query($db_conn, $_POST["instruction"]);
        $uploader = check_query($db_conn, $_POST["uploader"]);
        $ingridient = $_POST["ingridient"];
        //echo $ingridient[1]["ingridientName"];

        $returnData = message(0, "recipeName: $recipeName");
        if(!isset($recipeName) || !isset($instruction) || !isset($uploader)) {
            $returnData = message(0,"All fields need to be filled.");
        }
        else {
            $sql = "INSERT INTO Recipe (recipeName, instruction, uploader) VALUES(?,?,?)";
            $stmt = mysqli_prepare($db_conn, $sql);
            mysqli_stmt_bind_param($stmt, "sss",$recipeName, $instruction, $uploader);
            mysqli_stmt_execute($stmt);
            //mysqli_stmt_store_result($stmt);
            $insertedId = mysqli_insert_id($db_conn);

            mysqli_stmt_close($stmt);
            $returnData = message(1, "Added: $recipeName to the database, id: $insertedId");

            foreach($ingridient as $value) {
                $ingridientName = check_query($db_conn, $value["ingridientName"]);
                $amount = check_query($db_conn, $value["amount"]);
                $unit = check_query($db_conn, $value["unit"]);
                if(!isset($ingridientName) || !isset($amount) || !isset($unit)) {
                    $returnData = message(0,"All ingridients fields need to be filled.");
                } else {
                    $sql = "INSERT INTO Ingridient (ingridientName, amount, unit, recipeId) VALUES(?,?,?,?)";
                    $stmt = mysqli_prepare($db_conn, $sql);
                    mysqli_stmt_bind_param($stmt, "ssss",$ingridientName, $amount, $unit, $insertedId);
                    mysqli_stmt_execute($stmt);
                    mysqli_stmt_store_result($stmt);
                    mysqli_stmt_close($stmt);
                    $returnData = message(1, "Added: $ingridientName to the database");
                }
            }
            
        }
        echo json_encode($returnData);
    }
?>