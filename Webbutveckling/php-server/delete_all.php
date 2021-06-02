<?php
require "db_connection.php";

$sql = "DELETE FROM Recipe";
if (mysqli_query($db_conn, $sql)) {
    echo "Recipe Deleted created";
}
else {
    echo "Error" . mysqli_error($db_conn);
}

$sql2 = "DELETE FROM Ingridient";
if (mysqli_query($db_conn, $sql2)) {
    echo "Recipe Deleted created";
}
else {
    echo "Error" . mysqli_error($db_conn);
}
?>