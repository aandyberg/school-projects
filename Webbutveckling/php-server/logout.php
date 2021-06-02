<?php 
header("Access-Control-Allow-Origin: *");
session_start();

require "request_functions.php";
$_POST = json_decode(file_get_contents("php://input"),true);

if($_SERVER["REQUEST_METHOD"] == "POST"){
    session_destroy();
    $msg = $_SESSION["username"];
}
if(!isset($_SESSION)) {
    $msg = $_SESSION["username"];
}
echo json_encode($msg);
?>