<?php 
require "db_connection.php";
require "validate.php";


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $title = validateInput($_POST["title"]);
    $price = validateInput($_POST["price"]);
    $isbn = validateInput($_POST["isbn"]);
    $sellerName = validateInput($_POST["sellerName"]);  
    $comments = validateInput($_POST["comment"]);
    $buyOrSell = validateInput($_POST["buyorsell"]);


    var_dump($_FILES);
    echo "$title $price $isbn $sellerName $comments $buyOrSell";
    if(!empty($_FILES["bookImage"]) && isset($_FILES["bookImage"])) {
        if ($_FILES["bookImage"]["error"] === 0){
            $unique_id = uniqid();
            $unique_filename = $unique_id.$_FILES["bookImage"]["name"];
            if(move_uploaded_file($_FILES["bookImage"]["tmp_name"], "../uploads/".$unique_filename)) {
                //echo "File uploaded";
                //echo "$unique_filename";
                if(!isset($comments)) {
                    $comments = "";
                }
                if(!isset($title) || !isset($price) || !isset($isbn) || !isset($sellerName) || !isset($buyOrSell)) {
                    echo "All mandatory fields need to be filled";
                }else {
                    $sql = "INSERT INTO Books (title, price, isbn, sellerName, comments, bookImage, buyOrSell) VALUES(?,?,?,?,?,?,?)";
                    $stmt = mysqli_prepare($db_conn, $sql);
                    mysqli_stmt_bind_param($stmt, "sssssss",$title, $price, $isbn, $sellerName, $comments, $unique_filename, $buyOrSell);
                    mysqli_stmt_execute($stmt);
                    mysqli_stmt_close($stmt);
                }
                header("Location: ../advertise.html");
            }else {
                Echo "prblem with upload";
            }
        }
    }
}
?>