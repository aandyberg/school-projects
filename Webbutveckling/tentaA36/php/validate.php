<?php
require "db_connection.php";
function validateInput($input) {
    $input = trim($input);
    $input = htmlspecialchars($input);
    return $input;
}
?>