<?php
session_start();
header("Access-Control-Allow-Origin: *");
require "db_connection.php";
require "request_functions.php";
//$returnData = [];

$_POST = json_decode(file_get_contents("php://input"),true);
$msg = "";
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if (isset($_SESSION["username"])){

        $msg = $_SESSION["username"];
    } 
}
echo $msg;

//isset($_SESSION[$key]) ? echo $_SESSION[$key] : echo '';
?>