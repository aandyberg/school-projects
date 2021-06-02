<?php
require "db_connection.php";
$sql = "DROP TABLE kund";
if(mysqli_query($db_conn, $sql)) {
    echo "table dropped";
}else {
    echo "not dropped". mysqli_error($sql);
}
?>