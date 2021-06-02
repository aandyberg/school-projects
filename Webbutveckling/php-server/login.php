<?php
session_start();
header("Access-Control-Allow-Origin: *");

    require "db_connection.php";
    require "request_functions.php";

    //$_SESSION["username"] = "";
    $returnData = [];
    $_POST = json_decode(file_get_contents("php://input"),true);
    if($_SERVER["REQUEST_METHOD"] == "POST"){

    $username = check_query($db_conn, $_POST["username"]);
    $password = check_query($db_conn, $_POST["password"]);

    
    if(isset($username) && isset($password)) {
        $sql = "SELECT userPassword from Foody_user where username=?";
        $stmt = mysqli_prepare($db_conn, $sql);
        mysqli_stmt_bind_param($stmt, "s", $username);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
        if(password_verify($password, $row["userPassword"])) {
            $_SESSION["username"] = $username;
            $returnData = message(1, "Logged in Successfully! " . $_SESSION["username"]);
        }
        else {
            $returnData = message(0, "Wrong login credentials" . $_SESSION["username"]);
        }
    }
}
    echo json_encode($returnData);
?>