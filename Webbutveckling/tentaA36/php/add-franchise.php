<?php 
require "db_connection.php";
require "validate.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $franName = validateInput($_POST["franName"]);
    $franNbr = validateInput($_POST["franNbr"]);
    $franEmail = validateInput($_POST["franEmail"]);
    $franComment = validateInput($_POST["franComment"]);
    echo "$franName $franNbr $franEmail $franComment";
    if(!isset($franName) || !isset($franNbr) || !isset($franEmail) || !isset($franComment)) {
        echo "All mandatory fields need to be filled";
    }else {
        $sql = "INSERT INTO Franchise (franName, franNbr, franEmail, franComment) VALUES(?,?,?,?)";
        $stmt = mysqli_prepare($db_conn, $sql);
        mysqli_stmt_bind_param($stmt, "ssss",$franName, $franNbr, $franEmail, $franComment);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_store_result($stmt);
        mysqli_stmt_close($stmt);
        header("Location: ../franchise.html");
    }
}
?>