<?php 
session_start();
require "db_connection.php";
echo $_SESSION["username"];
$listdbtables = array_column(mysqli_fetch_all($db_conn->query('SHOW TABLES')),0);
if (empty($listdbtables)) {
     echo "empty";
}
print_r($listdbtables)

?>