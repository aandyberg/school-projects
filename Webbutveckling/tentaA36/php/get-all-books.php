<?php 
require "db_connection.php";
$response = array();
$get_books = "SELECT * FROM Books";
$result = mysqli_query($db_conn, $get_books);
if($result) {
    $i = 0;
    while($row = mysqli_fetch_assoc($result)) {
        $response[$i]["title"] = $row["title"];
        $response[$i]["price"] = $row["price"];
        $response[$i]["isbn"] = $row["isbn"];
        $response[$i]["sellerName"] = $row["sellerName"];
        $response[$i]["comments"] = $row["comments"];
        $response[$i]["bookImage"] = $row["bookImage"];
        $response[$i]["buyOrSell"] = $row["buyOrSell"];
        $i++;
    }
    echo json_encode($response, JSON_PRETTY_PRINT);
}
?>