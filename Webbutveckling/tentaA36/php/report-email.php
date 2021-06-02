<?php 
require "db_connection.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $currentSide = $_POST["currentSide"];
    echo "$currentSide";
    if(mail("ics.canvas@gmail.com",$currentSide,"Wrong on this side.")) {
        header("Location: ".$currentSide);
    }
    else {
        echo "Error with mail";
    }
}
?>